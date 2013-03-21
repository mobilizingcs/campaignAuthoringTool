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
	max_value: 600
}
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