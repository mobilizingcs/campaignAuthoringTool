

var editPrompt = '<hr>' + 
            '<div class="accordion-inner editPromptDetails">' +
                '<div class="control-group">' +
                    '<label class="control-label inline-label" for="promptId">Prompt ID: <span class="red">*</span></label>' +
                    //'<div class="controls">' +
                        '<input type="text" class="span4 promptId" name="id" placeholder="A unique name so you can refer back to this prompt." />' +
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
                        '<textarea type="text" class="span4 promptText" name="promptText" placeholder="Question Text"></textarea>'+
                        '<i class="help-icon icon-question-sign" data-original-title="The text to display to the user when prompting them to respond." rel="tooltip" data-placement="right"></i>'+
                    //'</div>'+
                '</div>'+
                
                '<div class="control-group">'+
                    '<label class="control-label inline-label" for="promptType">Prompt Type: <span class="red">*</span></label>'+
                    
                    //'<div class="controls">'+
                        '<select class="choosePromptType span4">'+
                            '<option value="">Please choose a prompt type</option>'+
                            '<option value="audio">Audio</option>'+
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
                            '<input type="hidden" class="jsonText" />' + 
                            //<!--<i class="help-icon icon-question-sign" data-original-title="The default value for this prompt. This is type-dependent." rel="tooltip" data-placement="right"></i>-->
                        //'</div>'+
                    '</div>'+
                    '<div class="control-group">'+
                        '<label class="control-label inline-label" for="condition">Condition:</label>'+
                        //'<div class="controls">'+
                            //'<div class="input-append">'+
                                '<input type="hidden" class="promptConditionType" id="promptConditionType" />' +
                                '<input type="hidden" class="promptConditionJson" id="promptConditionJson" />' +
                                '<input type="hidden" class="currPromptType" id="currPromptType" />' + 
                                '<textarea name="promptCondition"  class="span4 promptCondition" placeholder="None." disabled></textarea>'+
                                '<button type="button" class="btn btn-link conditionBtn promptConditionBtn" >Edit Condition <i class="help-icon icon-question-sign" data-original-title="The condition which determines if the prompt is displayed or not." rel="tooltip" data-placement="top"></i></button>'+
                            //'</div>'+
                        //'</div>'+
                    '</div>'+
                    '<div class="control-group">'+
                        '<label class="control-label inline-label skippable" for="skippable">Skip Option:</label>'+
                        //'<div class="controls"> '+
                            //'<label class="checkbox">'+
                                '<input type="checkbox" name="skippable" class="skippable" >'+
                                '  Is this prompt skippable?'+
                            //'</label>'+
                        //'</div>'+
                    '</div> '+
                    
                    '<div class="control-group">'+
                        '<label class="control-label inline-label skipLabelText" for="skipLabel">Skip Label:</label>'+
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
    var target = uniqueid();
    var newItem = '<li class="previousItem hide">' +
        '<button type="button" class="btn btn-link pull-right deleteItem"><i class="icon-trash icon-black"></i><small> Delete</small></button>' +
        //'<button type="button" class="btn btn-link pull-right editItem"><i class="icon-pencil icon-black"></i> Edit</button>' +
        '<button type="button" class="btn btn-link pull-right editItem" data-toggle="collapse" data-target="#edit' + target + '"><i class="icon-file icon-black"></i><small> Edit</small></button>' +
        '<i class="icon-comment help-hover"></i> <button type="button" class="btn btn-link help-hover" data-original-title="Message (Click for more details)" rel="tooltip" data-placement="top" data-toggle="collapse" href="#' + target + '"><u> <strong class="detailsID">' + message['id'] + '</strong></u></button><br>' + 
         
        // prompt details 
        '<div class="collapse-group1">' + 
            '<div id="' + target + '" class="collapse itemDetails out">'+
                '<div class="accordion-inner">'+
                    '<p class="viewDetailsMessageID">Message ID: ' + message['id'] + '</p>' +  
                    '<p class="viewDetailsMessageText">Message Text: ' + message['messageText'] + '</p>' +  
                    '<p class="viewDetailsMessageCond">Condition: ' + condition + '</p>' +  
                '</div>'+
            '</div>'+
        '</div>'+

        // prompt edit
        '<div class="collapse-group2">' + 
            '<div id="edit' + target + '" class="collapse itemEdit group2">'+
                '<hr>' + 
                '<div class="accordion-inner editPromptDetails">'+
                    '<div class="control-group">' +
                        '<label class="control-label inline-label" for="messageId">Message ID: <span class="red">*</span></label>' +
                        //'<div class="controls">' +
                            '<input type="text" name="id" class="span4 messageId" placeholder="A unique name so you can refer back to this message."/>' +
                            '<i class="help-icon icon-question-sign" data-original-title="A unique identifier for this message." rel="tooltip" data-placement="right"></i>' +
                        //'</div>'+
                    '</div>'+
                    '<div class="control-group">'+
                        '<label class="control-label inline-label" for="messageText">Message: <span class="red">*</span></label>'+
                        //'<div class="controls">'+
                            '<input type="text" name="messageText" class="span4 messageText" placeholder="The message to display to the user."/>'+
                            '<i class="help-icon icon-question-sign" data-original-title="The text to be displayed to the user." rel="tooltip" data-placement="right"></i>'+
                        //'</div>'+
                    '</div>'+
                    '<div class="control-group">'+
                        '<label class="control-label inline-label" for="condition">Condition: </label>'+
                        //'<div class="controls">'+
                            //'<div class="input-append">'+
                                '<input type="hidden" class="messageConditionType" id="messageConditionType" />' +
                                '<input type="hidden" class="messageConditionJson" id="messageConditionJson" />' +
                                '<textarea name="messageCondition" class="span4 messageCondition" placeholder="None." disabled></textarea>'+
                                '<button type="button" class="btn btn-link conditionBtn messageConditionBtn" >Edit Condition <i class="help-icon icon-question-sign" data-original-title="The condition which determines if the message is displayed or not." rel="tooltip" data-placement="top"></i></button>'+
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

function addAudioToPrevItem(index) {
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
    var target = uniqueid();
    var newItem = '<li class="previousItem hide" >' +
        '<button type="button" class="btn btn-link pull-right deleteItem"><i class="icon-trash icon-black"></i><small> Delete</small></button>' +
        //'<button type="button" class="btn btn-link pull-right editItem"><i class="icon-pencil icon-black"></i> Edit</button>' +
        '<button type="button" class="btn btn-link pull-right editItem" data-toggle="collapse" data-target="#edit' + target + '"><i class="icon-file icon-black"></i><small> Edit</small></button>' +
        '<i class="icon-ok-circle help-hover"> </i><button type="button" class="btn btn-link help-hover" data-original-title="Prompt (Click for more details)" rel="tooltip" data-placement="top" data-toggle="collapse" href="#' + target + '"><u> <strong class="detailsID">' + prompt['id'] + '</strong></u></button><br>'+
        
        '<div class="collapse-group1">' + 
            '<div id="' + target + '" class="collapse itemDetails out">'+
                '<div class="accordion-inner">'+
                    '<p class="viewDetailsPromptID">Prompt ID: ' + prompt['id'] + '</p>' +  
                    '<p class="viewDetailsPromptText">Prompt Text: ' + prompt['promptText'] + '</p>' + 
                    '<p class="viewDetailsPromptDisplayLabel">Display Label: ' + prompt['displayLabel'] + '</p>' +
                    '<p class="viewDetailsPromptType">Prompt Type: ' + prompt['promptType'] + '</p>' +  
                    '<p>Prompt options: </p>' +
                    '<span class="detailList">' + propertiesText + '</span>' +
                    '<p class="viewDetailsPromptCond">Condition: ' + condition + '</p>' + 
                    '<p class="viewDetailsPromptSkippable">Skippable: ' + prompt['skippable'] + '</p>' +
                    '<p class="viewDetailsPromptSkipLabel">Skip Label: ' + skipLabel + '</p>' +
                '</div>'+
            '</div>'+
        '</div>' +

        // prompt edit
        '<div class="collapse-group2">' + 
            '<div id="edit' + target + '" class="collapse itemEdit group2">'+
                editPrompt +
            '</div>'+
        '</div>' +

        '</li>';
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
    var target = uniqueid();
    var newItem = '<li class="previousItem hide">' +
        '<button type="button" class="btn btn-link pull-right deleteItem"><i class="icon-trash icon-black"></i><small> Delete</small></button>' +
        //'<button type="button" class="btn btn-link pull-right editItem"><i class="icon-pencil icon-black"></i> Edit</button>' +
        '<button type="button" class="btn btn-link pull-right editItem" data-toggle="collapse" data-target="#edit' + target + '"><i class="icon-file icon-black"></i><small> Edit</small></button>' +
        '<i class="icon-ok-circle help-hover"> </i><button type="button" class="btn btn-link help-hover" data-original-title="Prompt (Click for more details)" rel="tooltip" data-placement="top" data-toggle="collapse" href="#' + target + '"><u> <strong class="detailsID">' + prompt['id'] + '</strong></u></button><br>'+

        '<div class="collapse-group1">' + 
            '<div id="' + target + '" class="collapse itemDetails out">'+
                '<div class="accordion-inner">'+
                    '<p class="viewDetailsPromptID">Prompt ID: ' + prompt['id'] + '</p>' +  
                    '<p class="viewDetailsPromptText">Prompt Text: ' + prompt['promptText'] + '</p>' + 
                    '<p class="viewDetailsPromptDisplayLabel">Display Label: ' + prompt['displayLabel'] + '</p>' + 
                    '<p class="viewDetailsPromptType">Prompt Type: ' + prompt['promptType'] + '</p>' + 
                    '<p>Prompt options: </p>' +
                    '<span class="detailList">' + propertiesText + '</span>' +
                    '<p class="viewDetailsPromptDefault">Default: ' + defaultValue + '</p>' + 
                    '<p class="viewDetailsPromptCond">Condition: ' + condition + '</p>' + 
                    '<p class="viewDetailsPromptSkippable">Skippable: ' + prompt['skippable'] + '</p>' +
                    '<p class="viewDetailsPromptSkipLabel">Skip Label: ' + skipLabel + '</p>' +
                '</div>'+
            '</div>'+
        '</div>' +

        // prompt edit
        '<div class="collapse-group2">' + 
            '<div id="edit' + target + '" class="collapse itemEdit group2">'+
                editPrompt +
            '</div>'+
        '</div>' +

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
    var target = uniqueid();;
    var newItem = '<li class="previousItem hide">' +
        '<button type="button" class="btn btn-link pull-right deleteItem"><i class="icon-trash icon-black"></i><small> Delete</small></button>' +
        //'<button type="button" class="btn btn-link pull-right editItem"><i class="icon-pencil icon-black"></i> Edit</button>' +
        '<button type="button" class="btn btn-link pull-right editItem" data-toggle="collapse" data-target="#edit' + target + '"><i class="icon-file icon-black"></i><small> Edit</small></button>' +
        '<i class="icon-ok-circle help-hover"> </i><button type="button" class="btn btn-link help-hover" data-original-title="Prompt (Click for more details)" rel="tooltip" data-placement="top" data-toggle="collapse" href="#' + target + '"><u> <strong class="detailsID">' + prompt['id'] + '</strong></u></button><br>'+
        
        '<div class="collapse-group1">' + 
            '<div id="' + target + '" class="collapse itemDetails out">'+
                '<div class="accordion-inner">'+
                    '<p class="viewDetailsPromptID">Prompt ID: ' + prompt['id'] + '</p>' +  
                    '<p class="viewDetailsPromptText">Prompt Text: ' + prompt['promptText'] + '</p>' + 
                    '<p class="viewDetailsPromptDisplayLabel">Display Label: ' + prompt['displayLabel'] + '</p>' + 
                    '<p class="viewDetailsPromptType">Prompt Type: ' + prompt['promptType'] + '</p>' + 
                    '<p>Prompt options: </p>' +
                    '<span class="detailList">' + propertiesText + '</span>' +
                    '<p class="viewDetailsPromptDefault">Default: ' + defaultValue + '</p>' + 
                    '<p class="viewDetailsPromptCond">Condition: ' + condition + '</p>' + 
                    '<p class="viewDetailsPromptSkippable">Skippable: ' + prompt['skippable'] + '</p>' +
                    '<p class="viewDetailsPromptSkipLabel">Skip Label: ' + skipLabel + '</p>' +
                '</div>'+
            '</div>'+
        '</div>' +

        // prompt edit
        '<div class="collapse-group2">' + 
            '<div id="edit' + target + '" class="collapse itemEdit group2">'+
                editPrompt +
            '</div>'+
        '</div>' +

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
    var target = uniqueid();
    var newItem = '<li class="previousItem hide ">' +
        '<button type="button" class="btn btn-link pull-right deleteItem"><i class="icon-trash icon-black"></i><small> Delete</small></button>' +
        //'<button type="button" class="btn btn-link pull-right editItem"><i class="icon-pencil icon-black"></i> Edit</button>' +
        '<button type="button" class="btn btn-link pull-right editItem" data-toggle="collapse" data-target="#edit' + target + '"><i class="icon-file icon-black"></i><small> Edit</small></button>' +
        '<i class="icon-ok-circle help-hover"> </i><button type="button" class="btn btn-link help-hover" data-original-title="Prompt (Click for more details)" rel="tooltip" data-placement="top" data-toggle="collapse" href="#' + target + '"><u> <strong class="detailsID">' + prompt['id'] + '</strong></u></button><br>'+
        
        '<div class="collapse-group1">' + 
            '<div id="' + target + '" class="collapse itemDetails out">'+
                '<div class="accordion-inner">'+
                    '<p class="viewDetailsPromptID">Prompt ID: ' + prompt['id'] + '</p>' +  
                    '<p class="viewDetailsPromptText">Prompt Text: ' + prompt['promptText'] + '</p>' + 
                    '<p class="viewDetailsPromptDisplayLabel">Display Label: ' + prompt['displayLabel'] + '</p>' +
                    '<p class="viewDetailsPromptType">Prompt Type: ' + prompt['promptType'] + '</p>' +  
                    '<p>Prompt options: </p>' +
                    '<span class="detailList">' + propertiesText + '</span>' +
                    '<p class="viewDetailsPromptCond">Condition: ' + condition + '</p>' + 
                    '<p class="viewDetailsPromptSkippable">Skippable: ' + prompt['skippable'] + '</p>' +
                    '<p class="viewDetailsPromptSkipLabel">Skip Label: ' + skipLabel + '</p>' +
                '</div>'+
            '</div>'+
        '</div>' +    

        // prompt edit
        '<div class="collapse-group2">' + 
            '<div id="edit' + target + '" class="collapse itemEdit group2">'+
                editPrompt +
            '</div>'+
        '</div>' +

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
    var target = uniqueid();
    var newItem = '<li class="previousItem hide">' +
        '<button type="button" class="btn btn-link pull-right deleteItem"><i class="icon-trash icon-black"></i><small> Delete</small></button>' +
        //'<button type="button" class="btn btn-link pull-right editItem"><i class="icon-pencil icon-black"></i> Edit</button>' +
        '<button type="button" class="btn btn-link pull-right editItem" data-toggle="collapse" data-target="#edit' + target + '"><i class="icon-file icon-black"></i><small> Edit</small></button>' +
        '<i class="icon-ok-circle help-hover"> </i><button type="button" class="btn btn-link help-hover" data-original-title="Prompt (Click for more details)" rel="tooltip" data-placement="top" data-toggle="collapse" href="#' + target + '"><u> <strong class="detailsID">' + prompt['id'] + '</strong></u></button><br>'+
      
        '<div class="collapse-group1">' +       
            '<div id="' + target + '" class="collapse itemDetails out">'+
                '<div class="accordion-inner">'+ 
                    '<p class="viewDetailsPromptID">Prompt ID: ' + prompt['id'] + '</p>' +  
                    '<p class="viewDetailsPromptText">Prompt Text: ' + prompt['promptText'] + '</p>' + 
                    '<p class="viewDetailsPromptDisplayLabel">Display Label: ' + prompt['displayLabel'] + '</p>' +
                    '<p class="viewDetailsPromptType">Prompt Type: ' + prompt['promptType'] + '</p>' +  
                    '<p>Prompt options: </p>' +
                    '<span class="detailList">' + propertiesText + '</span>' +
                    '<p class="viewDetailsPromptCond">Condition: ' + condition + '</p>' + 
                    '<p class="viewDetailsPromptSkippable">Skippable: ' + prompt['skippable'] + '</p>' +
                    '<p class="viewDetailsPromptSkipLabel">Skip Label: ' + skipLabel + '</p>' +
                '</div>'+
            '</div>'+
        '</div>' +

        // prompt edit
        '<div class="collapse-group2">' + 
            '<div id="edit' + target + '" class="collapse itemEdit group2">'+
                editPrompt +
            '</div>'+
        '</div>' +

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
    var target = uniqueid();
    var newItem = '<li class="previousItem hide" >' +
        '<button type="button" class="btn btn-link pull-right deleteItem"><i class="icon-trash icon-black"></i><small> Delete</small></button>' +
        //'<button type="button" class="btn btn-link pull-right editItem"><i class="icon-pencil icon-black"></i> Edit</button>' +
        '<button type="button" class="btn btn-link pull-right editItem" data-toggle="collapse" data-target="#edit' + target + '"><i class="icon-file icon-black"></i><small> Edit</small></button>' +
        '<i class="icon-ok-circle help-hover"> </i><button type="button" class="btn btn-link help-hover" data-original-title="Prompt (Click for more details)" rel="tooltip" data-placement="top" data-toggle="collapse" href="#' + target + '"><u> <strong class="detailsID">' + prompt['id'] + '</strong></u></button><br>'+
   
        '<div class="collapse-group1">' + 
            '<div id="' + target + '" class="collapse itemDetails out">'+
                '<div class="accordion-inner">'+
                    '<p class="viewDetailsPromptID">Prompt ID: ' + prompt['id'] + '</p>' +  
                    '<p class="viewDetailsPromptText">Prompt Text: ' + prompt['promptText'] + '</p>' + 
                    '<p class="viewDetailsPromptDisplayLabel">Display Label: ' + prompt['displayLabel'] + '</p>' +
                    '<p class="viewDetailsPromptType">Prompt Type: ' + prompt['promptType'] + '</p>' +  
                    '<p>Prompt options: </p>' +
                    '<span class="detailList">' + propertiesText + '</span>' +
                    '<p class="viewDetailsPromptDefault">Default: ' + defaultValue + '</p>' + 
                    '<p class="viewDetailsPromptCond">Condition: ' + condition + '</p>' + 
                    '<p class="viewDetailsPromptSkippable">Skippable: ' + prompt['skippable'] + '</p>' +
                    '<p class="viewDetailsPromptSkipLabel">Skip Label: ' + skipLabel + '</p>' +
                '</div>'+
            '</div>'+
        '</div>' +

        // prompt edit
        '<div class="collapse-group2">' + 
            '<div id="edit' + target + '" class="collapse itemEdit group2">'+
                editPrompt +
            '</div>'+
        '</div>' +

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
    var target = uniqueid();

    var newItem = '<li class="previousItem hide" >' +
        '<button type="button" class="btn btn-link pull-right deleteItem"><i class="icon-trash icon-black"></i><small> Delete</small></button>' +
        //'<button type="button" class="btn btn-link pull-right editItem"><i class="icon-pencil icon-black"></i> Edit</button>' +
        '<button type="button" class="btn btn-link pull-right editItem" data-toggle="collapse" data-target="#edit' + target + '"><i class="icon-file icon-black"></i><small> Edit</small></button>' +
        '<i class="icon-ok-circle help-hover"> </i><button type="button" class="btn btn-link help-hover" data-original-title="Prompt (Click for more details)" rel="tooltip" data-placement="top" data-toggle="collapse" href="#' + target + '"><u> <strong class="detailsID">' + prompt['id'] + '</strong></u></button><br>'+

        '<div class="collapse-group1">' + 
            '<div id="' + target + '" class="collapse itemDetails out">'+
                '<div class="accordion-inner">'+
                    '<p class="viewDetailsPromptID">Prompt ID: ' + prompt['id'] + '</p>' +  
                    '<p class="viewDetailsPromptText">Prompt Text: ' + prompt['promptText'] + '</p>' + 
                    '<p class="viewDetailsPromptDisplayLabel">Display Label: ' + prompt['displayLabel'] + '</p>' +
                    '<p class="viewDetailsPromptType">Prompt Type: ' + prompt['promptType'] + '</p>' +  
                    '<p>Prompt options: </p>' +
                    '<span class="detailList">' + propertiesText + '</span>' +
                    '<p class="viewDetailsPromptDefault">Default: ' + defaultValue + '</p>' + 
                    '<p class="viewDetailsPromptCond">Condition: ' + condition + '</p>' + 
                    '<p class="viewDetailsPromptSkippable">Skippable: ' + prompt['skippable'] + '</p>' +
                    '<p class="viewDetailsPromptSkipLabel">Skip Label: ' + skipLabel + '</p>' +
                '</div>'+
            '</div>'+
        '</div>' +

        // prompt edit
        '<div class="collapse-group2">' + 
            '<div id="edit' + target + '" class="collapse itemEdit group2">'+
                editPrompt +
            '</div>'+
        '</div>' +

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
    var target = uniqueid();
    var newItem = '<li class="previousItem hide" >' +
        '<button type="button" class="btn btn-link pull-right deleteItem"><i class="icon-trash icon-black"></i><small> Delete</small></button>' +
        //'<button type="button" class="btn btn-link pull-right editItem"><i class="icon-pencil icon-black"></i> Edit</button>' +
        '<button type="button" class="btn btn-link pull-right editItem" data-toggle="collapse" data-target="#edit' + target + '"><i class="icon-file icon-black"></i><small> Edit</small></button>' +
        '<i class="icon-ok-circle help-hover"> </i><button type="button" class="btn btn-link help-hover" data-original-title="Prompt (Click for more details)" rel="tooltip" data-placement="top" data-toggle="collapse" href="#' + target + '"><u> <strong class="detailsID">' + prompt['id'] + '</strong></u></button><br>'+
        
        '<div class="collapse-group1">' + 
            '<div id="' + target + '" class="collapse itemDetails out">'+
                '<div class="accordion-inner">'+
                    '<p class="viewDetailsPromptID">Prompt ID: ' + prompt['id'] + '</p>' +  
                    '<p class="viewDetailsPromptText">Prompt Text: ' + prompt['promptText'] + '</p>' + 
                    '<p class="viewDetailsPromptDisplayLabel">Display Label: ' + prompt['displayLabel'] + '</p>' +
                    '<p class="viewDetailsPromptType">Prompt Type: ' + prompt['promptType'] + '</p>' +  
                    '<p class="viewDetailsPromptCond">Condition: ' + condition + '</p>' + 
                    '<p class="viewDetailsPromptSkippable">Skippable: ' + prompt['skippable'] + '</p>' +
                    '<p class="viewDetailsPromptSkipLabel">Skip Label: ' + skipLabel + '</p>' +
                '</div>'+
            '</div>'+
        '</div>' +

        // prompt edit
        '<div class="collapse-group2">' + 
            '<div id="edit' + target + '" class="collapse itemEdit group2">'+
                editPrompt +
            '</div>'+
        '</div>' +

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
    var target = uniqueid();
    var newItem = '<li class="previousItem hide" >' +
        '<button type="button" class="btn btn-link pull-right deleteItem"><i class="icon-trash icon-black"></i><small> Delete</small></button>' +
        //'<button type="button" class="btn btn-link pull-right editItem"><i class="icon-pencil icon-black"></i> Edit</button>' +
        '<button type="button" class="btn btn-link pull-right editItem" data-toggle="collapse" data-target="#edit' + target + '"><i class="icon-file icon-black"></i><small> Edit</small></button>' +
        '<i class="icon-ok-circle help-hover"> </i><button type="button" class="btn btn-link help-hover" data-original-title="Prompt (Click for more details)" rel="tooltip" data-placement="top" data-toggle="collapse" href="#' + target + '"><u> <strong class="detailsID">' + prompt['id'] + '</strong></u></button><br>'+
        
        '<div class="collapse-group1">' + 
            '<div id="' + target + '" class="collapse itemDetails out">'+
                '<div class="accordion-inner">'+
                    '<p class="viewDetailsPromptID">Prompt ID: ' + prompt['id'] + '</p>' +  
                    '<p class="viewDetailsPromptText">Prompt Text: ' + prompt['promptText'] + '</p>' + 
                    '<p class="viewDetailsPromptDisplayLabel">Display Label: ' + prompt['displayLabel'] + '</p>' +
                    '<p class="viewDetailsPromptType">Prompt Type: ' + prompt['promptType'] + '</p>' +  
                    '<p>Prompt options: </p>' +
                    '<span class="detailList">' + propertiesText + '</span>' +
                    '<p class="viewDetailsPromptCond">Condition: ' + condition + '</p>' + 
                    '<p class="viewDetailsPromptSkippable">Skippable: ' + prompt['skippable'] + '</p>' +
                    '<p class="viewDetailsPromptSkipLabel">Skip Label: ' + skipLabel + '</p>' +
                '</div>'+
            '</div>'+
        '</div>' +

        // prompt edit
        '<div class="collapse-group2">' + 
            '<div id="edit' + target + '" class="collapse itemEdit group2">'+
                editPrompt +
            '</div>'+
        '</div>' +

        '</li>';
    $('#previousItemsSortable').children().eq(index).remove();
    if (index != 0) {
        $(newItem).insertAfter($('#previousItemsSortable').children().eq(index - 1)).slideToggle().removeClass('hide');
    } else {
        $(newItem).prependTo('#previousItemsSortable').slideToggle().removeClass('hide');
    }
    return true;
};