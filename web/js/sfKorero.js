/**
 * @fileoverview
 * Utility scripts for sfKoreroPlugin
 * @version 0.0.2
 * @author Chris Jenkinson <chris@chrisjenkinson.org>
 */

$(document).ready(function()
{
	/*
	 * User-defined variables
	 */
	
	var
		_close_on_blur		= true,
		_update_interval	= 5000,
		_comments_max		= 25,
	
	/*
	 * Internal variables
	 */
	
		_korero_open		= false,
		_korero_onpage		= false,
		
		_interval_id, _content_height, _channel_height, _new_height, _channel_href,
	
		_content_height_orig = $("#content").height(),
	
		$_korero_channel, $_korero_overlay, $_korero_inner, $_korero_loading, $_korero_close,

		_resize_overlay, _open, _close, _update, _remove_nomessages, _remove_messageheader, _show_messageheader, _remove_extra;
	
	_korero_onpage = ($("#korero-message").length ? true : false);
	$("#korero-nojs").remove();
	
	/**
	 * Resizes the overlay 
	 * @type void
	 */
	_resize_overlay = function()
	{
		_content_height = $("#content").outerHeight();
		_channel_height = $("#korero-channel").outerHeight();
		
		if (_content_height < _channel_height)
		{
			$('#content').animate({height: _channel_height}, 'fast', function() {
				$('#korero-overlay').fadeTo('fast', 0.85);
			});
		}
	};
	
	/**
	 * Opens the channel window
	 * @param {event} e jQuery event
	 * @type void
	 */
	_open = function(e)
	{
		e.preventDefault();
			
		_korero_open = true;
		_channel_href = e.target.href;
				
		$_korero_channel	= $('<div id="korero-channel" class="span-24">');
		$_korero_overlay	= $('<div id="korero-overlay" class="overlay span-22 push-1 pull-1">').css({opacity: 1, height: "auto"});
		$_korero_inner		= $('<div id="korero-inner" class="prepend-top append-bottom prepend-1 append-1">');
		$_korero_loading	= $('<p>Loading...</p>');
		$_korero_close		= $('<div id="korero-close"><a href="" class="korero quiet">close</a></div>').css({float: "right"});
		
		$_korero_channel.append($_korero_overlay);
		$_korero_overlay.append($_korero_inner);
		
		$("#content").css({position: "relative"});
			
		$_korero_channel.css({position: "absolute"});
		
		$_korero_inner.html($_korero_loading);
		$_korero_inner.prepend($_korero_close);
		
		_resize_overlay();
		
		$(window).scrollTop(0);
		
		$("#content .content").fadeTo("fast", 0.4, function()
		{
			$("#content .content").after($_korero_channel);
		});
		
		$.get(_channel_href, function(data)
		{
			$("#korero-inner").html(data);
			
			$("#korero-inner").prepend($_korero_close);
			_resize_overlay();
			
			if ($("#korero-message tbody tr").length)
			{
				_remove_nomessages();
			}
			else
			{
				_remove_messageheader();
			}
			
			_interval_id = setInterval(function()
			{
				_update();
			}, _update_interval);
		});
	};
	
	/**
	 * Closes the channel window
	 * @param {event} e jQuery event
	 * @type void
	 */
	_close = function(e)
	{
		e.preventDefault();
			
		_korero_open = false;
		clearInterval(_interval_id);
	
		$("#content .content").fadeTo("slow", 1);
		
		$("#korero-channel").fadeOut("fast", function()
		{
			$(this).remove();
			$("#content").animate({height: _content_height_orig}, "fast", function()
			{
				$('#content').css('height', '');
			});
		});
	};
	
	/**
	 * Checks for and adds new messages, removes old ones, and resizes the overlay
	 * @type void
	 */
	_update = function()
	{
		$.get(_channel_href, { ajax: "true" }, function(data)
		{
			if (data)
			{
				$("#korero-message tbody").prepend(data);
				
				if (!$("#korero-message tbody tr").length)
				{
					_remove_nomessages();
					_show_messageheader();
				}
			}
			
			_remove_extra();
			
			_resize_overlay();
		});
	};
	
	/**
	 * Hides the "no messages" information 
	 * @type void
	 */
	_remove_nomessages = function()
	{
		$("#korero-nomessages").hide();
	};
	
	/**
	 * Hides the message header row
	 * @type void
	 */
	_remove_messageheader = function()
	{
		$("#korero-messageheader").hide();
	};
	
	/**
	 * Shows the message header row
	 * @type void
	 */
	_show_messageheader = function()
	{
		$("#korero-messageheader").show();
	};
	
	/**
	 * Removes the last message if there are too many messages displayed
	 * @type void
	 */
	_remove_extra = function()
	{
		if (_comments_max < $("#korero-message tbody tr").length)
		{
			$("#korero-message tbody tr:last").remove();
		}
	};
	
	$("a.korero").live('click', function(event)
	{		
		if (!_korero_onpage)
		{
			if (!_korero_open)
			{
				_open(event);
			}
			else
			{
				_close(event);
			}
		}
	});
	
	$("#korero-message form").live('submit', function()
	{
		if ("" === $("#korero-message form .text").val())
		{
			return false;
		}
		
		$("#korero-message form :submit").val("Saying...").attr("disabled", "disabled");
		
		$.post($("#korero-message form").attr("action"), $("#korero-message form").serialize(), function(data)
		{
			$("#korero-message :input").not(":submit, input:hidden").val("");
			$("#korero-message form :submit").val("Say").removeAttr("disabled");
			
			if (!$("#korero-message tbody tr").length)
			{
				_remove_nomessages();
				_show_messageheader();
			}
			
			$("#korero-message tbody").prepend(data);
			
			_remove_extra();
			
			_resize_overlay();
		});
		
		return false;
	});
	
	$(window).blur(function(event)
	{
		if (_korero_open && _close_on_blur)
		{
			_close(event);
		}
	});
});
