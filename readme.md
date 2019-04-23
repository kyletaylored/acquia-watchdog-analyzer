# Acquia Drupal Watchdog Analyzer

Analyze the Drupal Watchdog logs from Acquia.

## Overview

When reviewing a site on Acquia, we often don't want to enable dblog (database logging) on production, but we still need a good way of analyzing the Drupal watchdog logs. We can download the log files, but it's hard to parse through and read each item one by one.

This repo provides a simple way to parse and convert the logs into a JSON file, then optionally open a small dashboard to filter issues for review using DataTables.

## Usage

1. Start by processing the log file, passing it as an argument to `watchdog.php`.

```bash
$ ./watchdog.php 0-drupal-watchdog.log
```

2. Now that we have a JSON file, we can run a local PHP server to analyze it. Here we can use PHP's built-in server pretty easily.

```bash
$ php -S localhost:3000
```

3. Now open http://localhost:3000 for the DataTable to load. **Important**: the JSON output must be in the same directory as the root server directory.

## Preview

![Acquia Drupal Watchdog screenshot](https://github.com/kyletaylored/acquia-watchdog-analyzer/blob/master/acq-drup-watch.png?raw=true)
