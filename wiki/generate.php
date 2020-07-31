<?php
echo '<pre>';
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
$langs = ['pt_BR'];
//get_columns($conn);

//updateFromJsFile($conn);

whiteToWiki($conn, $langs);

function whiteToWiki($conn, $langs)
{

    foreach ($langs as $key => $lang) {

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

            $h1 = '';
            for ($i = 0; $i < strlen($module->wiki_module); $i++) {
                $h1 .= '*';
            }

            $content = '
' . $h1 . '
' . ucfirst($module->wiki_module) . '
' . $h1 . '



';

            $sql     = "SELECT * FROM wiki WHERE wiki_language = '" . $lang . "' AND wiki_module = '" . $module->wiki_module . "'";
            $command = $conn->prepare($sql);
            $command->execute();
            $fields = $command->fetchAll(PDO::FETCH_OBJ);

            foreach ($fields as $key => $field) {
                $h5 = '';
                for ($i = 0; $i < strlen($field->wiki_field); $i++) {
                    $h5 .= '"';
                }

                $content .= '
.. _' . $module->wiki_module . '-' . $field->wiki_field . ':

' . $field->wiki_field . '
' . $h5 . '

' . $field->wiki_value . '


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

function get_columns($conn, $langs)
{

    $sql     = "SHOW TABLES";
    $command = $conn->prepare($sql);

    $command->execute();
    $tables = $command->fetchAll(PDO::FETCH_ASSOC);

    foreach ($tables as $key => $table) {

        $table   = $table['Tables_in_mbilling7'];
        $module  = substr($table, 4);
        $sql     = "SHOW COLUMNS FROM " . $table;
        $command = $conn->prepare($sql);

        $command->execute();
        $columns = $command->fetchAll(PDO::FETCH_ASSOC);

        foreach ($langs as $key => $lang) {

            foreach ($columns as $key => $column) {
                if ($column['Field'] == 'id') {
                    continue;
                }

                $sql     = "INSERT INTO wiki (wiki_module, wiki_field, wiki_value, wiki_language) VALUES ('" . preg_replace('/_|-/', '', $module) . "','" . preg_replace('/_|-/', '', $column['Field']) . "','','" . $lang . "')";
                $command = $conn->prepare($sql);
                try {
                    $command->execute();
                } catch (Exception $e) {

                }
            }

        }

    }

}

function updateFromJsFile($conn, $langs)
{

    foreach ($langs as $key => $lang) {

        $json = file_get_contents('../resources/help/help_' . $lang . '.js');

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
