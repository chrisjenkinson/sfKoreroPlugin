<?php slot('title', sprintf('Channel %s', $channel['name'])) ?>
<?php use_helper('Date') ?>
<?php use_javascript('jquery.js') ?>
<?php use_javascript('/sfKoreroPlugin/js/sfKorero.js') ?>

<h3><?php echo $channel['name'] ?></h3>

<p><?php echo $channel['description']?></p>

<table id="korero-message" class="span-18 last">

<tfoot>
<tr>
<td colspan="3">
<?php include_partial('messageform', array('form' => $form)) ?>
</td>
</tr>
</tfoot>

<?php if (count($messages)): ?>

<thead>
<tr>
<th class="span-3">Time</th>
<th class="span-3">From</th>
<th class="span-12 last">Message</th>
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

<span id="korero-nojs"><hr />You do not have JavaScript enabled. Please refresh the page to check for new messages.</span>