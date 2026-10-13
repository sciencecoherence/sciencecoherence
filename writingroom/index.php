<?php
declare(strict_types=1);

require_once __DIR__ . '/inc/bootstrap.php';
require_once __DIR__ . '/inc/articles.php';
$user = wr_require_admin();
$db = wr_db();
if (!wr_schema_ready($db)) {
    header('Location: setup.php');
    exit;
}

$html = @file_get_contents(__DIR__ . '/public/index.html');
if ($html === false) {
    http_response_code(500);
    exit('The Writing Room interface is unavailable.');
}

wr_security_headers();
$html = str_replace('<head>', '<head><base href="public/">', $html);

// Asset path resolution: check if ../../assets exists from public/, or fall back to website subpath (e.g. ../../cohera/assets/)
$parent = dirname(__DIR__, 2);
$assetSub = wr_site_subpath();
$assetPrefix = '../../assets/';
if ($assetSub !== '' && !is_dir($parent . '/assets') && is_dir($parent . '/' . $assetSub . '/assets')) {
    $assetPrefix = '../../' . $assetSub . '/assets/';
}
$html = str_replace('/site-assets/', $assetPrefix, $html);
$html = str_replace('<i></i> Local workspace', '<i></i> Private online workspace', $html);
$logout = '<a class="button quiet" href="../github.php">GitHub sync</a>'
    . '<form class="online-account" method="post" action="../logout.php">'
    . wr_csrf_field()
    . '<span>' . wr_e((string) $user['username']) . '</span>'
    . '<button class="quiet" type="submit">Log out</button></form>';
$html = str_replace('<div class="header-actions">', '<div class="header-actions">' . $logout, $html);
echo $html;
