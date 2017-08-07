<?php

/**
 * Url for moip ruturn http://ip/billing/index.php/pagSeguro .
 * https://pagseguro.uol.com.br/preferences/automaticReturn.jhtml
 */
class PagSeguroController extends BaseController
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
        $TOKEN  = $modelMethodpay->pagseguro_TOKEN;
        define('TOKEN', $TOKEN);

        if (count($_POST) > 0) {
            // POST recebido, indica que é a requisição do NPI.
            $npi    = new PagSeguroNpi();
            $result = $npi->notificationPost();

            $transacaoID = isset($_POST['TransacaoID']) ? $_POST['TransacaoID'] : '';

            if ($result == "VERIFICADO") {
                $StatusTransacao = $_POST['StatusTransacao'];
                $monto           = str_replace(",", ".", $_POST['ProdValor_1']);
                $usuario         = explode("-", $_POST['Referencia']);
                $usuario         = addslashes(strip_tags(trim($usuario[1])));
                $description     = "Pagamento confirmado, PAGSEGURO:" . $transacaoID;

                if ($StatusTransacao == 'Aprovado') {
                    $modelUser = User::model()->find("username = :usuario", array(':usuario' => $usuario));

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

class PagSeguroNpi
{
    private $timeout = 20; // Timeout em segundos
    public function notificationPost()
    {
        $postdata = 'Comando=validar&Token=' . TOKEN;
        foreach ($_POST as $key => $value) {
            $valued = $this->clearStr($value);
            $postdata .= "&$key=$valued";
        }
        return $this->verify($postdata);
    }
    private function clearStr($str)
    {
        if (!get_magic_quotes_gpc()) {
            $str = addslashes($str);
        }
        return $str;
    }

    private function verify($data)
    {
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, "https://pagseguro.uol.com.br/pagseguro-ws/checkout/NPI.jhtml");
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HEADER, false);
        curl_setopt($curl, CURLOPT_TIMEOUT, $this->timeout);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        $result = trim(curl_exec($curl));
        curl_close($curl);
        return $result;
    }

}
