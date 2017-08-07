<?php
/**
 * View to modulo "PlacetoPay".
 *
 * =======================================
 * ###################################
 * MagnusBilling
 *
 * @package    MagnusBilling
 * @author    Adilson Leffa Magnus.
 * @copyright    Todos os direitos reservados.
 * ###################################
 * =======================================
 * MagnusSolution.com <info@magnussolution.com>
 * 2016-03-18
 */
?>
<?php

require_once "lib/gerencianet/vendor/autoload.php";

use Gerencianet\Exception\GerencianetException;
use Gerencianet\Gerencianet;

$modelUser->doc = preg_replace("/-|\.|\//", "", $modelUser->doc);
if (!isset($modelUser->email) || strlen($modelUser->email) < 10 || !preg_match("/@/", $modelUser->email)) {
    echo "<div id='load' > " . Yii::t('yii', 'Email invalido, por favor verifique seu email') . "</div> ";
    return;
}

if (!isset($modelUser->doc) || strlen($modelUser->doc) < 10) {
    echo "<div id='load' > " . Yii::t('yii', 'Você precisa cadastrar seu CPF/CNPJ') . "</div> ";
    return;
}
if (!preg_match("/^[1-9]{2}9?[0-9]./", $modelUser->phone)) {
    echo "<div id='load' > " . Yii::t('yii', 'Você precisa cadastrar seu telefone: FORMATO DDD número') . "</div> ";
    return;
}
$tipo = strlen($modelUser->doc) == 11 ? 'fisica' : 'juridica';

if ($tipo == 'juridica') {
    if (!isset($modelUser->company_name) || strlen($modelUser->company_name) < 10) {
        echo "Voce precisa cadastrar o nome da empresa";
        return;
    }
}

if (!isset($_GET['id'])) {
    $amount = preg_replace("/\.|\,/", '', $_GET['amount']);

    $clientId     = $modelMethodPay->client_id; // insira seu Client_Id, conforme o ambiente (Des ou Prod)
    $clientSecret = $modelMethodPay->client_secret; // insira seu Client_Secret, conforme o ambiente (Des ou Prod)

    $options = [
        'client_id'     => $clientId,
        'client_secret' => $clientSecret,
        'sandbox'       => false, // altere conforme o ambiente (true = desenvolvimento e false = producao)
    ];

    $item_1 = [
        'name'   => "usuario, " . $modelUser->username, // nome do item, produto ou serviço
        'amount' => 1, // quantidade
        'value'  => intval($amount), // valor (1000 = R$ 10,00)
    ];

    $items = [
        $item_1,
    ];

    $metadata = array('notification_url' => 'http://' . $_SERVER['HTTP_HOST'] . '/mbilling/index.php/gerencianet?id_user=' . $modelUser->id . '&id=' . time() . '&amount=' . $_GET['amount']);

    $body = [
        'items'    => $items,
        'metadata' => $metadata,
    ];

    try {
        $api    = new Gerencianet($options);
        $charge = $api->createCharge([], $body);
        print_r($charge);
    } catch (GerencianetException $e) {
        print_r($e->code);
        print_r($e->error);
        print_r($e->errorDescription);
    } catch (Exception $e) {
        print_r('88' . $e);
    }

    if (isset($charge['data']['charge_id'])) {
        //echo "Processando Pagamento ID: ". $charge['data']['charge_id']." .....<br>";
    } else {
        exit;
    }

    sleep(1);
} else {

    $charge['data']['charge_id'] = $_GET['id'];
}

$params = [
    'id' => $charge['data']['charge_id'],
];

$modelUser->firstname = isset($modelUser->firstname) ? $modelUser->firstname : '';
$modelUser->lastname  = isset($modelUser->lastname) ? $modelUser->lastname : '';
$modelUser->address   = isset($modelUser->address) ? $modelUser->address : '';

$modelUser->city    = isset($modelUser->city) ? $modelUser->city : '';
$modelUser->state   = isset($modelUser->state) ? $modelUser->state : '';
$modelUser->zipcode = isset($modelUser->zipcode) ? $modelUser->zipcode : '';
$modelUser->phone   = isset($modelUser->phone) ? $modelUser->phone : '';
$modelUser->email   = isset($modelUser->email) ? $modelUser->email : '';
$cpf                = isset($modelUser->doc) ? $modelUser->doc : '';

$customer = [
    'name'         => $modelUser->firstname . ' ' . $modelUser->lastname, // nome do cliente
    'cpf'          => $cpf, // cpf válido do cliente
    'phone_number' => $modelUser->phone, // telefone do cliente
    'email'        => $modelUser->email,
];

if ($tipo == 'juridica') {
    unset($customer['cpf']);
    $customer['juridical_person'] = array(
        'corporate_name' => $modelUser->company_name,
        'cnpj'           => $cpf,
    );
}

$dataVencimento = date("Y-m-d", mktime(0, 0, 0, date("m"), date("d") + 7, date("Y")));

$bankingBillet = [
    'expire_at' => $dataVencimento, // data de vencimento do boleto (formato: YYYY-MM-DD)
    'customer'  => $customer,
];

$payment = [
    'banking_billet' => $bankingBillet, // forma de pagamento (banking_billet = boleto)
];

$body = [
    'payment' => $payment,
];

try {
    $api    = new Gerencianet($options);
    $charge = $api->payCharge($params, $body);

    if ($charge['code'] == 200) {
        header('Location: ' . $charge['data']['link']);
    } else {
        echo '1';
        print_r($charge);
    }
} catch (GerencianetException $e) {
    echo 'Error';
    print_r($e->code);
    print_r($e->error);
    print_r($e->errorDescription);
} catch (Exception $e) {
    echo 'Error2';
    print_r($e->getMessage());
}

?>
<div id='load' ><?php echo Yii::t('yii', 'Please wait while loading...') ?></div>