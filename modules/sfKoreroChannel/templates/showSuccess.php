<?php slot('title', sprintf('Channel %s', $channel['name'])) ?>
<?php use_helper('Date') ?>
<?php use_javascript('jquery.js') ?>

<?php if (count($messages)): ?>
<?php use_javascript('/sfKoreroPlugin/js/sfKorero.js') ?>
<?php endif; ?>

<h3><?php echo $channel['name'] ?></h3>

<p><?php echo $channel['description']?></p>

<table id="korero-message" class="span-20 last">

<tfoot>

</tr>
</tfoot>

<?php if (count($messages)): ?>

<thead>
<tr>
<td colspan="3" class="span-20">
<?php include_partial('messageform', array('form' => $form)) ?>
</td>
<tr>
<th class="span-3">Time</th>
<th class="span-3">From</th>
<th class="span-14 last">Message</th>
</tr>
</thead>

<tbody>

<?php include_partial('list', array('messages' => $messages)) ?>

</tbody>

<?php else: ?>

<thead>
<tr>
	<td>No messages yet! Go ahead and say something.</td>
</tr>
</thead>

<?php endif; ?>

</table>

<?php if (!$ajax && count($messages)): ?>
<span id="korero-nojs"><hr />You do not have JavaScript enabled. Please refresh the page to check for new messages.</span>
<?php endif; ?>