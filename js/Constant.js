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