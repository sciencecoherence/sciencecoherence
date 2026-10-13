<?php
declare(strict_types=1);

require_once __DIR__ . '/inc/articles.php';
$user = wr_require_admin();
$db = wr_db();
if (!wr_schema_ready($db)) {
    header('Location: setup.php');
    exit;
}

$result = null;
$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!wr_csrf_valid((string) ($_POST['csrf'] ?? ''))) {
        http_response_code(403);
        $error = 'The page expired. Reload it and try again.';
    } else {
        $result = wr_github_sync($db, $user, ($_POST['action'] ?? '') === 'send');
    }
}

$configured = false;
$files = [];
try {
    $configured = wr_github_config() !== null;
    if ($configured && $error === '') {
        $preview = wr_github_sync($db, $user, false, true);
        if ($preview['status'] === 'preview') $files = $preview['files'];
        elseif ($result === null) $error = $preview['message'];
    }
} catch (Throwable $exception) {
    $error = $exception->getMessage();
}
$status = wr_github_status($db);
$conflicts = array_keys(array_filter($files, fn($s) => $s === 'differs'));
$pending = array_keys(array_filter($files, fn($s) => $s === 'server-newer'));

$labels = [
    'same' => 'Same on GitHub',
    'server-newer' => 'Newer here — will be sent',
    'github-newer' => 'Newer on GitHub — arrives with the next deployment',
    'differs' => 'Changed here and on GitHub',
];

$parent = dirname(__DIR__, 2);
$assetSub = wr_site_subpath();
$markPath = '../assets/mark.svg';
if ($assetSub !== '' && !is_file($parent . '/assets/mark.svg') && is_file($parent . '/' . $assetSub . '/assets/mark.svg')) {
    $markPath = '../' . $assetSub . '/assets/mark.svg';
}

wr_security_headers();
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Writing Room — GitHub sync</title>
  <link rel="icon" href="<?= wr_e($markPath) ?>" type="image/svg+xml">
  <link rel="stylesheet" href="online.css">
</head>
<body>
  <main class="gateway">
    <a class="gateway-brand" href="index.php"><img src="<?= wr_e($markPath) ?>" alt=""><span>Science Coherence<small>THE WRITING ROOM</small></span></a>
    <p class="eyebrow"><i></i> GITHUB SYNC</p>
    <h1>Keep GitHub in step.</h1>
    <p class="intro">Every article, page or collection published here is also committed to GitHub, so the repository and your computer follow the website.</p>

    <?php if ($error !== ''): ?><p class="notice" role="alert"><?= wr_e($error) ?></p><?php endif; ?>
    <?php if ($result !== null): ?><p class="<?= in_array($result['status'], ['synced', 'waiting'], true) ? 'success' : 'notice' ?>" role="status"><?= wr_e($result['message']) ?></p><?php endif; ?>

    <?php if (!$configured): ?>
      <p class="notice">GitHub sync is not set up. Add <code>SC_GITHUB_TOKEN</code> to the private database configuration file, the one that defines <code>DB_PASS</code>, then reload this page.</p>
    <?php else: ?>
      <?php if ($result === null && $status['status'] !== 'unknown'): ?>
        <p class="fine-print">Last run: <?= wr_e((string) ($status['attemptedAt'] ?? '')) ?> UTC — <?= wr_e($status['message']) ?></p>
      <?php endif; ?>
      <?php if ($files): ?>
        <table class="sync-files">
          <thead><tr><th>File</th><th>State</th></tr></thead>
          <tbody>
          <?php foreach ($files as $path => $state): ?>
            <tr class="sync-<?= wr_e($state) ?>"><td><code><?= wr_e($path) ?></code></td><td><?= wr_e($labels[$state] ?? $state) ?></td></tr>
          <?php endforeach; ?>
          </tbody>
        </table>
      <?php endif; ?>

      <?php if ($pending): ?>
        <form method="post" action="github.php" class="gateway-form setup-form">
          <?= wr_csrf_field() ?>
          <button type="submit" name="action" value="check">Send the newer files <span>↗</span></button>
        </form>
      <?php endif; ?>

      <?php if ($conflicts): ?>
        <p class="notice"><?= wr_e(implode(', ', $conflicts)) ?> changed both on this server and on GitHub since they last matched (or have never been compared). Sending replaces GitHub’s version with the website’s. GitHub keeps its version in the history, so it can still be recovered.</p>
        <form method="post" action="github.php" class="gateway-form setup-form">
          <?= wr_csrf_field() ?>
          <button type="submit" name="action" value="send">Send the website’s versions to GitHub <span>↗</span></button>
        </form>
      <?php elseif ($files && !$pending): ?>
        <p class="success">Nothing waiting to be sent.</p>
      <?php endif; ?>
    <?php endif; ?>

    <p class="fine-print"><a href="index.php">Back to the Writing Room</a></p>
  </main>
</body>
</html>
