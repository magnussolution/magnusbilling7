<?php
/**
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
 *
 */
class PrefixLengthCommand extends CConsoleCommand
{
    public function run($args)
    {

        $modelPrefix = Prefix::model()->findAll(array(
            'select' => 'SUBSTRING( prefix, 1, 2 ) AS destination, length(prefix) AS prefix',
            'order'  => 'LENGTH( prefix ) DESC',
        ));

        $modelPrefix = Util::unique_multidim_obj($modelPrefix, 'destination');

        $insert = array();
        foreach ($modelPrefix as $key => $value) {
            $insert[] = '(' . $value->destination . ',' . $value->prefix . ')';
        }

        $sql = 'INSERT IGNORE INTO pkg_prefix_length (code,length) VALUES ' . implode(',', $insert) . ';';
        try {
            Yii::app()->db->createCommand($sql)->execute();
        } catch (Exception $e) {

        }

    }
}
