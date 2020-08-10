<?php
$username = 'root';
$password = 'magnus81';
$database = 'mbilling7';
try {
    $conn = new PDO('mysql:host=localhost;dbname=' . $database, $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo '<pre>';
    print_r($e);
    echo '55999';
}

$langs = ['pt_BR', 'en'];

generateENLocaleFile($conn, $langs);

checkTranslateFiles($conn, $langs);

whitePHPLocale($conn, $langs);

updateFromEXTJSFile($conn, $langs);

updateValueFromJsFile($conn, $langs);

whiteToWiki($conn, $langs);

exit;

function whiteToWiki($conn, $langs)
{

    foreach ($langs as $key => $lang) {

        $main_menus = [
            [1, 'user'],
            [7, 'refill'],
            [5, 'did'],
            [8, 'plan'],
            [9, 'call'],
            [10, 'trunk'],
            [12, 'configuration'],
            [13, 'campaign'],
            [14, 'callshop'],
            [94, 'services'],
        ];

        $file = '/Library/WebServer/Documents/MBilling_7/wiki/' . $lang . '/modules/index.rst';

        $content = '*****
Menus
*****


.. toctree::
   :maxdepth: 2
   :caption: Menus
   :name: sec-menus_' . $lang . "\n\n";

        foreach ($main_menus as $key => $menu) {

            $sql     = "SELECT * FROM pkg_module WHERE id = " . $menu[0];
            $command = $conn->prepare($sql);
            $command->execute();
            $module = $command->fetchAll(PDO::FETCH_OBJ);

            $content_index = '';
            $content .= '   ' . $menu[1] . '/index.rst' . "\n";

            $file_index = '/Library/WebServer/Documents/MBilling_7/wiki/' . $lang . '/modules/' . $menu[1] . '/index.rst';

            exec('touch ' . $file_index);

            $h1 = '';
            for ($i = 0; $i < strlen(getTranslation(substr($module[0]->text, 3, -2), $lang)); $i++) {
                $h1 .= '*';
            }

            $content_index .= $h1 . '
' . getTranslation(substr($module[0]->text, 3, -2), $lang) . '
' . $h1 . '


';

            echo $sql = "SELECT * FROM pkg_module WHERE id_module = '" . $menu[0] . "' ORDER BY priority";
            $command  = $conn->prepare($sql);
            $command->execute();
            $sub_modules = $command->fetchAll(PDO::FETCH_OBJ);

            foreach ($sub_modules as $key => $sub_module) {

                if (!strlen(getTranslation(substr($sub_module->text, 3, -2), $lang))) {
                    continue;
                }
                $h5 = '';
                for ($i = 0; $i < strlen(getTranslation(substr($sub_module->text, 3, -2), $lang)); $i++) {
                    $h5 .= '*';
                }

                $content_index .= getTranslation(substr($sub_module->text, 3, -2), $lang) . '
' . $h5 . '
:ref:`' . $sub_module->module . '-menu-list`


';
            }

            $fd = fopen($file_index, "w");

            if (fwrite($fd, $content_index) === false) {
                echo "Impossible to write to the file $file" . " ($content)";
                continue;
            }
            fclose($fd);

        }

        $fd = fopen($file, "w");

        if (fwrite($fd, $content) === false) {
            echo "Impossible to write to the file $file" . " ($content)";
            continue;
        }
        fclose($fd);

        $sql     = "SELECT * FROM wiki WHERE wiki_language = '" . $lang . "' GROUP BY wiki_module";
        $command = $conn->prepare($sql);
        $command->execute();
        $modules = $command->fetchAll(PDO::FETCH_OBJ);

        foreach ($modules as $key => $module) {

            if (!strlen($module->wiki_module)) {
                continue;
            }

            $file = '/Library/WebServer/Documents/MBilling_7/wiki/' . $lang . '/modules/' . $module->wiki_module . '/' . $module->wiki_module . '.rst';
            exec('mkdir -p /Library/WebServer/Documents/MBilling_7/wiki/' . $lang . '/modules/' . $module->wiki_module);

            $content = '.. _' . $module->wiki_module . "-menu-list:\n";

            $h1 = '';
            for ($i = 0; $i < strlen(getTranslation('Field list', $lang)); $i++) {
                $h1 .= '*';
            }

            $content .= '
' . $h1 . '
' . getTranslation('Field list', $lang) . '
' . $h1 . '


';

            $sql     = "SELECT * FROM wiki WHERE wiki_language = '" . $lang . "' AND wiki_module = '" . $module->wiki_module . "' ORDER BY id";
            $command = $conn->prepare($sql);
            $command->execute();
            $fields = $command->fetchAll(PDO::FETCH_OBJ);

            foreach ($fields as $key => $field) {
                $h5 = '';
                for ($i = 0; $i < strlen(getTranslation($field->wiki_label, $lang)); $i++) {
                    $h5 .= '"';
                }

                $description = strlen($field->wiki_value) ? $field->wiki_value : getTranslation('We did not write the description to this field', $lang) . '.';

                $content .= '
.. _' . $module->wiki_module . '-' . $field->wiki_field . ':

' . getTranslation($field->wiki_label, $lang) . '
' . $h5 . '

' . $description . '



';

            }

            $fd = fopen($file, "w");

            if (fwrite($fd, $content) === false) {
                echo "Impossible to write to the file $file" . " ($content)";
                continue;
            }
            fclose($fd);

        }
        exec('cd /Library/WebServer/Documents/MBilling_7/wiki/' . $lang . '/ && make clean && make html');

        exec('open file:///Library/WebServer/Documents/MBilling_7/wiki/' . $lang . '/_build/html/index.html');
    }
}

function updateValueFromJsFile($conn, $langs)
{

    foreach ($langs as $key => $lang) {

        $json = file_get_contents('/Library/WebServer/Documents/MBilling_7/resources/help/help_' . $lang . '.js');

        $json = str_replace('Help.load({', '', $json);

        $json = explode("\n", $json);

        foreach ($json as $key => $line) {

            $parts = explode(':', $line);

            if (count($parts) < 2) {
                continue;
            }

            $wiki_module = preg_replace('/\'| /', '', strtok($parts[0], '.'));
            $wiki_field  = preg_replace('/\'| /', '', strtok(''));
            $wiki_value  = substr($parts[1], 2, -2);

            $sql     = "UPDATE wiki SET wiki_value = '" . $wiki_value . "' WHERE wiki_module = '" . $wiki_module . "' AND wiki_field = '" . $wiki_field . "' AND wiki_language = '" . $lang . "'";
            $command = $conn->prepare($sql);
            try {
                $command->execute();
            } catch (Exception $e) {

            }

        }

    }

}

function updateFromEXTJSFile($conn, $langs)
{
    $directory = '/Library/WebServer/Documents/MBilling_7/classic/src/view/';
    $files     = scan_dir($directory, 1);

    foreach ($langs as $key => $lang) {

        foreach ($files as $key => $file) {

            $form = $directory . $file . '/Form.js';

            if (!file_exists($form)) {
                continue;
            }
            $data = file_get_contents($form);
            //$data = preg_replace('/ /', '', $data);

            preg_match_all("/name: '(.*)',(\r\n|\n|\r).*fieldLabel: t\('(.*)'\)/", $data, $result);

            for ($i = 0; $i < count($result[0]); $i++) {

                $sql     = "INSERT INTO wiki (wiki_module, wiki_field,wiki_label, wiki_value, wiki_language) VALUES ('" . $file . "','" . $result[1][$i] . "','" . $result[3][$i] . "','','" . $lang . "')";
                $command = $conn->prepare($sql);
                try {
                    $command->execute();
                } catch (Exception $e) {

                }
            }

        }
    }

}

function scan_dir($dir)
{

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

function getTranslation($value, $lang)
{
    $value = trim($value);
    $file  = file_get_contents('/Library/WebServer/Documents/MBilling_7/resources/locale/' . $lang . '.js');

    preg_match_all("/'($value)':.*'(.*)'/i", $file, $result);

    if (isset($result[2][0]) && strlen($result[2][0])) {
        return trim($result[2][0]);
    }

    return trim($value);

}

function generateENLocaleFile($conn, $lang)
{

    $fileds_texts = [];
    //PHP

    //Configuration MENU

    $sql     = "SELECT * FROM pkg_configuration WHERE status = 1 ";
    $command = $conn->prepare($sql);
    $command->execute();
    $configs = $command->fetchAll(PDO::FETCH_OBJ);

    foreach ($configs as $key => $config) {

        //$phpLocalteFile .= "    'config_title_" . $config->config_key . "'  => '" . $config->config_title . "',\n";
        //$phpLocalteFile .= "    'config_desc_" . $config->config_key . "'  => '" . preg_replace(['/\n/', '/\'/'], ['\n ', '\\'], $config->config_description) . "',\n";
    }

    //PHP code
    $main_directory = '/Library/WebServer/Documents/MBilling_7/protected/';

    $di = new RecursiveDirectoryIterator($main_directory);
    foreach (new RecursiveIteratorIterator($di) as $filename => $file) {
        if (!preg_match('/\.php$/', $filename) || preg_match('/UpdateMysql/', $filename)) {
            continue;
        }

        $file = file_get_contents($filename);

        preg_match_all("/Yii::t\('zii', '([a-z ]*)'\)/i", $file, $result);

        $fileds_texts = array_merge($result[1], $fileds_texts);
    }

    $fileds_texts = array_values(array_unique($fileds_texts));
    asort($fileds_texts);

//EXTJS

    $file = '/Library/WebServer/Documents/MBilling_7/app/helper/Util.js';
    $file = file_get_contents($file);

    preg_match_all("/ t\('([a-z ]*)'\)/i", $file, $result);

    $main_directory = '/Library/WebServer/Documents/MBilling_7/classic/src/';

    $di = new RecursiveDirectoryIterator($main_directory);
    foreach (new RecursiveIteratorIterator($di) as $filename => $file) {
        if (!preg_match('/\.js$/', $filename)) {
            continue;
        }

        $file = file_get_contents($filename);
        preg_match_all("/ t\('([a-z ]*)'\)/i", $file, $result);
        $fileds_texts = array_merge($result[1], $fileds_texts);
    }

//MENUS
    $sql     = "SELECT * FROM pkg_module WHERE id_module IS NULL ORDER BY priority";
    $command = $conn->prepare($sql);
    $command->execute();
    $menus = $command->fetchAll(PDO::FETCH_OBJ);

    foreach ($menus as $key => $menu) {

        $fileds_texts[] = substr($menu->text, 3, -2);

        $sql     = "SELECT * FROM pkg_module WHERE id_module = " . $menu->id . " ORDER BY priority";
        $command = $conn->prepare($sql);
        $command->execute();
        $sub_menus = $command->fetchAll(PDO::FETCH_OBJ);
        foreach ($sub_menus as $key => $sub_menu) {

            $fileds_texts[] = substr($sub_menu->text, 3, -2);
        }
    }

    $fileds_texts = array_values(array_unique($fileds_texts));
    asort($fileds_texts);

    $locale = '/**
 * Locale file(en)
 * Adilson Leffa Magnus
 * =======================================
 * ###################################
 * MagnusBilling
 *
 * @package MagnusBilling
 * @author  Adilson Leffa Magnus.
 * @copyright   Todos os direitos reservados.
 * ###################################
 * =======================================
 * MagnusSolution.com <info@magnussolution.com>
 * ' . date('Y-m-d') . '
 */
Locale.load({
';

//FIELDS
    foreach ($fileds_texts as $key => $value) {
        $locale .= "    '" . $value . "': '',\n";
    }

    $locale .= "\n});";

    $file = '/Library/WebServer/Documents/MBilling_7/resources/locale/en.js';

    $fd = fopen($file, "w");

    if (fwrite($fd, $locale) === false) {
        echo "Impossible to write to the file $file" . " ($content)";

    }
    fclose($fd);

}

function checkTranslateFiles($conn, $langs)
{

    $langs    = ['pt_BR'];
    $filename = '/Library/WebServer/Documents/MBilling_7/resources/locale/en.js';
    $file     = file_get_contents($filename);

    preg_match_all("/'([a-z].*)'.*:/i", $file, $result_en);

    foreach ($langs as $key => $lang) {

        $filename = '/Library/WebServer/Documents/MBilling_7/resources/locale/' . $lang . '.js';
        $file     = file_get_contents($filename);

        $noTranslate = $inBlank = 0;
        foreach ($result_en[1] as $key => $value) {
            if (!preg_match('/' . $value . '/', $file)) {
                echo "'$value' : '',\n";
                $noTranslate++;
                continue;
            }

            if (preg_match("/'$value'.*: ''/", $file)) {
                $inBlank++;
                echo "'$value' : '', esta sem tradução\n";
            }

        }

        echo "\n\n" . $noTranslate . " nao encontrado e " . $inBlank . " no idioma: " . $lang . "\n\n";

    }
}

function whitePHPLocale($conn, $langs)
{

    $langs = ['pt_BR', 'es', 'it', 'ru', 'fr'];

    foreach ($langs as $key => $lang) {

        $filename = '/Library/WebServer/Documents/MBilling_7/resources/locale/' . $lang . '.js';
        $file     = file_get_contents($filename);

        $fileLang = '/Library/WebServer/Documents/MBilling_7/resources/locale/php/' . $lang . '/zii.php';

        $php_lang = '<?php
        /**
 * Message translations.
 *
 * This file is automatically generated by \'yiic message\' command.
 * It contains the localizable messages extracted from source code.
 * You may modify this file by translating the extracted messages.
 *
 * Each array element represents the translation (value) of a message (key).
 * If the value is empty, the message is considered as not translated.
 * Messages that no longer need translation will have their translations
 * enclosed between a pair of \'@@\' marks.
 *
 * Message string can be used with plural forms format. Check i18n section
 * of the guide for details.
 *
 * NOTE, this file must be saved in UTF-8 encoding.
 *
*
 * Not edit this file.
 * Edit /resources/locale/' . $lang . '.js
          */
return array(
        ';

        preg_match_all("/'([a-z].*': '[a-z].*)'/i", $file, $result);

        foreach ($result[0] as $key => $value) {
            $php_lang .= '    ' . preg_replace('/\:/', ' =>', $value) . ",\n";
        }

        $php_lang .= '
);';

        $file = '/Library/WebServer/Documents/MBilling_7/resources/locale/php/' . $lang . '/zii.php';

        $fd = fopen($file, "w");

        if (fwrite($fd, $php_lang) === false) {
            echo "Impossible to write to the file $file" . " ($content)";

        }
        fclose($fd);
    }
}
