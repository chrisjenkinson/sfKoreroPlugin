<?php use_stylesheets_for_form($form) ?>
<?php use_javascripts_for_form($form) ?>

<?php echo form_tag_for($form, '@message', array('class' => 'inline')) ?>
<?php echo $form->renderHiddenFields() ?>

<?php echo $form['message']->render(array('class' => 'text')) ?>

<input type="submit" value="Say" />

</form>

