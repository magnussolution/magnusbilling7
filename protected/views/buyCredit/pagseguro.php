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
?>
<div id="load" ><?php echo Yii::t('yii', 'Please wait while loading...') ?></div>
<script languaje="JavaScript">
    window.onload = function () {
        var form = document.getElementById("buyForm");
        form.submit();
    };
</script>
<?php
//need receive two decimal.
$precioReal = preg_replace("/\.|\,/", '', $_GET['amount']);
?>

<form method="POST" action="https://pagseguro.uol.com.br/security/webpagamentos/webpagto.aspx" target="_parent" id="buyForm">
    <input type="hidden" name="email_cobranca" value="<?php echo $modelMethodPay->username ?>"  />
    <input type="hidden" name="ref_transacao" value="<?php echo $reference ?>"  />
    <input type="hidden" name="tipo" value="CP"  />
    <input type="hidden" name="moeda" value="BRL"  />
    <input type="hidden" name="cliente_nome" value="<?php echo $modelUser->firstname . ' ' . $modelUser->lastname ?>"  />
    <input type="hidden" name="cliente_cep" value="<?php echo $modelUser->zipcode; ?>"  />
    <input type="hidden" name="cliente_end" value="<?php echo $modelUser->address; ?>"  />
    <input type="hidden" name="cliente_num" value="<?php echo $modelUser->id ?>"  />
    <input type="hidden" name="cliente_compl" value=""  />
    <input type="hidden" name="cliente_bairro" value="centro"  />
    <input type="hidden" name="cliente_cidade" value="<?php echo $modelUser->city; ?>"  />
    <input type="hidden" name="cliente_uf" value="<?php echo $modelUser->state; ?>"  />
    <input type="hidden" name="cliente_pais" value="<?php echo $modelUser->country; ?>"  />
    <input type="hidden" name="cliente_ddd" value="11"  />
    <input type="hidden" name="cliente_tel" value="40040435"  />
    <input type="hidden" name="cliente_email" value="<?php echo $modelUser->email; ?>"  />
    <input type="hidden" name="item_id_1" value="<?php echo $reference; ?>"  />
    <input type="hidden" name="item_descr_1" value="Credito voip"  />
    <input type="hidden" name="item_quant_1" value="1"  />
    <input type="hidden" name="item_valor_1" value="<?php echo $precioReal; ?>"  />
</form>