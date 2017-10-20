<?php

class MolPayController extends Controller
{
    public function actionIndex()
    {

        /*$_POST = array(
        'skey'       => "bdaa623a10bd92ca393c069d81170f7b",
        'tranID'     => '22771468',
        'domain'     => 'teztelcom',
        'status'     => '00',
        'amount'     => '2.00',
        'currency'   => 'RM',
        'paydate'    => '2017-10-16 14:39:44',
        'orderid'    => '20171016043931-281060287519',
        'appcode'    => '',
        'error_code' => '',
        'error_desc' => '',
        'channel'    => 'FPX',
        );
         */
        Yii::log(print_r($_REQUEST, true), 'error');
        $filter = "payment_method = 'MolPay'";
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
            Yii::log('Methos pay not found', 'error');
            exit;
        }

        $idUser = $modelMethodpay->idUser->id_user;
        $vkey   = $modelMethodpay->pagseguro_TOKEN;

        if (count($_POST) > 0) {

            $tranID   = $_POST['tranID'];
            $orderid  = $_POST['orderid'];
            $status   = $_POST['status'];
            $domain   = $_POST['domain'];
            $amount   = $_POST['amount'];
            $currency = $_POST['currency'];
            $appcode  = $_POST['appcode'];
            $paydate  = $_POST['paydate'];
            $skey     = $_POST['skey'];

            // All undeclared variables below are coming from POST method
            $key0 = md5($tranID . $orderid . $status . $domain . $amount . $currency);
            $key1 = md5($paydate . $domain . $key0 . $appcode . $vkey);

            Yii::log(print_r($skey . ' ' . $key1, true), 'error');

            if ($skey != $key1) {
                $status = -1;
            }
            // invalid transaction
            //-------------------------------------------
            if ($status == "00") {

                Yii::log(print_r($status . 'OK 00', true), 'error');

                $usuario = explode("-", $orderid);
                $usuario = addslashes(strip_tags(trim($usuario[1])));
                $status  = $_POST['status'];
                $amount  = str_replace(",", ".", $amount);
                $amount  = $amount * 0.9434;

                $description = "Received via MOLPAY:" . $tranID;
                Yii::log(print_r($description, true), 'error');

                Yii::log('usuario=' . $usuario . ', Valor = ' . $amount, 'error');
                $modelUser = User::model()->find(
                    "username = :usuario",
                    array(
                        ':usuario' => $usuario)
                );

                if (count($modelUser)) {
                    UserCreditManager::releaseUserCredit($modelUser->id, $amount, $description, 1, $tranID);
                }

            } else {
                // failure action
                echo 'Error';
                exit;
            }

        } else {
            echo '<h3>thanks.</h3>';
        }
    }
}
