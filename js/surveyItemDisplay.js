var editPrompt = '<hr>' + 
            '<div class="accordion-inner editPromptDetails">' +
                '<div class="control-group">' +
                    '<label class="control-label inline-label" for="promptId">Prompt ID: <span class="red">*</span></label>' +
                    //'<div class="controls">' +
                        '<input type="text" class="span4 promptId" name="id" placeholder="A unique identifier for the prompt." />' +
                        ' <i class="help-icon icon-question-sign" data-original-title="A unique identifier for the prompt." rel="tooltip" data-placement="right"></i>' +
                    //'</div>'+
                '</div>' +

                '<div class="control-group">' +
                    '<label class="control-label inline-label" for="displayLabel">Display Label: <span class="red">*</span></label>'+
                    //'<div class="controls">'+
                        '<input type="text" class="span4 displayLabel" name="displayLabel" placeholder="Display Label" />'+
                        '<i class="help-icon icon-question-sign" data-original-title="The user-friendly name of this prompt used in visualizations." rel="tooltip" data-placement="right"></i>'+
                    //</div>'+
                '</div>'+
                
                '<div class="control-group">'+
                    '<label class="control-label inline-label" for="promptText">Prompt Text: <span class="red">*</span></label>'+
                    //'<div class="controls">'+
                        '<textarea type="text" class="span4 promptText" name="promptText" placeholder="Prompt Text"></textarea>'+
                        '<i class="help-icon icon-question-sign" data-original-title="The text to display to the user when prompting them to respond." rel="tooltip" data-placement="right"></i>'+
                    //'</div>'+
                '</div>'+
                
                '<div class="control-group">'+
                    '<label class="control-label inline-label" for="promptType">Prompt Type: <span class="red">*</span></label>'+
                    
                    //'<div class="controls">'+
                        '<select class="choosePromptType span4">'+
                            '<option value="">Please choose a prompt type</option>'+
                            '<option value="multi_choice">Multiple Choice</option>'+
                            '<option value="multi_choice_custom">Multiple Choice Custom</option>'+
                            '<option value="number">Number</option>'+
                            '<option value="photo">Photo</option>'+
                            '<option value="remote_activity">Remote Activity</option>'+
                            '<option value="single_choice">Single Choice</option>'+
                            '<option value="single_choice_custom">Single Choice Custom</option>'+
                            '<option value="text">Text</option>'+
                            '<option value="timestamp">Timestamp</option>'+
                            '<option value="video">Video</option>'+
                        '</select>'+
                        '<input type="hidden" class="promptType" name="promptType" id="promptType"/> '+
                        '<i class="help-icon icon-question-sign" data-original-title="Choose type of your prompt" rel="tooltip" data-placement="right"></i>'+
                    //'</div>'+
        
                    '</br>'+
                    '<label class="control-label inline-label" for="addedPrompt">Prompt Details:</label>'+
                    //'<div class="controls">'+
                        //'<div>'+
                            '<textarea name="properties" class="span4 addedPrompt" readonly></textarea>'+
                            '<button type="button" class="btn btn-link promptTypeBtn">Edit Prompt Detail</button>'+
                        //'</div>'+
                    //'</div>'+
                    '<div class="control-group">'+
                        //<!--<label type="hiden" class="control-label" for="default">Default</label>-->
                        //'<div class="controls">'+
                            '<input type="hidden" name="default" class="default" placeholder="Default" />'+
                            //<!--<i class="help-icon icon-question-sign" data-original-title="The default value for this prompt. This is type-dependent." rel="tooltip" data-placement="right"></i>-->
                        //'</div>'+
                    '</div>'+
                    '<div class="control-group">'+
                        '<label class="control-label inline-label" for="condition">Condition:</label>'+
                        //'<div class="controls">'+
                            //'<div class="input-append">'+
                                '<textarea name="promptCondition"  class="span4 promptCondition" placeholder="None." disabled></textarea>'+
                                '<button type="button" class="btn btn-link promptConditionBtn" >Edit Condition <i class="help-icon icon-question-sign" data-original-title="The condition which determines if the prompt is displayed or not." rel="tooltip" data-placement="top"></i></button>'+
                            //'</div>'+
                        //'</div>'+
                    '</div>'+
                    '<div class="control-group">'+
                        '<label class="control-label inline-label" for="skippable">Skip Option:</label>'+
                        //'<div class="controls"> '+
                            //'<label class="checkbox">'+
                                '<input type="checkbox" name="skippable" class="skippable" >'+
                                'Can this survey be skippable?'+
                            //'</label>'+
                        //'</div>'+
                    '</div> '+
                    
                    '<div class="control-group">'+
                        '<label class="control-label inline-label" for="skipLabel">Skip Label:</label>'+
                        //'<div class="controls">'+
                            '<input type="text" class="span4 skipLabel" name="skipLabel" placeholder="Skip" disabled/>'+
                            '<i class="help-icon icon-question-sign" data-original-title="If skippable, this is the text of the button to use to skip the label." rel="tooltip" data-placement="right"></i>'+
                        //'</div> '+
                    '</div>   '+
                '</div>'+
                '<div class="control-group">' +
                    '<div class="controls">' +
                        '<button type="button" class="btn save">Save</button>' +
                        '<button type="button" class="btn cancel">Cancel</button>' +
                    '</div>' +
                '</div>' +
            '</div>';

function addMessageToPrevItems(index) {
    var message = campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][index]['message'];
    var condition;
    if (!message['condition']) condition = "None";
    else condition = message['condition'];
    var target = message['id'] + 'Details';
    var newItem = '<li class="previousItem hide help-hover" data-original-title="Message (Click for more details)" rel="tooltip" data-placement="top" data-toggle="collapse" data-target="#' + target + '">' +
        '<button type="button" class="btn btn-link pull-right deleteItem"><i class="icon-trash icon-black"></i><small> Delete</small></button>' +
        //'<button type="button" class="btn btn-link pull-right editItem"><i class="icon-pencil icon-black"></i> Edit</button>' +
        '<button type="button" class="btn btn-link pull-right editItem" data-toggle="collapse" data-target="#edit' + target + '"><i class="icon-file icon-black"></i><small> Edit</small></button>' +
        '<i class="icon-comment"> </i> <strong>' + message['id'] + '</strong><br>' + 
         
        // prompt edit
        '<div id="edit' + target + '" class="collapse group2">'+
            '<hr>' + 
            '<div class="accordion-inner editPromptDetails">'+
                '<div class="control-group">' +
                    '<label class="control-label inline-label" for="messageId">Message ID: <span class="red">*</span></label>' +
                    //'<div class="controls">' +
                        '<textarea name="id" id="messageId" placeholder="A unique identifier for this message."></textarea>' +
                        '<i class="help-icon icon-question-sign" data-original-title="A unique identifier for this message." rel="tooltip" data-placement="right"></i>' +
                    //'</div>'+
                '</div>'+
                '<div class="control-group">'+
                    '<label class="control-label inline-label" for="messageText">Message: <span class="red">*</span></label>'+
                    //'<div class="controls">'+
                        '<textarea name="messageText" id="messageText" placeholder="The message to display to the user."></textarea>'+
                        '<i class="help-icon icon-question-sign" data-original-title="The text to be displayed to the user." rel="tooltip" data-placement="right"></i>'+
                    //'</div>'+
                '</div>'+
                '<div class="control-group">'+
                    '<label class="control-label inline-label" for="condition">Condition: </label>'+
                    //'<div class="controls">'+
                        //'<div class="input-append">'+
                            '<textarea name="messageCondition" id="messageCondition" placeholder="None." disabled></textarea>'+
                            '<button type="button" class="btn btn-link messageConditionBtn" >Edit Condition <i class="help-icon icon-question-sign" data-original-title="The condition which determines if the message is displayed or not." rel="tooltip" data-placement="top"></i></button>'+
                        //'</div>'+
                    //'</div>'+
                '</div>'+
                '<div class="control-group">' +
                    '<div class="controls">' +
                        '<button type="button" class="btn save">Save</button>' +
                        '<button type="button" class="btn cancel">Cancel</button>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>'+

        // prompt details 
        '<div id="' + target + '" class="collapse out">'+
            '<div class="accordion-inner">'+
                 '<p><strong>Message: </strong>' + message['messageText'] + '</p>' +  
                 '<p><strong>Condition: </strong>' + condition + '</p>' +  
            '</div>'+
        '</div>'+
        + '</li>';
    $('#previousItemsSortable').children().eq(index).remove();
    if (index != 0) {   
        $(newItem).insertAfter($('#previousItemsSortable').children().eq(index - 1)).slideToggle().removeClass('hide');
    } else {
        $(newItem).prependTo('#previousItemsSortable').slideToggle().removeClass('hide');
    }
    return true;
};

function addMultipleChoiceToPrevItem(index) {
    var prompt = campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][index]['prompt'];
    var propertiesText = "";
    if (prompt['properties']) {
        var data = eval(prompt['properties']['property']);
        
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                propertiesText += '<p>' + data[key]['key'] + ': ' + data[key]['label'] + '</p>';
            }
        }
    }

    if (!prompt['condition']) condition = "None";
    else condition = prompt['condition'];
    if (!prompt['skippable']) skipLabel = "None";
    else skipLabel = prompt['skipLabel'];
    if (!prompt['default']) defaultValue = "None";
    else defaultValue = prompt['default'];
    var target = prompt['id'] + 'Details';
    var newItem = '<li class="previousItem hide help-hover" data-original-title="Multiple Choice (Click for more details)" rel="tooltip" data-placement="top" data-toggle="collapse" data-target="#' + target + '">' +
        '<button type="button" class="btn btn-link pull-right deleteItem"><i class="icon-trash icon-black"></i><small> Delete</small></button>' +
        //'<button type="button" class="btn btn-link pull-right editItem"><i class="icon-pencil icon-black"></i> Edit</button>' +
        '<button type="button" class="btn btn-link pull-right editItem" data-toggle="collapse" data-target="#edit' + target + '"><i class="icon-file icon-black"></i><small> Edit</small></button>' +
        '<i class="icon-stop"> </i> <strong>' + prompt['id'] + '</strong><br>'+

        // prompt edit
        '<div id="edit' + target + '" class="collapse group2">'+
        editPrompt +
        '</div>'+

        '<div id="' + target + '" class="collapse out">'+
            '<div class="accordion-inner">'+
                '<p><strong>Prompt Text: </strong>' + prompt['promptText'] + '</p>' + 
                '<p><strong>Display Label: </strong>' + prompt['displayLabel'] + '</p>' + 
                '<p><strong>Prompt options: </strong></p>' +
                '<span class="detailList">' + propertiesText + '</span>' +
                '<p><strong>Default: </strong>' + defaultValue + '</p>' + 
                '<p><strong>Condition: </strong>' + condition + '</p>' + 
                '<p><strong>Skippable: </strong>' + prompt['skippable'] + '</p>' +
                '<p><strong>Skip Label: </strong>' + skipLabel + '</p>' +
            '</div>'+
        '</div>'+
        
        '</li>';
    $('#previousItemsSortable').children().eq(index).remove();
    if (index != 0) {
        $(newItem).insertAfter($('#previousItemsSortable').children().eq(index - 1)).slideToggle().removeClass('hide');
    } else {
        $(newItem).prependTo('#previousItemsSortable').slideToggle().removeClass('hide');
    }
    return true;
};

function addNumberToPrevItem(index) {
    var prompt = campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][index]['prompt'];
    
    var propertiesText = "";
    var data = eval(prompt['properties']['property']);
    
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            propertiesText += '<p>' + data[key]['key'] + ': ' + data[key]['label'] + '</p>';
        }
    }

    if (!prompt['condition']) condition = "None";
    else condition = prompt['condition'];
    if (!prompt['skippable']) skipLabel = "None";
    else skipLabel = prompt['skipLabel'];
    if (!prompt['default']) defaultValue = "None";
    else defaultValue = prompt['default'];
    var target = prompt['id'] + 'Details';
    var newItem = '<li class="previousItem hide help-hover" data-original-title="Number (Click for more details)" rel="tooltip" data-placement="top" data-toggle="collapse" data-target="#' + target + '">' +
        '<button type="button" class="btn btn-link pull-right deleteItem"><i class="icon-trash icon-black"></i><small> Delete</small></button>' +
        //'<button type="button" class="btn btn-link pull-right editItem"><i class="icon-pencil icon-black"></i> Edit</button>' +
        '<button type="button" class="btn btn-link pull-right editItem" data-toggle="collapse" data-target="#edit' + target + '"><i class="icon-file icon-black"></i><small> Edit<small></button>' +
        '<i class="icon-stop"> </i> <strong>' + prompt['id'] + '</strong><br>'+
        
        // prompt edit
        '<div id="edit' + target + '" class="collapse group2">'+
        editPrompt +
        '</div>'+

        '<div id="' + target + '" class="collapse out">'+
            '<div class="accordion-inner">'+
                '<p><strong>Prompt Text: </strong>' + prompt['promptText'] + '</p>' + 
                '<p><strong>Display Label: </strong>' + prompt['displayLabel'] + '</p>' + 
                '<p><strong>Prompt options: </strong></p>' +
                '<span class="detailList">' + propertiesText + '</span>' +
                '<p><strong>Default: </strong>' + defaultValue + '</p>' + 
                '<p><strong>Condition: </strong>' + condition + '</p>' + 
                '<p><strong>Skippable: </strong>' + prompt['skippable'] + '</p>' +
                '<p><strong>Skip Label: </strong>' + skipLabel + '</p>' +
            '</div>'+
        '</div>'+
        '</li>';
    $('#previousItemsSortable').children().eq(index).remove();    
    if (index != 0) {
        $(newItem).insertAfter($('#previousItemsSortable').children().eq(index - 1)).slideToggle().removeClass('hide');
    } else {
        $(newItem).prependTo('#previousItemsSortable').slideToggle().removeClass('hide');
    }
    return true;
};

function addPhotoToPrevItem(index) {
    var prompt = campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][index]['prompt'];
    var propertiesText = "";
    var data = eval(prompt['properties']['property']);
    
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            propertiesText += '<p>' + data[key]['key'] + ': ' + data[key]['label'] + '</p>';
        }
    }

    if (!prompt['condition']) condition = "None";
    else condition = prompt['condition'];
    if (!prompt['skippable']) skipLabel = "None";
    else skipLabel = prompt['skipLabel'];
    if (!prompt['default']) defaultValue = "None";
    else defaultValue = prompt['default'];
    var target = prompt['id'] + 'Details';
    var newItem = '<li class="previousItem hide help-hover" data-original-title="Photo (Click for more details)" rel="tooltip" data-placement="top" data-toggle="collapse" data-target="#' + target + '">' +
        '<button type="button" class="btn btn-link pull-right deleteItem"><i class="icon-trash icon-black"></i><small> Delete</small></button>' +
        //'<button type="button" class="btn btn-link pull-right editItem"><i class="icon-pencil icon-black"></i> Edit</button>' +
        '<button type="button" class="btn btn-link pull-right editItem" data-toggle="collapse" data-target="#edit' + target + '"><i class="icon-file icon-black"></i><small> Edit</small></button>' +
        '<i class="icon-camera" ></i> <strong>' + prompt['id'] + '</strong><br>' +
        
        // prompt edit
        '<div id="edit' + target + '" class="collapse group2">'+
        editPrompt +
        '</div>'+

        '<div id="' + target + '" class="collapse out">'+
            '<div class="accordion-inner">'+
                '<p><strong>Prompt Text: </strong>' + prompt['promptText'] + '</p>' + 
                '<p><strong>Display Label: </strong>' + prompt['displayLabel'] + '</p>' + 
                '<p><strong>Prompt options: </strong></p>' +
                '<span class="detailList">' + propertiesText + '</span>' +
                '<p><strong>Default: </strong>' + defaultValue + '</p>' + 
                '<p><strong>Condition: </strong>' + condition + '</p>' + 
                '<p><strong>Skippable: </strong>' + prompt['skippable'] + '</p>' +
                '<p><strong>Skip Label: </strong>' + skipLabel + '</p>' +
            '</div>'+
        '</div>'+
        '</li>';
    $('#previousItemsSortable').children().eq(index).remove();
    if (index != 0) {
        $(newItem).insertAfter($('#previousItemsSortable').children().eq(index - 1)).slideToggle().removeClass('hide');
    } else {
        $(newItem).prependTo('#previousItemsSortable').slideToggle().removeClass('hide');
    }
    return true;
};

function addRemoteToPrevItem(index) {
    var prompt = campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][index]['prompt'];
    var propertiesText = "";
    var data = eval(prompt['properties']['property']);
    
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            propertiesText += '<p>' + data[key]['key'] + ': ' + data[key]['label'] + '</p>';
        }
    }

    if (!prompt['condition']) condition = "None";
    else condition = prompt['condition'];
    if (!prompt['skippable']) skipLabel = "None";
    else skipLabel = prompt['skipLabel'];
    if (!prompt['default']) defaultValue = "None";
    else defaultValue = prompt['default'];
    var target = prompt['id'] + 'Details';
    var newItem = '<li class="previousItem hide help-hover" data-original-title="Remote Activity (Click for more details)" rel="tooltip" data-placement="top" data-toggle="collapse" data-target="#' + target + '">' +
        '<button type="button" class="btn btn-link pull-right deleteItem"><i class="icon-trash icon-black"></i><small> Delete</small></button>' +
        //'<button type="button" class="btn btn-link pull-right editItem"><i class="icon-pencil icon-black"></i> Edit</button>' +
        '<button type="button" class="btn btn-link pull-right editItem" data-toggle="collapse" data-target="#edit' + target + '"><i class="icon-file icon-black"></i><small> Edit</small></button>' +
        '<i class="icon-user" ></i> <strong>' + prompt['id'] + '</strong><br>' +
        
        // prompt edit
        '<div id="edit' + target + '" class="collapse group2">'+
        editPrompt +
        '</div>'+

        '<div id="' + target + '" class="collapse surveyDetails out">'+
            '<div class="accordion-inner">'+ 
                '<p><strong>Prompt Text: </strong>' + prompt['promptText'] + '</p>' + 
                '<p><strong>Display Label: </strong>' + prompt['displayLabel'] + '</p>' + 
                '<p><strong>Prompt options: </strong></p>' +
                '<span class="detailList">' + propertiesText + '</span>' +
                '<p><strong>Default: </strong>' + defaultValue + '</p>' + 
                '<p><strong>Condition: </strong>' + condition + '</p>' + 
                '<p><strong>Skippable: </strong>' + prompt['skippable'] + '</p>' +
                '<p><strong>Skip Label: </strong>' + skipLabel + '</p>' +
            '</div>'+
        '</div>'+
        '</li>';
    $('#previousItemsSortable').children().eq(index).remove();
    if (index != 0) {
        $(newItem).insertAfter($('#previousItemsSortable').children().eq(index - 1)).slideToggle().removeClass('hide');
    } else {
        $(newItem).prependTo('#previousItemsSortable').slideToggle().removeClass('hide');
    }
    return true;
};

function addSingleChoiceToPrevItem(index) {
    var prompt = campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][index]['prompt'];
    var propertiesText = "";

    if (prompt['properties']) {
        var data = eval(prompt['properties']['property']);
        
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                propertiesText += '<p>' + data[key]['key'] + ': ' + data[key]['label'] + '</p>';
            }
        }
    }

    if (!prompt['condition']) condition = "None";
    else condition = prompt['condition'];
    if (!prompt['skippable']) skipLabel = "None";
    else skipLabel = prompt['skipLabel'];
    if (!prompt['default']) defaultValue = "None";
    else defaultValue = prompt['default'];
    var target = prompt['id'] + 'Details';
    var newItem = '<li class="previousItem hide help-hover" data-original-title="Single Choice (Click for more details)" rel="tooltip" data-placement="top" data-toggle="collapse" data-target="#' + target + '">' +
        '<button type="button" class="btn btn-link pull-right deleteItem"><i class="icon-trash icon-black"></i><small> Delete</small></button>' +
        //'<button type="button" class="btn btn-link pull-right editItem"><i class="icon-pencil icon-black"></i> Edit</button>' +
        '<button type="button" class="btn btn-link pull-right editItem" data-toggle="collapse" data-target="#edit' + target + '"><i class="icon-file icon-black"></i><small> Edit</small></button>' +
        '<i class="icon-ok-circle" ></i> <strong>' + prompt['id'] + '</strong><br>' +
        
        // prompt edit
        '<div id="edit' + target + '" class="collapse group2">'+
        editPrompt +
        '</div>'+

        '<div id="' + target + '" class="collapse out">'+
            '<div class="accordion-inner">'+
                '<p><strong>Prompt Text: </strong>' + prompt['promptText'] + '</p>' + 
                '<p><strong>Display Label: </strong>' + prompt['displayLabel'] + '</p>' + 
                '<p><strong>Prompt options: </strong></p>' +
                '<span class="detailList">' + propertiesText + '</span>' +
                '<p><strong>Default: </strong>' + defaultValue + '</p>' + 
                '<p><strong>Condition: </strong>' + condition + '</p>' + 
                '<p><strong>Skippable: </strong>' + prompt['skippable'] + '</p>' +
                '<p><strong>Skip Label: </strong>' + skipLabel + '</p>' +
            '</div>'+
        '</div>'+
        '</li>';
    $('#previousItemsSortable').children().eq(index).remove();
    if (index != 0) {
        $(newItem).insertAfter($('#previousItemsSortable').children().eq(index - 1)).slideToggle().removeClass('hide');
    } else {
        $(newItem).prependTo('#previousItemsSortable').slideToggle().removeClass('hide');
    }
    return true;
};

function addTextToPrevItem(index) {
    var prompt = campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][index]['prompt'];
    var propertiesText = "";
    var data = eval(prompt['properties']['property']);
    
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            propertiesText += '<p>' + data[key]['key'] + ': ' + data[key]['label'] + '</p>';
        }
    }

    if (!prompt['condition']) condition = "None";
    else condition = prompt['condition'];
    if (!prompt['skippable']) skipLabel = "None";
    else skipLabel = prompt['skipLabel'];
    if (!prompt['default']) defaultValue = "None";
    else defaultValue = prompt['default'];
    var target = prompt['id'] + 'Details';

    var newItem = '<li class="previousItem hide help-hover" data-original-title="Text (Click for more details)" rel="tooltip" data-placement="top" data-toggle="collapse" data-target="#' + target + '">' +
        '<button type="button" class="btn btn-link pull-right deleteItem"><i class="icon-trash icon-black"></i><small> Delete</small></button>' +
        //'<button type="button" class="btn btn-link pull-right editItem"><i class="icon-pencil icon-black"></i> Edit</button>' +
        '<button type="button" class="btn btn-link pull-right editItem" data-toggle="collapse" data-target="#edit' + target + '"><i class="icon-file icon-black"></i><small> Edit</small></button>' +
        '<i class="icon-font" ></i> <strong>' + prompt['id'] + '</strong><br>' +
        
        // prompt edit
        '<div id="edit' + target + '" class="collapse group2">'+
        editPrompt +
        '</div>'+

        '<div id="' + target + '" class="collapse out">'+
            '<div class="accordion-inner">'+
                '<p><strong>Prompt Text: </strong>' + prompt['promptText'] + '</p>' + 
                '<p><strong>Display Label: </strong>' + prompt['displayLabel'] + '</p>' + 
                '<p><strong>Prompt options: </strong></p>' +
                '<span class="detailList">' + propertiesText + '</span>' +
                '<p><strong>Default: </strong>' + defaultValue + '</p>' + 
                '<p><strong>Condition: </strong>' + condition + '</p>' + 
                '<p><strong>Skippable: </strong>' + prompt['skippable'] + '</p>' +
                '<p><strong>Skip Label: </strong>' + skipLabel + '</p>' +
            '</div>'+
        '</div>'+
        '</li>';
    $('#previousItemsSortable').children().eq(index).remove();
    if (index != 0) {
        $(newItem).insertAfter($('#previousItemsSortable').children().eq(index - 1)).slideToggle().removeClass('hide');
    } else {
        $(newItem).prependTo('#previousItemsSortable').slideToggle().removeClass('hide');
    }
    return true;
};

function addTimestampToPrevItem(index) {
    var prompt = campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][index]['prompt'];
    if (!prompt['condition']) condition = "None";
    else condition = prompt['condition'];
    if (!prompt['skippable']) skipLabel = "None";
    else skipLabel = prompt['skipLabel'];
    var target = prompt['id'] + 'Details';
    var newItem = '<li class="previousItem hide help-hover" data-original-title="Timestamp (Click for more details)" rel="tooltip" data-placement="top" data-toggle="collapse" data-target="#' + target + '">' +
        '<button type="button" class="btn btn-link pull-right deleteItem"><i class="icon-trash icon-black"></i><small> Delete</small></button>' +
        //'<button type="button" class="btn btn-link pull-right editItem"><i class="icon-pencil icon-black"></i> Edit</button>' +
        '<button type="button" class="btn btn-link pull-right editItem" data-toggle="collapse" data-target="#edit' + target + '"><i class="icon-file icon-black"></i><small> Edit</small></button>' +
        '<i class="icon-time" ></i> <strong>' + prompt['id'] + '</strong><br>' +
        
        // prompt edit
        '<div id="edit' + target + '" class="collapse group2">'+
        editPrompt +
        '</div>'+

        '<div id="' + target + '" class="collapse out">'+
            '<div class="accordion-inner">'+
                '<p><strong>Prompt Text: </strong>' + prompt['promptText'] + '</p>' + 
                '<p><strong>Display Label: </strong>' + prompt['displayLabel'] + '</p>' + 
                '<p><strong>Condition: </strong>' + condition + '</p>' + 
                '<p><strong>Skippable: </strong>' + prompt['skippable'] + '</p>' +
                '<p><strong>Skip Label: </strong>' + skipLabel + '</p>' +
            '</div>'+
        '</div>'+

        '</li>';
    $('#previousItemsSortable').children().eq(index).remove();
    if (index != 0) {
        $(newItem).insertAfter($('#previousItemsSortable').children().eq(index - 1)).slideToggle().removeClass('hide');
    } else {
        $(newItem).prependTo('#previousItemsSortable').slideToggle().removeClass('hide');
    }
    return true;
};

function addVideoToPrevItem(index) {
    var prompt = campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][index]['prompt'];
    var propertiesText = "";
    var data = eval(prompt['properties']['property']);
    
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            propertiesText += '<p>' + data[key]['key'] + ': ' + data[key]['label'] + '</p>';
        }
    }

    if (!prompt['condition']) condition = "None";
    else condition = prompt['condition'];
    if (!prompt['skippable']) skipLabel = "None";
    else skipLabel = prompt['skipLabel'];
    if (!prompt['default']) defaultValue = "None";
    else defaultValue = prompt['default'];
    var target = prompt['id'] + 'Details';
    var newItem = '<li class="previousItem hide help-hover" data-original-title="Video (Click for more details)" rel="tooltip" data-placement="top" data-toggle="collapse" data-target="#' + target + '">' +
        '<button type="button" class="btn btn-link pull-right deleteItem"><i class="icon-trash icon-black"></i><small> Delete</small></button>' +
        //'<button type="button" class="btn btn-link pull-right editItem"><i class="icon-pencil icon-black"></i> Edit</button>' +
        '<button type="button" class="btn btn-link pull-right editItem" data-toggle="collapse" data-target="#edit' + target + '"><i class="icon-file icon-black"></i><small> Edit</small></button>' +
        '<i class="icon-facetime-video" ></i> <strong>' + prompt['id'] + '</strong><br>' +
        
        // prompt edit
        '<div id="edit' + target + '" class="collapse group2">'+
        editPrompt +
        '</div>'+

        '<div id="' + target + '" class="collapse out">'+
            '<div class="accordion-inner">'+
                '<p><strong>Prompt Text: </strong>' + prompt['promptText'] + '</p>' + 
                '<p><strong>Display Label: </strong>' + prompt['displayLabel'] + '</p>' + 
                '<p><strong>Prompt options: </strong></p>' +
                '<span class="detailList">' + propertiesText + '</span>' +
                '<p><strong>Default: </strong>' + defaultValue + '</p>' + 
                '<p><strong>Condition: </strong>' + condition + '</p>' + 
                '<p><strong>Skippable: </strong>' + prompt['skippable'] + '</p>' +
                '<p><strong>Skip Label: </strong>' + skipLabel + '</p>' +
            '</div>'+
        '</div>'+
        '</li>';
    $('#previousItemsSortable').children().eq(index).remove();
    if (index != 0) {
        $(newItem).insertAfter($('#previousItemsSortable').children().eq(index - 1)).slideToggle().removeClass('hide');
    } else {
        $(newItem).prependTo('#previousItemsSortable').slideToggle().removeClass('hide');
    }
    return true;
};