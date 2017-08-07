<?php
/**
 * Acoes do modulo "Call".
 *
 * =======================================
 * ###################################
 * MagnusBilling
 *
 * @package MagnusBilling
 * @author Adilson Leffa Magnus.
 * @copyright Copyright (C) 2005 - 2016 MagnusBilling. All rights reserved.
 * ###################################
 *
 * This software is released under the terms of the GNU Lesser General Public License v2.1
 * A copy of which is available from http://www.gnu.org/copyleft/lesser.html
 *
 * Please submit bug reports, patches, etc to https://github.com/magnusbilling/mbilling/issues
 * =======================================
 * Magnusbilling.com <info@magnusbilling.com>
 * 17/08/2012
 */

class BackupController extends Controller
{
    private $diretory = "/usr/local/src/magnus/backup/";
    public function actionRead($asJson = true, $condition = null)
    {
        if (Yii::app()->session['isAdmin'] != true || !Yii::app()->session['id_user']) {
            exit;
        }

        $result = $this->scan_dir($this->diretory, 1);

        $values = array();
        $start  = $_GET['start'];
        $limit  = $_GET['limit'];

        for ($i = 0; $i < count($result); $i++) {

            if ($i < $start) {
                continue;
            }

            if (!preg_match("/backup_voip_Magnus/", $result[$i])) {
                continue;
            }
            $size     = filesize($this->diretory . $result[$i]) / 1000000;
            $values[] = array(
                'id'   => $i,
                'name' => $result[$i],
                'size' => number_format($size, 2) . ' MB');
        }

        //
        # envia o json requisitado
        echo json_encode(array(
            $this->nameRoot  => $values,
            $this->nameCount => $i,
            $this->nameSum   => array(),
        ));
    }
    public function actionDownload()
    {
        if (Yii::app()->session['isAdmin'] != true || !Yii::app()->session['id_user']) {
            exit;
        }

        $file = $_GET['file'];

        $magnusFilesDirectory = '/usr/local/src/';
        $path                 = $magnusFilesDirectory . $file;

        header('Content-type: application/csv');
        header('Content-Disposition: inline; filename="' . $file . '"');
        header('Content-Transfer-Encoding: binary');
        header('Accept-Ranges: bytes');
        ob_clean();
        flush();
        readfile($path);

    }
    public function scan_dir($dir)
    {
        if (Yii::app()->session['isAdmin'] != true || !Yii::app()->session['id_user']) {
            exit;
        }

        $ignored = array('.', '..', '.svn', '.htaccess');

        $files = array();
        foreach (scandir($dir) as $file) {
            if (in_array($file, $ignored)) {
                continue;
            }

            $files[$file] = filemtime($dir . '/' . $file);
        }

        arsort($files);
        $files = array_keys($files);

        return ($files) ? $files : false;
    }

    public function actionDestroy()
    {
        if (Yii::app()->session['isAdmin'] != true || !Yii::app()->session['id_user']) {
            exit;
        }

        $ids = json_decode($_POST['ids']);
        foreach ($ids as $key => $value) {
            unlink($this->diretory . $value);
        }

        # retorna o resultado da execucao
        echo json_encode(array(
            $this->nameSuccess => $this->success,
            $this->nameMsg     => $this->success,
        ));
    }

    public function actionSave()
    {
        if (Yii::app()->session['isAdmin'] != true || !Yii::app()->session['id_user']) {
            exit;
        }
        LinuxAccess::exec("php /var/www/html/mbilling/cron.php Backup");

        echo json_encode(array(
            $this->nameSuccess => $this->success,
            $this->nameRoot    => $this->attributes,
            $this->nameMsg     => $this->msg . ' Backup in process, this task can spend many time to finish.',
        ));

    }

    public function actionImportFromCsv()
    {
        if (Yii::app()->session['isAdmin'] != true || !Yii::app()->session['id_user']) {
            exit;
        }

        ini_set("memory_limit", "-1");
        ini_set("upload_max_filesize", "100M");
        ini_set("max_execution_time", "-1");
        if (isset($_FILES['file']['tmp_name'])) {

            $uploadfile = "/usr/local/src/" . $_FILES['file']['name'];
            Yii::log($uploadfile, 'info');
            move_uploaded_file($_FILES["file"]["tmp_name"], $uploadfile);
        }
        echo json_encode(array(
            $this->nameSuccess => true,
            $this->nameMsg     => $this->success,
        ));

    }
}
