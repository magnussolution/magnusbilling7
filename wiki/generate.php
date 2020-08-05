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

//updateFromEXTJSFile($conn, $langs);

//get_columns($conn);

//updateValueFromJsFile($conn, $langs);

whiteToWiki($conn, $langs);

function whiteToWiki($conn, $langs)
{

    foreach ($langs as $key => $lang) {

        $main_menus = [
            ['user' => 'users'],
            ['refill' => 'billing'],
            ['did' => 'did'],
            ['plan' => 'rates'],
            ['call' => 'reports'],
            ['trunk' => 'routes'],
            ['configuration' => 'config'],
            ['campaign' => 'callcenter'],
            ['callshop' => 'users'],
            ['services' => 'Services'],
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

            $content_index = '';
            $content .= '   ' . array_keys($menu)[0] . '/index.rst' . "\n";

            $file_index = '/Library/WebServer/Documents/MBilling_7/wiki/' . $lang . '/modules/' . array_keys($menu)[0] . '/index.rst';
            $content_index .= '*********
' . getTranslation($menu[array_keys($menu)[0]], $lang) . '
*********


';

            $sql     = "SELECT * FROM pkg_module WHERE id_module = (SELECT id FROM pkg_module WHERE text LIKE '%" . $menu[array_keys($menu)[0]] . " Module%' AND id_module IS NULL) ORDER BY priority";
            $command = $conn->prepare($sql);
            $command->execute();
            $sub_modules = $command->fetchAll(PDO::FETCH_OBJ);

            foreach ($sub_modules as $key => $sub_module) {

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

                $description = strlen($field->wiki_value) ? $field->wiki_value : getTranslation('We not write the description to this field.', $lang);

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

            $fields = preg_split('/{/', $data);

            foreach ($fields as $key => $field) {

                $lines = preg_split("/(\r\n|\n|\r)/", $field);

                $label = $name = '';
                foreach ($lines as $key => $line) {

                    if (preg_match('/name:/', $line)) {

                        $name = preg_split('/:/', substr($line, 0, -2));

                        $name = preg_replace('/\'| /', '', $name[1]);

                        if (preg_match('/\?/', $name)) {
                            $name = preg_split('/\?/', $name);
                            $name = $name[1];
                        }

                        continue;

                    }
                    if (preg_match('/fieldLabel:/', $line)) {
                        $label = preg_split('/:/', substr($line, 0, -2));
                        if (!isset($label[1])) {
                            print_r($label);
                            exit;
                        }
                        $label = preg_replace('/t\(\'/', '', $label[1]);
                        $label = strtok($label, '\')');

                        if (preg_match('/\?/', $label)) {
                            $label = preg_split('/\?/', $label);
                            $label = $label[1];
                        }
                        continue;
                    }

                }

                if (!strlen($name)) {
                    continue;
                }

                $sql     = "INSERT INTO wiki (wiki_module, wiki_field,wiki_label, wiki_value, wiki_language) VALUES ('" . $file . "','" . $name . "','" . $label . "','','" . $lang . "')";
                $command = $conn->prepare($sql);
                try {
                    $command->execute();
                } catch (Exception $e) {

                }

            }

        }
    }

    exit;
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
    $file  = str_replace('Help.load({', '', $file);

    $line  = explode("\n", $file);
    $lines = preg_replace('/    |\'/', '', $line);
    foreach ($lines as $key => $line) {

        if (strtok($line, ':') == $value) {
            return trim(substr(strtok(''), 0, -1));
        }

    }
    return trim($value);

}
