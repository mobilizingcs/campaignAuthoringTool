// Constant values defined here
var NumberPrompt = {
	default_min: 0,
	default_max: 10
}

var TextPrompt = {
	default_min: 0,
	default_max: 10,
}

var PhotoPrompt = {
	default_value: 800
}

var VideoPrompt = {
	default_value: 180,
	min_value: 1,
	max_value: 600
}

var RemoteActivityPrompt = {
	min_retries: 1,
	min_minRun: 1
}

var RESERVED_KEYWORDS = ["NOT_DISPLAYED","SKIPPED"];

var operator = [ '<option value="==">==</option>',
                '<option value="&gt;">&gt;</option>',
                '<option value="&gt;=">&gt;=</option>',
                '<option value="&lt;">&lt;</option>',
                '<option value="&lt;=">&lt;=</option>',
                '<option value="!=">!=</option>'
				];

var conditionValueChoice = ['<option value="NOT_DISPLAYED">Not Display</option>',
                            '<option value="SKIPPED">Skipped</option>',
                            '<option value="USER_INPUT">Specify value</option>'
							];

var simpleConditionTooltip = "<div class='left'><p><span style=text-decoration:underline;>Message: </span>-Available operator:==, !=; -Available values: Not Displayed</p>" +
							"<p><span style=text-decoration:underline;>Multiple Choice, Multiple Choice Custom:</span> -Available operator:==, >, >=, <, <=, !=; -Available values: Not Displayed, Skipped, Specify Value; -Note: User input must be number (one of the option keys)</p>" +
							"<p><span style=text-decoration:underline;>Number:</span> -Available operator:==, >, >=, <, <=, !=; -Available values: Not Displayed, Skipped, Specify Value; -Note: User input must be a number</p>" +
							"<p><span style=text-decoration:underline;>Photo:</span> -Available operator:==, !=; -Available values: Not Displayed, Skipped</p>" +
							"<p><span style=text-decoration:underline;>Remote Activity:</span> -Available operator:==, !=; -Available values: Not Displayed, Skipped</p>" +
							"<p><span style=text-decoration:underline;>Single Choice, Single Choice Custom:</span> -Available operator:==, >, >=, <, <=, !=; -Available values: Not Displayed, Skipped, Specify Value; -Note: User input must be number (one of the option keys)</p>" +
							"<p><span style=text-decoration:underline;>Text:</span> -Available operator:==, !=; -Available values: Not Displayed, Skipped, Specify Value; -Note: User input can be any string</p>" +
							"<p><span style=text-decoration:underline;>Timestamp:</span> -Available operator:==, !=; -Available values: Not Displayed, Skipped</p>" +
							"<p><span style=text-decoration:underline;>Video:</span> -Available operator:==, !=; -Available values: Not Displayed, Skipped</p>" +
							"</div>"

var isEditing = false;
var editObj;
// 
$(function() {

	// number prompt
	$('#minNumber').val(NumberPrompt['default_min']);
	$('#maxNumber').val(NumberPrompt['default_max']);

	// text prompt
	$('#minTextLength').val(TextPrompt['default_min']);
	$('#maxTextLength').val(TextPrompt['default_max']);

	// photo
	$('#maxRes').val(PhotoPrompt['default_value']);

	// video
	$('#maxVideoLength').val(VideoPrompt['default_value']);
});


/*
	Observer pattern
	$('#label_id').delegate('change', updateSelection);
	addQuestion() {
		...
		updateSelection();
	}
*/