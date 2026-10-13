# Brings online Writing Room edits down from GitHub to this computer.
#
# 1. Fast-forwards this repository (the approved copy) to GitHub's main branch.
#    It never merges or overwrites: unpushed commits or uncommitted edits to the
#    same files stop it, and it says so.
# 2. Copies the site files the Writing Room writes into the editing copy one
#    folder up, but only where the editing copy still holds the previous
#    version. A file you changed there is left alone and reported.
#
# Run by the scheduled task from Install-SyncTask.ps1, or by hand:
#   powershell -ExecutionPolicy Bypass -File tools\Sync-FromGitHub.ps1
# Log: %LOCALAPPDATA%\ScienceCoherence\sync.log
param(
    [string]$Branch = 'main',
    [switch]$NoNotify
)

$ErrorActionPreference = 'Continue'
$repo = Split-Path -Parent $PSScriptRoot
$editing = Split-Path -Parent $repo
# The files the online Writing Room can change (see writingroom/inc/github.php).
$siteFilePattern = '^((content|collections|sections|pages|documents)\.js|index\.html|horizon\.html|documents/[^/]+\.html)$'

$logDirectory = Join-Path $env:LOCALAPPDATA 'ScienceCoherence'
New-Item -ItemType Directory -Force -Path $logDirectory | Out-Null
$logPath = Join-Path $logDirectory 'sync.log'

function Write-Log([string]$message) {
    $line = '{0}  {1}' -f (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'), $message
    Add-Content -LiteralPath $logPath -Value $line -Encoding UTF8
    Write-Output $line
}

function Show-Notice([string]$title, [string]$message, [string]$kind = 'Info') {
    if ($NoNotify) { return }
    try {
        Add-Type -AssemblyName System.Windows.Forms, System.Drawing
        $icon = New-Object System.Windows.Forms.NotifyIcon
        $icon.Icon = [System.Drawing.SystemIcons]::Information
        $icon.Visible = $true
        $icon.ShowBalloonTip(10000, $title, $message, [System.Windows.Forms.ToolTipIcon]::$kind)
        Start-Sleep -Seconds 6
        $icon.Dispose()
    } catch { }
}

function Stop-Sync([string]$message) {
    Write-Log "STOPPED: $message"
    Show-Notice 'Science Coherence sync stopped' $message 'Warning'
    exit 1
}

$gitCommand = Get-Command git.exe -ErrorAction SilentlyContinue
$git = if ($gitCommand) { $gitCommand.Source } else { Join-Path $env:ProgramFiles 'Git\cmd\git.exe' }
if (-not (Test-Path -LiteralPath $git)) { Stop-Sync 'Git was not found.' }

# Runs git in the approved copy; returns trimmed output lines and sets $script:gitExit.
function Invoke-Git {
    $output = & $git -C $repo @args 2>&1
    $script:gitExit = $LASTEXITCODE
    @($output | ForEach-Object { "$_".Trim() } | Where-Object { $_ -ne '' })
}

$fetchOutput = Invoke-Git fetch --quiet origin $Branch
if ($gitExit -ne 0) { Stop-Sync ("Could not reach GitHub: " + ($fetchOutput -join ' ')) }

$old = (Invoke-Git rev-parse HEAD) | Select-Object -First 1
$new = (Invoke-Git rev-parse "origin/$Branch") | Select-Object -First 1
if ($old -eq $new) { exit 0 }

Invoke-Git merge-base --is-ancestor $new HEAD | Out-Null
if ($gitExit -eq 0) { exit 0 }  # This copy is ahead of GitHub: nothing to bring down.

Invoke-Git merge-base --is-ancestor HEAD $new | Out-Null
if ($gitExit -ne 0) {
    Stop-Sync "The approved copy has commits that are not on GitHub, and GitHub has commits it lacks. Pull and merge by hand in $repo."
}

$mergeOutput = Invoke-Git merge --ff-only --quiet $new
if ($gitExit -ne 0) {
    Stop-Sync ("Could not update the approved copy; commit or set aside your local edits first. " + ($mergeOutput -join ' '))
}
$changed = Invoke-Git diff --name-only $old $new
Write-Log ("Approved copy updated to {0} ({1} files)." -f $new.Substring(0, 12), $changed.Count)

$copied = @()
$kept = @()
foreach ($path in $changed) {
    if ($path -notmatch $siteFilePattern) { continue }
    $source = Join-Path $repo $path
    $target = Join-Path $editing $path
    if (-not (Test-Path -LiteralPath $source)) {
        Write-Log "Not mirrored (deleted on GitHub; delete it by hand if intended): $path"
        continue
    }
    $newBlob = (Invoke-Git rev-parse "${new}:$path") | Select-Object -First 1
    if (Test-Path -LiteralPath $target) {
        # Hashed the way Git would store it, so line endings do not count as a change.
        $currentBlob = (Invoke-Git hash-object "--path=$path" -- $target) | Select-Object -First 1
        if ($currentBlob -eq $newBlob) { continue }
        $oldBlob = (Invoke-Git rev-parse --verify --quiet "${old}:$path") | Select-Object -First 1
        if ($currentBlob -ne $oldBlob) {
            $kept += $path
            Write-Log "Kept your edited version in the editing copy (GitHub has a newer one): $path"
            continue
        }
    }
    New-Item -ItemType Directory -Force -Path (Split-Path -Parent $target) | Out-Null
    Copy-Item -LiteralPath $source -Destination $target -Force
    $copied += $path
    Write-Log "Copied to the editing copy: $path"
}

if ($kept.Count) {
    Show-Notice 'Science Coherence: check these files' ("Online edits arrived, but you had changed " + ($kept -join ', ') + " in the editing copy, so they were not replaced. See $logPath.") 'Warning'
} elseif ($copied.Count) {
    Show-Notice 'Science Coherence' ("Online edits brought down: " + ($copied -join ', '))
}
exit 0
