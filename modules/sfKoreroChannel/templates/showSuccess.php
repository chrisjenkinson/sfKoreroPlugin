<?php slot('title', sprintf('Channel %s', $channel['name'])) ?>
<?php use_helper('Date') ?>
<?php use_javascript('jquery.js') ?>

<?php if (count($messages)): ?>
<?php use_javascript('/sfKoreroPlugin/js/sfKorero.js') ?>
<?php endif; ?>

<h3><?php echo $channel['name'] ?></h3>

<p><?php echo $channel['description']?></p>

<table id="korero-message" class="span-20 last">

<thead>
	<tr>
		<td colspan="3" class="span-20">
		<?php include_partial('messageform', array('form' => $form)) ?>
		</td>
	</tr>
	<?php if (!count($messages) || $ajax): ?>
	<tr id="korero-nomessages">
		<td colspan="3" class="span-20"><strong>No messages yet! Go ahead and say something.</strong></td>
	</tr>
	<?php endif; ?>
	<?php if (count($messages) || $ajax): ?>
	<tr id="korero-messageheader">
		<th class="span-3">Time</th>
		<th class="span-3">From</th>
		<th class="span-14 last">Message</th>
	</tr>
	<?php endif; ?>
</thead>

<tbody>

<?php include_partial('list', array('messages' => $messages)) ?>

</tbody>

</thead>

</table>

<?php if (!$ajax && count($messages)): ?>
<span id="korero-nojs"><hr />You do not have JavaScript enabled. Please refresh the page to check for new messages.</span>
<?php endif; ?>
