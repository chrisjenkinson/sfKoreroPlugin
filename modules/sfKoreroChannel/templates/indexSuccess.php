<?php slot('title', 'Channels') ?>

<h2>Channels</h2>

<?php if (count($channels)): ?>

<ul>

<?php foreach ($channels as $channel): ?>

<li><strong><?php echo link_to($channel['name'], 'channel_show_channel', array('slug' => $channel['slug'])) ?></strong> - <?php echo $channel['description'] ?></li>

<?php endforeach; ?>

</ul>

<?php else: ?>

<p>No channels currently exist.</p>

<?php endif; ?>
