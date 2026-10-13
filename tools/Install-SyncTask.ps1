# Installs (or with -Uninstall removes) the scheduled task that runs
# Sync-FromGitHub.ps1 at logon and every few minutes while you are logged on.
#   powershell -ExecutionPolicy Bypass -File tools\Install-SyncTask.ps1
#   powershell -ExecutionPolicy Bypass -File tools\Install-SyncTask.ps1 -Uninstall
param(
    [int]$Minutes = 10,
    [switch]$Uninstall
)

$ErrorActionPreference = 'Stop'
$taskName = 'Science Coherence - Sync from GitHub'

if ($Uninstall) {
    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false -ErrorAction SilentlyContinue
    Write-Output "Removed '$taskName'."
    exit 0
}

$script = Join-Path $PSScriptRoot 'Sync-FromGitHub.ps1'
$powershell = Join-Path $env:SystemRoot 'System32\WindowsPowerShell\v1.0\powershell.exe'
$arguments = "-NoProfile -NonInteractive -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$script`""
# On Windows 11, a headless console host keeps the window from flashing up every run.
if ([Environment]::OSVersion.Version.Build -ge 22000) {
    $action = New-ScheduledTaskAction -Execute (Join-Path $env:SystemRoot 'System32\conhost.exe') -Argument "--headless `"$powershell`" $arguments"
} else {
    $action = New-ScheduledTaskAction -Execute $powershell -Argument $arguments
}

$user = [Security.Principal.WindowsIdentity]::GetCurrent().Name
$atLogon = New-ScheduledTaskTrigger -AtLogOn -User $user
$repeat = New-ScheduledTaskTrigger -Once -At (Get-Date).AddMinutes(1) -RepetitionInterval (New-TimeSpan -Minutes $Minutes)
$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -MultipleInstances IgnoreNew -ExecutionTimeLimit (New-TimeSpan -Minutes 5) -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries
$principal = New-ScheduledTaskPrincipal -UserId $user -LogonType Interactive -RunLevel Limited

Register-ScheduledTask -TaskName $taskName -Action $action -Trigger @($atLogon, $repeat) -Settings $settings -Principal $principal `
    -Description 'Brings online Writing Room edits from GitHub into the Science Coherence folders.' -Force | Out-Null
Write-Output "Installed '$taskName': at logon and every $Minutes minutes. Log: $env:LOCALAPPDATA\ScienceCoherence\sync.log"
