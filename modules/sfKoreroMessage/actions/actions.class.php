<?php

require_once dirname(__FILE__).'/../lib/BasesfKoreroMessageActions.class.php';

/**
 * sfKoreroMessage actions.
 * 
 * @package    sfKoreroPlugin
 * @subpackage sfKoreroMessage
 * @author     Chris Jenkinson
 * @version    SVN: $Id: actions.class.php 12534 2008-11-01 13:38:27Z Kris.Wallsmith $
 */
class sfKoreroMessageActions extends BasesfKoreroMessageActions
{
	public function executeCreate(sfWebRequest $request)
	{
		$this->form = new sfKoreroMessageForm();
		
		if (sfView::NONE !== $this->processForm($request, $this->form))
		{
			if (!$request->isXmlHttpRequest())
			{
				$this->getUser()->setFlash('error', 'You must enter a message!');
			
				$this->redirect('channel_show' , array('id' => $this->message->getChannelId()));
			}
			
			return sfView::ERROR;
		}
		
		return sfView::NONE;
	}
	
	protected function processForm(sfWebRequest $request, sfForm $form)
	{
		$form->bind(
			$request->getParameter($form->getName()),
			$request->getFiles($form->getName())
		);
		
		if ($form->isValid())
		{
			$form->updateObject();
			
			$this->message = $form->getObject();
			
			$this->message->setUserId($this->getUser()->getGuardUser()->getId());
			
			$this->message->save();
			
			if (!$request->isXmlHttpRequest())
			{
				$this->redirect('channel_show', array('id' => $this->message->getChannelId()));
			}
			
			return $this->renderPartial('sfKoreroChannel/list', array('messages' => array($this->message)));
		}
	}
}
