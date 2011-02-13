$(document).ready(function()
{
	var _korero_open = false;
	var _korero_onpage = false;
	var _date = new Date;
	var _update_interval = 5000;
	var _interval_id;
	var _comments_max = 20;
	
	var _content_height, _channel_height, _new_height;
	
	var _content_height_orig = $("#content").height();
	
	var _channel_href;
	
	var $_korero_channel, $_korero_overlay, $_korero_inner, $_korero_loading, $_korero_close;
	
	$("#content").height(_content_height_orig);
	_korero_onpage = ($("#korero-message").length ? true : false);
	
	var _resize_overlay = function()
	{
		_content_height = $("#content").outerHeight();
		_channel_height = $("#korero-channel").outerHeight();
		
		_new_height = (_content_height > _channel_height ? _content_height : _channel_height);
		
		$("#korero-channel").height(_new_height);
		
		$("#content").animate({height: _new_height}, "fast", function()
		{
			$("#korero-overlay").fadeTo("fast", 0.85);
			$("#content .content").height(_new_height);
			
			$("#korero-channel").height("auto");
		});
	};
	
	var _open = function(e)
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
			
		$("#content .content").css({position: "absolute"});
		$_korero_channel.css({position: "absolute"});
		
		$_korero_inner.html($_korero_loading);
		$_korero_inner.prepend($_korero_close);
		
		_resize_overlay();
		
		$("#content .content").fadeTo("fast", 0.4, function()
		{
			$("#content .content").after($_korero_channel);
		});
		
		$.get(_channel_href, function(data)
		{
			$("#korero-inner").html(data);
			$("#korero-inner").prepend($_korero_close);
			_resize_overlay();
			
			_interval_id = setInterval(function()
			{
				_update();
			}, _update_interval);
		});
	};
	
	var _close = function(e)
	{
		e.preventDefault();
			
		_korero_open = false;
		clearInterval(_interval_id);
	
		$("#content .content").fadeTo("slow", 1);
		$("#content .content").height("100%");
		
		$("#korero-channel").fadeOut("fast", function()
		{
			$(this).remove();
			$("#content").animate({height: _content_height_orig}, "fast");
		});
	};
	
	var _update = function()
	{
		$.get(_channel_href, { ajax: "true" }, function(data)
		{
			if (data)
			{
				$("#korero-message tbody").prepend(data);
			}
			
			_remove_extra();
			
			_resize_overlay();
		});
	};
	
	var _remove_extra = function()
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
		if ("" == $("#korero-message form .text").val())
		{
			return false;
		}
		
		$.post($("#korero-message form").attr("action"), $("#korero-message form").serialize(), function(data) {
			$("#korero-message :input").not(":submit, input:hidden").val("");
			
			$("#korero-message tbody").prepend(data);
			
			_remove_extra();
			
			_resize_overlay();
		});
		
		return false;
	});
	
	$(window).blur(function(event)
	{
		if (_korero_open)
		{
			_close(event);
		}
	});
});
