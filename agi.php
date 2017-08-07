#!/usr/bin/php -q
<?php
$_SERVER['argv'][1] = 'magnus';
# Definicao do framework e do arquivo de config da aplicacao
$yii    = dirname(__FILE__) . '/yii/framework/yii.php';
$config = dirname(__FILE__) . '/protected/config/cron.php';

defined('YII_TRACE_LEVEL') or define('YII_TRACE_LEVEL', 0);

require_once $yii;
Yii::createConsoleApplication($config)->run();
?>
