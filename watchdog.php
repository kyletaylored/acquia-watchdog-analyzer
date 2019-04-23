#!/usr/bin/php
<?php

require_once __DIR__ . '/vendor/autoload.php';
use gossi\formatter\Formatter;

if (php_sapi_name() == 'cli' && empty($argv[1])) {
  dd("Pass a file name as an argument. \n\n ./watchdog.php filename.csv");
}

// Define vars
$input = $argv[1];
$file_lines = file($input);
$formatter = new Formatter();
$storage = [];

foreach ($file_lines as $line) {
    $pieces = explode('|', $line);
    var_dump($pieces);
    $pieces[8] = $formatter->format($pieces[8]);

    $storage[] = $pieces;
}

$fp = fopen('watchdog.json', 'w');
fwrite($fp, json_encode($storage));
fclose($fp);