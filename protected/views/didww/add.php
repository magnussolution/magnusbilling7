<?php header('Content-type: text/html; charset=utf-8');?>
<link rel="stylesheet" type="text/css" href="../../resources/css/signup.css" />

<?php $form = $this->beginWidget('CActiveForm', array(
    'id'                   => 'contactform',
    'htmlOptions'          => array('class' => 'rounded'),
    'enableAjaxValidation' => false,
    'clientOptions'        => array('validateOnSubmit' => true),
    'errorMessageCssClass' => 'error',
));?>

<br/>



<div class="field">
	<?php echo $form->labelEx($did, Yii::t('yii', 'Country')) ?>
	<?php echo $form->textField($did, 'country', array('class' => 'input')) ?>
	<?php echo $form->error($did, 'Country') ?>
	<p class="hint"><?php echo Yii::t('yii', 'Enter your') . ' ' . Yii::t('yii', 'Country') ?></p>
</div>




<?php echo CHtml::submitButton(Yii::t('yii', 'Save'), array('class' => 'button')); ?>

<?php $this->endWidget();?>