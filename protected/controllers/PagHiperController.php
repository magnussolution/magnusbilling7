<?php

/**
 * Acoes do modulo "Methodpay".
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
 * 04/09/2017
 */
class PagHiperController extends Controller
{
    public function actionIndex()
    {

        $filter = "payment_method = 'Pagseguro'";
        $params = array();

        if (isset($_GET['agent'])) {
            $filter .= " AND u.username = :username";
            $params = array(':username' => addslashes(strip_tags(trim($_GET['agent']))));
        } else {
            $filter .= " AND u.id = 1";
        }

        $modelMethodpay = Methodpay::model()->find(array(
            'condition' => $filter,
            'join'      => 'INNER JOIN pkg_user u ON t.id_user = u.id',
            'params'    => $params,
        ));

        if (!count($modelMethodpay)) {
            exit;
        }

        $idUser = $modelMethodpay->idUser->id_user;
        $token  = $modelMethodpay->pagseguro_TOKEN;

        if (count($_POST) > 0) {
            // POST recebido, indica que é a requisição do NPI.

            $transacaoID   = isset($_POST['idTransacao']) ? $_POST['idTransacao'] : '';
            $status        = $_POST['status'];
            $codRetorno    = $_POST['codRetorno'];
            $valorOriginal = $_POST['valorOriginal'];
            $valorLoja     = $_POST['valorLoja'];
            //PREPARA O POST A SER ENVIADO AO PAGHIPER PARA CONFIRMAR O RETORNO
            //INICIO - NAO ALTERAR//
            //Não realizar alterações no script abaixo//
            $post = "idTransacao=$idTransacao" .
                "&status=$status" .
                "&codRetorno=$codRetorno" .
                "&valorOriginal=$valorOriginal" .
                "&valorLoja=$valorLoja" .
                "&token=$token";
            $enderecoPost = "https://www.paghiper.com/checkout/confirm/";

            ob_start();
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $enderecoPost);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_HEADER, false);
            curl_setopt($ch, CURLOPT_TIMEOUT, 30);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            $resposta = curl_exec($ch);
            curl_close($ch);

            $confirmado = (strcmp($resposta, "VERIFICADO") == 0);

            //FIM - NAO ALTERAR//

            if ($confirmado) {

                $idPlataforma    = $_POST['idPlataforma'];
                $usuario         = explode("-", $idPlataforma);
                $usuario         = addslashes(strip_tags(trim($usuario[1])));
                $id_user         = addslashes(strip_tags(trim($usuario[2])));
                $StatusTransacao = $_POST['status'];
                $monto           = str_replace(",", ".", $_POST['valorTotal']);

                $description = "Pagamento confirmado, PAGHIPER:" . $transacaoID;

                if ($status == 'Aprovado') {
                    $modelUser = User::model()->find(
                        "username = :usuario AND id = :key",
                        array(
                            ':usuario' => $usuario,
                            ':key'     => $id_user)
                    );

                    if (count($modelUser)) {
                        UserCreditManager::releaseUserCredit($modelUser->id, $monto, $description, 1, $transacaoID);
                    }
                }
            } else {
                echo 'error';
            }
        } else {
            echo '<h3>Obrigado por efetuar a compra.</h3>';
        }
    }
}
