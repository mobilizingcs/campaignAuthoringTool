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

var AudioPrompt = {
	default_value: 180,
	min_value: 1,
	max_value: 6000
}

var RemoteActivityPrompt = {
	min_retries: 1,
	min_minRun: 1
}

var RESERVED_KEYWORDS = ["NOT_DISPLAYED","SKIPPED"];

var operator2 = [ '<option value="==">==</option>',
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
/*
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
*/
var simpleConditionTooltip = "<div class='left'>" +
							 	"<table align='center'>" +
							 		"<tr><th>Prompt Type</th><th>Available Operator</th><th>Available Value</th><th>Note</th></tr>" +
							 		"<tr>" +
							 			"<td>Message</td>" +
							 			"<td>==, !=</td>" +
							 			"<td>Not Displayed</td>" +
							 		"</tr>" +
							 		"<tr>" +
							 			"<td>Audio</td>" +
							 			"<td>==, !=</td>" +
							 			"<td>Not Displayed, Skipped</td>" +
							 		"</tr>" +
							 		"<tr>" +
							 			"<td>Multiple Choice</td>" +
							 			"<td>==, >, >=, <, <=, !=</td>" +
							 			"<td>Not Displayed, Skipped, Specify Value</td>" +
							 			"<td>User input must be number (one of the option keys)</td>" +
							 		"</tr>" +
							 		"<tr>" +
							 			"<td>Multiple Choice Custom</td>" +
							 			"<td>==, >, >=, <, <=, !=</td>" +
							 			"<td>Not Displayed, Skipped, Specify Value</td>" +
							 			"<td>User input must be number (one of the option keys)</td>" +
							 		"</tr>" +
							 		"<tr>" +
							 			"<td>Number</td>" +
							 			"<td>==, >, >=, <, <=, !=</td>" +
							 			"<td>Not Displayed, Skipped, Specify Value</td>" +
							 			"<td>User input must be number</td>" +
							 		"</tr>" +
							 		"<tr>" +
							 			"<td>Photo</td>" +
							 			"<td>==, !=</td>" +
							 			"<td>Not Displayed, Skipped</td>" +
							 		"</tr>" +
							 		"<tr>" +
							 			"<td>Remote Activity</td>" +
							 			"<td>==, !=</td>" +
							 			"<td>Not Displayed, Skipped</td>" +
							 		"</tr>" +
							 		"<tr>" +
							 			"<td>Single Choice</td>" +
							 			"<td>==, >, >=, <, <=, !=</td>" +
							 			"<td>Not Displayed, Skipped, Specify Value</td>" +
							 			"<td>User input must be number (one of the option keys)</td>" +
							 		"</tr>" +
							 		"<tr>" +
							 			"<td>Single Choice Custom</td>" +
							 			"<td>==, >, >=, <, <=, !=</td>" +
							 			"<td>Not Displayed, Skipped, Specify Value</td>" +
							 			"<td>User input must be number (one of the option keys)</td>" +
							 		"</tr>" +
							 		"<tr>" +
							 			"<td>Text</td>" +
							 			"<td>==, !=</td>" +
							 			"<td>Not Displayed, Skipped, Specify Value</td>" +
							 			"<td>User input can be any string</td>" +
							 		"</tr>" +
							 		"<tr>" +
							 			"<td>Timestamp</td>" +
							 			"<td>==, !=</td>" +
							 			"<td>Not Displayed, Skipped</td>" +
							 		"</tr>" +
							 		"<tr>" +
							 			"<td>Video</td>" +
							 			"<td>==, !=</td>" +
							 			"<td>Not Displayed, Skipped</td>" +
							 		"</tr>" +
							 	"</table>" +
							 "</div>"
var isEditing = false;
var editObj;
//

// Global functions
// this function create an unique ID
function uniqueid(){
    // always start with a letter (for DOM friendlyness)
    var idstr=String.fromCharCode(Math.floor((Math.random()*25)+65));
    do {
        // between numbers and characters (48 is 0 and 90 is Z (42-48 = 90)
        var ascicode=Math.floor((Math.random()*42)+48);
        if (ascicode<58 || ascicode>64){
            // exclude all chars between : (58) and @ (64)
            idstr+=String.fromCharCode(ascicode);
        }
    } while (idstr.length<32);

    return (idstr);
}

$(function() {

	// number prompt
	$('#minNumber').val(NumberPrompt['default_min']);
	$('#maxNumber').val(NumberPrompt['default_max']);
	$('#wholeNumber').val(NumberPrompt['default_wholeNumber'])

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