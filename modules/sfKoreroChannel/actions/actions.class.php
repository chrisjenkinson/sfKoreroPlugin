<?php

require_once dirname(__FILE__).'/../lib/BasesfKoreroChannelActions.class.php';

/**
 * sfKoreroChannel actions.
 * 
 * @package    sfKoreroPlugin
 * @subpackage sfKoreroChannel
 * @author     Chris Jenkinson
 * @version    SVN: $Id: actions.class.php 12534 2008-11-01 13:38:27Z Kris.Wallsmith $
 */
class sfKoreroChannelActions extends BasesfKoreroChannelActions
{
	public function executeIndex(sfWebRequest $request)
	{
		$this->channels = sfKoreroChannel::getChannels();
	}
	
	public function executeShow(sfWebRequest $request)
	{
		$this->channel = $this->getRoute()->getObject();
		
		if ($request->isXmlHttpRequest() && $request->getParameter('ajax'))
		{
			if ($request->getParameter('since'))
			{
				$since = $request->getParameter('since');
			}
			else
			{
				$since = time() - 10;
			}
			
			$messages = $this->channel->getMessages($since, $this->getUser()->getGuardUser()->getId());
			
			if (!empty($messages))
			{
				return $this->renderPartial('sfKoreroChannel/list', array('messages' => $messages));
			}
			else
			{
				return sfView::NONE;
			}
		}
		else
		{
			$this->messages = $this->channel->getMessages();
		
			$message = new sfKoreroMessage();
			
			$message->setChannelId($this->channel['id']);
			$message->setUserId($this->getUser()->getGuardUser()->getId());
			
			$this->form = new sfKoreroMessageForm($message);
			$this->ajax = $request->isXmlHttpRequest();
		}
	}
}
