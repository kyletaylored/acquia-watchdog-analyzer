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
$count = 1;

foreach ($file_lines as $line) {
    print "Processing line: ${count} of " . count($file_lines) . PHP_EOL;
    $pieces = explode('|', $line);
    $pieces[8] = $formatter->format($pieces[8]);
    
    $data = [
      'datetime_host' => $pieces[0],
      'timestamp' => $pieces[1],
      'module' => $pieces[2],
      'reip' => $pieces[3],
      'page' => $pieces[4],
      'blank' => $pieces[5],
      'uid' => $pieces[6],
      'relink' => $pieces[7],
      'msg' => $pieces[8],
    ];

    $storage[] = $data;
    $count++;
}

$fp = fopen('watchdog.json', 'w');
fwrite($fp, json_encode($storage));
fclose($fp);
print "Printed to file: watchdog.json" . PHP_EOL;