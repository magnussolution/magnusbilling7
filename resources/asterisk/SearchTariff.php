<?php
/**
 * =======================================
 * ###################################
 * MagnusBilling
 *
 * @package MagnusBilling
 * @author Adilson Leffa Magnus.
 * @copyright Copyright (C) 2005 - 2018 MagnusSolution. All rights reserved.
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
class SearchTariff
{

    public function find(&$MAGNUS, &$agi)
    {

        if (file_exists(dirname(__FILE__) . '/beforeSearchTariff.php')) {
            include dirname(__FILE__) . '/beforeSearchTariff.php';
        }

        $max_len_prefix       = strlen($MAGNUS->destination);
        $MAGNUS->prefixclause = '(';
        while ($max_len_prefix >= 1) {
            $MAGNUS->prefixclause .= "prefix='" . substr($MAGNUS->destination, 0, $max_len_prefix) . "' OR ";
            $max_len_prefix--;
        }

        $MAGNUS->prefixclause = substr($MAGNUS->prefixclause, 0, -3) . ")";

        $sql = "SELECT lcrtype, pkg_plan.id AS id_plan, pkg_prefix.prefix AS dialprefix, " .
        "pkg_plan.name, pkg_rate.id_prefix, pkg_rate.id AS id_rate, minimal_time_charge, " .
        "rateinitial, initblock, billingblock, connectcharge, disconnectcharge disconnectcharge, " .
        "pkg_rate.id_trunk AS id_trunk, pkg_rate.additional_grace AS additional_grace, package_offer " .
        "FROM pkg_plan " .
        "LEFT JOIN pkg_rate ON pkg_plan.id = pkg_rate.id_plan " .
        "LEFT JOIN pkg_prefix ON pkg_rate.id_prefix = pkg_prefix.id " .
        "WHERE pkg_plan.id=$MAGNUS->id_plan AND pkg_rate.status = 1 AND " . $MAGNUS->prefixclause .
            "ORDER BY LENGTH( prefix ) DESC LIMIT $MAGNUS->tariff_limit";
        $result = $agi->query($sql)->fetchAll(PDO::FETCH_ASSOC);
        // $agi->verbose($result, 25);

        if (!is_array($result) || count($result) == 0) {
            return 0;
        }

        //1) REMOVE THOSE THAT HAVE A SMALLER DIALPREFIX
        $max_len_prefix = strlen($result[0]['dialprefix']);
        for ($i = 1; $i < count($result); $i++) {
            if (strlen($result[$i]['dialprefix']) < $max_len_prefix) {
                break;
            }

        }

        $result = array_slice($result, 0, $i);

        $mylistoftrunk = array();

        //Select custom rate to user
        $sql           = "SELECT * FROM pkg_user_rate WHERE id_user = $MAGNUS->id_user AND id_prefix = '" . $result[0]['id_prefix'] . "' LIMIT 1";
        $modelUserRate = $agi->query($sql)->fetch(PDO::FETCH_OBJ);

        for ($i = 0; $i < count($result); $i++) {
            //change custom rate to user
            if (isset($modelUserRate->id)) {
                $result[$i]['rateinitial']  = $modelUserRate->rateinitial;
                $result[$i]['initblock']    = $modelUserRate->initblock;
                $result[$i]['billingblock'] = $modelUserRate->billingblock;
            }

            $status               = $result[$i]['status']; //status trunk
            $mylistoftrunk_next[] = $mycurrenttrunk = $result[$i]['id_trunk'];

            //Check if we already have the same trunk in the rate
            if (($i == 0 || !in_array($mycurrenttrunk, $mylistoftrunk))) {
                $distinct_result[] = $result[$i];
            }
            if ($status == 1) {
                $mylistoftrunk[] = $mycurrenttrunk;
            }

        }
        $number_trunk = count($distinct_result); //total de troncos

        $agi->verbose("NUMBER TRUNK FOUND " . $number_trunk, 10);

        if (file_exists(dirname(__FILE__) . '/AfterSearchTariff.php')) {
            include dirname(__FILE__) . '/AfterSearchTariff.php';
        }

        return $distinct_result;

    }

    public function load_balancer(&$agi, $result)
    {
        $agi->verbose('Load Balancer', 15);
        $total        = count($result);
        $sql          = "SELECT * FROM pkg_balance WHERE id_prefix = " . $result[0]['dialprefix'] . " LIMIT 1";
        $modelBalance = $agi->query($sql)->fetch(PDO::FETCH_OBJ);

        if (isset($modelBalance->last_use)) {
            $ultimo = $modelBalance->last_use;
            if ($modelBalance->last_use >= $total - 1) {
                $sql = "UPDATE pkg_balance SET last_use = 0 WHERE id_prefix = " . $result[0]['dialprefix'];
            } else {
                $sql = "UPDATE pkg_balance SET last_use = last_use + 1 WHERE id_prefix = " . $result[0]['dialprefix'];
            }
            $agi->exec($sql);
        } else {
            $sql = "INSERT INTO pkg_balance (last_use, id_prefix) VALUES (0, '" . $result[0]['dialprefix'] . ")";
            $agi->exec($sql);
            $ultimo = 0;
        }

        //coloca o id ultimo em primeiro
        $result = array_filter(array_merge(array($result[$ultimo]), $result));

        //retira o id dublicado
        for ($i = 0; $i <= $total; $i++) {
            if ($i > 0) {
                if ($result[$i]['id_rate'] == $result[0]['id_rate']) {
                    unset($result[$i]);
                }
            }
        }
        $result = array_values($result);
        foreach ($result as $key => $value) {
            $agi->verbose($key . ' => ' . print_r($value['id_rate'], true), 15);
        }

        return $result;
    }

    public function array_csort()
    {
        $args      = func_get_args();
        $marray    = array_shift($args);
        $i         = 0;
        $msortline = "return(array_multisort(";
        foreach ($args as $arg) {
            $i++;
            if (is_string($arg)) {
                foreach ($marray as $row) {
                    $sortarr[$i][] = $row[$arg];
                }
            } else {
                $sortarr[$i] = $arg;
            }
            $msortline .= "\$sortarr[" . $i . "],";
        }
        $msortline .= "\$marray));";
        eval($msortline);
        return $marray;
    }

}
