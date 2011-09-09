#!/usr/bin/env php
<?php
// Usage:   $ php packager.php version modules_donot_include
// Example: $ php packager.php 1.0.0 find,ajax

define('PL_CURDIR', './');
define('PL_DIR', PL_CURDIR . 'Sources/');

$std = fopen('php:stderr', 'w');
fwrite($std, "Getting all the availiable modules...\n");
$sources = opendir(PL_DIR);
$prohibited = array('.', '..', 'wrap.js', 'core.js');

if(isset($_GET['modules'])) {
    foreach(explode(',', $argv[1]) as $m) {
        $prohibited[] = $m . '.js';
    }
}

$re = '';

foreach($prohibited as $p) {
    $re .= '^(?i)' . $p . '$|';
}

$re = '/' . substr($re, 0, -1) . '/';
$build = file_get_contents(PL_DIR . 'Core.js');
$it = 0;

while($file = readdir($sources)) {
    if(preg_match($re, $file)) {
       continue; 
    }
    
    $caret = "\n\n";
    if(++$it === 1) {
        $caret = "\n";
    }
    $build .= $caret . file_get_contents(PL_DIR . $file);
    fwrite($std, "  Module " . $file . " has been loaded.\n");
}

fwrite($std, "Preparing the final build...\n");
$wrap = file_get_contents(PL_DIR . 'wrap.js');

$build = strtr($wrap, array(
    '%version%' => isset($argv[0]) ? $argv[0] : '1.0.0',
    '   [Code]' => $build
));
fwrite($std, "  Ready.");

fwrite($std, "Updating prevel-full.js...");
file_put_contents(PL_CURDIR . 'prevel-full.js', $build);
fwrite($std, "  Ready.");

fclose($std);