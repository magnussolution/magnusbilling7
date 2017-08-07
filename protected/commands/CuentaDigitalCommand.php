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
class CuentaDigitalCommand extends ConsoleCommand
{
    public function run($args)
    {
        $url    = "http://finance.yahoo.com/d/quotes.csv?s=ARSUSD=X&f=l1";
        $handle = @fopen($url, 'r');
        if ($handle) {
            $result = fgets($handle, 4096);
            fclose($handle);
        }
        $cambio = trim($result);

        $date = date('Ymd');

        $lines = file('https://www.cuentadigital.com/exportacion.php?control=50dccff9ad9dc1946ff9b9020b5acafe&fecha=' . $date . '');

        for ($i = 0; $i < count($lines); $i++) {
            if (list($fecha, $monto_pago, $monto, $codigo_barras, $codigo_opcional, $medio_pago, $num_pago) = preg_split("/\//", $lines[$i])) {
                $identification = Util::getDataFromMethodPay($codigo_opcional);
                if (!is_array($identification)) {
                    exit;
                }

                $username = $identification['username'];
                $id_user  = $identification['id_user'];

                $monto = preg_replace("/\.|\,/", "", $monto);
                $monto = ($monto * $cambio) * 0.875;

                $description = $medio_pago . ' ' . $codigo_barras;
                $modelUser   = User::model()->findByPk((int) $id_user);

                if (count($modelUser)) {
                    UserCreditManager::releaseUserCredit($modelUser->id, $monto, $description, 1, $codigo_barras);
                }

            }
        }
    }
}
