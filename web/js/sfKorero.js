$(document).ready(function()
{
	$("#korero-nojs").remove();
	
	var update = function()
	{
		$.get($(location).attr("pathname"), function(data, success)
		{
			if (data)
			{
				$("#korero-message tbody").prepend(data);
			}
			
			if (20 < $("#korero-message tbody tr").length)
			{
				$("#korero-message tbody tr:last").remove();
			}
		});
	}
	
	$("#korero-message form").submit(function()
	{
		$("#korero-message .error").replaceWith($("#korero-message form"));
		
		if ("" == $("#korero-message form .text").val())
		{
			$("#korero-message form").wrap("<div class=error>");
			$("#korero-message form").after("<div>You must enter a message!</div>");
			
			return false;
		}
		
		$.post($("#korero-message form").attr("action"), $("#korero-message form").serialize(), function(data) {
			$("#korero-message :input").not(":submit, input:hidden").val("");
			
			$("#korero-message tbody").prepend(data);
		});
		
		return false;
	});
	
	setInterval(function()
	{
		update();
	}, 5000);
});
