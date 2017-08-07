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
$url    = "http://finance.yahoo.com/d/quotes.csv?s=ARSUSD=X&f=l1";
$handle = @fopen($url, 'r');
if ($handle) {
    $result = fgets($handle, 4096);
    fclose($handle);
}
$cambio      = trim($result);
$precioPesos = ($_GET['amount'] * 1.15) / $cambio;

?>

<form method="GET" action="<?php echo $modelMethodPay->url ?>" target="_parent" id="buyForm">
<input type="hidden" name="precio" value="<?php echo $precioPesos; ?>">
<input type="hidden" name="id" value="<?php echo $modelMethodPay->username ?>">
<input type="hidden" name="hacia"  value="<?php echo $modelUser->email; ?>">
<input type="hidden" name="codigo" value="<?php echo $modelUser->username ?>">
<input type="hidden" name="venc" value="7">
<input type="hidden" name="concepto" value="<?php echo $reference; ?>">
</form>