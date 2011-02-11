<?php

/**
 * PluginsfKoreroMessage form.
 *
 * @package    ##PROJECT_NAME##
 * @subpackage form
 * @author     ##AUTHOR_NAME##
 * @version    SVN: $Id$
 */
abstract class PluginsfKoreroMessageForm extends BasesfKoreroMessageForm
{
	public function setup()
	{
		parent::setup();
		
		$channel = $this->getObject();
		
		$this->useFields(array('channel_id', 'message'));
		
		$this->widgetSchema['channel_id'] = new sfWidgetFormInputHidden();
		$this->widgetSchema['message'] = new sfWidgetFormInputText();
	}
}
