var campaignWrapper = $.parseJSON(localStorage['campaignWrapper']);
var tempSurvey = campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')];

//var indexMapper = {};

$(function() {
    for (i in campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList']['']) {
        console.log(campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][i]);
        if (campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][i]['message']) {
            addMessageToPrevItems(i);
        } else if (campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][i]['prompt']) {
            switch (campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][i]['prompt']['promptType']) {
                case 'multi_choice':
                case 'multi_choice_custom':
                    addMultipleChoiceToPrevItem(i);
                    break;
                case 'single_choice':
                case 'single_choice_custom':
                    addSingleChoiceToPrevItem(i);
                    break;
                case 'number':
                    addNumberToPrevItem(i);
                    break;
                case 'photo':
                    addPhotoToPrevItem(i);
                    break; 
                case 'remote_activity':
                    addRemoteToPrevItem(i);
                    break;
                case 'text':
                    addTextToPrevItem(i);
                    break;
                case 'timestamp':
                    addTimestampToPrevItem(i);
                    break;                
                default:
                    break;
            }
        }
    }

    var skipLabel = $('#skipLabelLabel').text();
    $('#skippable').change(function() { 
        if (this.checked) {
            $('#skipLabel').removeAttr('disabled');
            $('#skipLabelLabel').append('<span class="label label-info">Required</span>');
        }
        else {
            $('#skipLabel').attr('disabled', 'disabled');
            $('#skipLabelLabel').html(skipLabel);
        }
    });

    $("#groupPromptType").change(function() {
        $this = $(this);
        var changeConfirm = true;
        if ($('#addedPrompt').val != "") {
            var text = "WARNING: Choosing new prompt type will clear all the data of old prompt type\n Proceed ?"
            changeConfirm = confirm(text);
        }

        if (changeConfirm) {
            
            $('#addedPrompt').val(""); // clear text box
            switch ($this.val()) {
                case 'multi_choice':
                case 'multi_choice_custom':
                    $('#multiChoiceModal').modal('show');
                    break;
                case 'single_choice':
                case 'single_choice_custom':
                    //$('#singleChoiceModal').modal('show');
                    // automatically fit modal
                    // reset modal
                    $('#singleChoiceTable').empty();
                    $('#singleChoiceTable').append("<tr><th>Label</th><th>Value</th></tr><tr><td><input type='text' class='singleLabel' /></td><td><input type='text' class='singleValue' /></td><td><button class='btn btn-primary'>X</button></td></tr>");
                    $('#singleChoiceDefault').empty();
                    $('#singleChoiceDefault')
                        .append($("<option></option>")
                        .attr("value",-1)
                        .text("None")); 
                    $('#singleChoiceModal').modal({
                        backdrop: true,
                        keyboard: true
                    }).css({
                        width: 'auto',
                        'margin-left': function () {
                            return -($(this).width() / 2);
                        }
                    });
                    break;
                case 'number':
                    $('#numberModal').modal('show');
                    break;
                case 'photo':
                    $('#photoModal').modal('show');
                    break; 
                case 'remote_activity':
                    $('#remoteActivityModal').modal('show');
                    break;
                case 'text':
                    $('#textModal').modal('show');
                    break;
                case 'timestamp':
                    // Timestamp modal is not needed.  Do nothing.
                    break;
                case 'video':
                    $('#videoModal').modal('show');
                    break;                
                default:
                    break;
            }
        }

        //$this.val(0);
    });

    
    $('#previousItemsSortable').sortable({
        start: function(event, ui) {
            $(ui.item).data('startIndex', ui.item.index());
        },
        stop: function(event, ui) {
            campaignEditor.shiftSurveyItems($(ui.item).data('startIndex'), ui.item.index());
        }
    }).disableSelection();

    $('#saveSurvey').click(function(e) {
        if (confirm('Are you sure you wish to save this survey?')) {
            deleteEditField(campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList']['']);
            //console.log(campaignWrapper);
            localStorage['campaignWrapper'] = JSON.stringify(campaignWrapper);
        } else {
            e.preventDefault();
        }
    }) 


    function setUpConditionPromptList() {
        // remove all previous options 
        if ($('#previousPrompts option').length != 0) $('#previousPrompts option').remove();

        var size = campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''].length;

        for (var i = 0; i < size; i++) {
            var item = campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][i]
            if (item['message']) {
                var value = item['message']['id'];
                $('#previousPrompts').append($('<option>', { value : i })
                                     .text(value));
            }
            else if (item['prompt']) {
                var value = item['prompt']['id'];
                $('#previousPrompts').append($('<option>', { value : i })
                                     .text(value));
            }
        }        
    }

    // Edit condition button
    $('#messageConditionBtn').click(function() {
        $('#conditionSource').val('message');
        $('#advancedCondition').val($(this).prev().val());
        setUpConditionPromptList();
        $('#conditionModal').modal('show');
    });

    $('#promptConditionBtn').click(function() {
        $('#conditionSource').val('prompt');
        $('#advancedCondition').val($(this).prev().val());
        setUpConditionPromptList();
        $('#conditionModal').modal('show');
    });

    // Condition toggle button
    $('#conditionToggle').click(function(){
        var $this = $(this);
        if ($this.text() === 'Simple') {
            $this.text('Advanced');
            $('#conditionType').val('advanced');
        } else {
            $this.text('Simple');
            $('#conditionType').val('simple');
        }
        $this.toggleClass('btn-inverse');
        $('#simpleCondition').toggle();
        $('#advancedCondition').toggle();
    });


    // Condition submit button
    $('#conditionSubmit').click(function(){
        if ($('#conditionType').val() == 'simple') {

        }
        else { //advance condition
            var source = $('#conditionSource').val();
            var text = $('#advancedCondition').val();
            switch (source) {
                case 'message':
                    $('#messageCondition').val(text);
                    break;
                case 'prompt':
                    $('#promptCondition').val(text);
                    break;
                default:
                    break;
            }
        }

        $('#conditionModal').modal('hide');
    });

    $('#previousItemsSortable').on('click', 'button.deleteItem', function() {
        $parent = $(this).parent();
        var index = $('#previousItemsSortable li').index($parent);
        $parent.slideUp('fast');
        setTimeout(deleteItemCallback($parent), 200);
        campaignEditor.deleteItem(index);
    });

    function setupEditMessage (message) {
        var itemId = message['editId'];
        console.log(itemId);
        $('#editMessageId').val(itemId);
        $('#messageText').val(message['messageText']);
        $('#messageId').val(message['id']);
        if (message['condition']) $('#messageCondition').val(message['condition']);

        $('#createMessage').text('Edit Message');
        $('#cancelMessageEdit').toggle();

        // next 2 lines somehow cause errors, temporary disable
        //$('#newPrompt').collapse('hide');
        //$('#newRepeatableSet').collapse('hide');
        $('#newMessage').collapse('show');
    }

     function setupEditPrompt (prompt) {
        // TODO
        var itemId = prompt['editId'];
        console.log(itemId);
        $('#editPromptId').val(itemId);
        $('#promptId').val(prompt['id']);
        $('#displayLabel').val(prompt['displayLabel']);
        $('#displayType').val(prompt['displayType']);
        $('#promptText').val(prompt['promptText']);
        $('#abbreviatedText').val(prompt['abbreviatedText']);
        $('#groupPromptType').val(prompt['promptType']);

        switch (prompt['promptType']) {
            case "multi_choice":
            case "multi_choice_custom":
            case "single_choice":
            case "single_choice_custom":
                var size = prompt['properties']['property'].length;

                var properties = "";
                for (var i = 0; i < size; ++i) {
                    answer = prompt['properties']['property'][i]['label'];
                    value  = prompt['properties']['property'][i]['value'];
                    properties += answer + ':' + value + '\n';
                }

                $('#addedPrompt').val(properties);
                break;
            case "number":
            case "text":
                var minNum = prompt['properties']['property'][0]['label'];
                var maxNum = prompt['properties']['property'][1]['label'];
                var properties = "min:" + minNum + "\n" + "max:" + maxNum;

                $('#addedPrompt').val(properties);
                break;
            case "photo":
                var resolution = prompt['properties']['property'][0]['key'];
                var properties = "resolution:" + resolution;

                $('#addedPrompt').val(properties);
                break;
            case "remote_activity":
                var pack = prompt['properties']['property'][0]['label'];
                var activity = prompt['properties']['property'][1]['label'];
                var action = prompt['properties']['property'][2]['label'];
                var auto = prompt['properties']['property'][3]['label'];
                var retry = prompt['properties']['property'][4]['label'];
                var min = prompt['properties']['property'][5]['label'];
                var input = prompt['properties']['property'][6]['label'];
                var properties = "Package:" + pack + "\n"
                              + "Activity:" + activity + "\n"
                              + "Action:" + action + "\n"
                              + "Auto:" + auto + "\n"
                              + "Retry:" + retry + "\n"
                              + "Min run:" + min + "\n"
                              + "Input:" + input + "\n"  

                $('#addedPrompt').val(properties);
                break;                            
            case "timestamp":
                
                break;
            case "video":
                // TODO
                break;
            default:
                console.log('Error, unknown prompt type found.');
                break;
        }
    
        // optional field
        if (prompt['default']) $('#default').val(prompt['default']);
        if (prompt['condition']) $('#promptCondition').val(prompt['condition']);
        if (prompt['skippable'] === 'on') {
            $('#skippable').toggle();
            if (prompt['skipLabel']) $('#skipLabel').val(prompt['skipLabel']);
        }
        
        $('#addPrompt').text('Edit Prompt');
        $('#cancelPromptEdit').toggle();
        
        // next 2 lines somehow cause errors, temporary disable
        //$('#newMessage').collapse('hide');
        //$('#newRepeatableSet').collapse('hide');
        $('#newPrompt').collapse('show');
        
    }

    $('#previousItemsSortable').on('click', 'button.editItem', function() {
        $parent = $(this).parent();
        var currentSurvey = campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')];
        var index = $('#previousItemsSortable li').index($parent);
        var item = currentSurvey['contentList'][''][index]

        if (item['message']) {
            setupEditMessage(item['message']);
        } else if (item['prompt']) {
            setupEditPrompt(item['prompt']);
        } else if (item['repeatableSet']) {

        } else {

        }
    });


    // Save message to campaignWrapper object
    $('#messageForm').submit(function(event) {
        var $this = $(this);

        // get form data
        // Find disabled inputs, and remove the "disabled" attribute
        var disabled = $this.find(':input:disabled').removeAttr('disabled');

        var messageData = $this.serializeObject();
        // re-disabled the set of inputs that you previously enabled
        disabled.attr('disabled','disabled');

        var itemIndex;
        if (messageData['editMessageId']) {
            event.preventDefault();
            var messageId = parseInt(messageData['editMessageId']);
    
            console.log(messageId);
            itemIndex = campaignEditor.surveyItemIndexes(campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList']['']).indexOf(messageId);
            //itemIndex = indexMapper[campaignEditor.surveyItemIndexes(campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList']['']).indexOf(id)];
            console.log(itemIndex);
            campaignEditor.addMessage(messageData, itemIndex);
        } else {
            event.preventDefault();
            itemIndex = campaignEditor.addMessage(messageData);
        }

        if (itemIndex === false) {
            surveyItemError('Some required fields are missing!')
            event.preventDefault();
            return;
        }
        addMessageToPrevItems(itemIndex);

        // cleanup code
        $('#editMessageId').val('');
        $('#createMessage').text('Create Message');
        $('#cancelMessageEdit').hide();
        $('.createItemError').slideToggle('slow',function() { $(this).alert('close')});
        $('#newMessage').collapse('hide');
        setTimeout(formCallback($this), 150);
        event.preventDefault();
	});
   
    
    // submit prompt and save to JSON object
    $('#promptForm').submit(function(event) {
        event.preventDefault();
        var $this = $(this);

        var disabled = $this.find(':input:disabled').removeAttr('disabled');
        var promptData = $this.serializeObject();
        disabled.attr('disabled','disabled');

        var promptType = promptData['promptType'];
        var itemIndex;
        properties = addProperties(promptData, promptType);
        if (promptData['editPromptId']) {
            event.preventDefault();
            var promptId = parseInt(promptData['editPromptId']);
            console.log(promptId);
            itemIndex = campaignEditor.surveyItemIndexes(campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList']['']).indexOf(promptId);
            console.log(itemIndex);
            campaignEditor.addPrompt(
                campaignWrapper['campaign'], 
                $.cookie('currentSurvey'),
                promptData['id'], 
                promptData['displayLabel'],
                promptData['displayType'],
                promptData['promptText'],
                promptData['abbreviatedText'],
                promptData['promptType'],
                promptData['default'],
                promptData['promptCondition'],
                promptData['skippable'] === "on",
                promptData['skipLabel'],
                properties,
                itemIndex
           );
        } else {
            event.preventDefault();
            itemIndex = campaignEditor.addPrompt(
                campaignWrapper['campaign'], 
                $.cookie('currentSurvey'),
                promptData['id'], 
                promptData['displayLabel'],
                promptData['displayType'],
                promptData['promptText'],
                promptData['abbreviatedText'],
                promptData['promptType'],
                promptData['default'],
                promptData['promptCondition'],
                promptData['skippable'] === "on",
                promptData['skipLabel'],
                properties
           );
        } 

        if (itemIndex === false) {
            surveyItemError('Some required fields are missing!')
            event.preventDefault();
            return;
        } else {
            switch (promptType) {
                case "multi_choice":
                case "multi_choice_custom":
                    addMultipleChoiceToPrevItem(itemIndex);
                    break;
                case "number":
                    addNumberToPrevItem(itemIndex);
                    break;
                case "photo":
                    addPhotoToPrevItem(itemIndex);
                    break;
                case "remote_activity":
                    addRemoteToPrevItem(itemIndex);
                    break;
                case "single_choice":
                case "single_choice_custom":
                    addSingleChoiceToPrevItem(itemIndex);
                    break;
                case "text":
                    addTextToPrevItem(itemIndex);
                    break;
                case "timestamp":
                    addTimestampToPrevItem(itemIndex);
                    break;
                case "video":
                    addVideoToPrevItem(itemIndex);
                    break;
                default:
                    console.log('Error, unknown prompt type found.');
                    break;
            }
        }

        // cleanup code
        $('#editPromptId').val('');
        $('#createPrompt').text('Create Prompt');
        $('#cancelPromptEdit').hide();
        $('.createItemError').slideToggle('slow',function() { $(this).alert('close')});
        $('#newPrompt').collapse('hide');
        setTimeout(formCallback($this), 150);
        event.preventDefault();
	});

    $('#viewXML').click(function() {
        console.log(campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]);
        var tmp = campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')];
        console.log(tmp);
        deleteEditField(tmp['contentList'][''])
        //var xml = json2xml({'survey': campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]});
        var xml = json2xml({'survey': tmp});
        $('#surveyXml').text(vkbeautify.xml(xml));
        $('#xmlModal').modal('show');
    });

    // modal stuff
    function updateSelection() {
        $('#singleChoiceDefault').empty();
        var key = 0;
        $('#singleChoiceDefault')
            .append($("<option></option>")
            .attr("value",-1)
            .text("None")); 
        $('#singleChoiceTable tr:not(:first-child)').each(function()
        {
            $this = $(this);
            var label = $this.find(".singleLabel").val();
            $('#singleChoiceDefault')
             .append($("<option></option>")
             .attr("value",key++)
             .text(label)); 
        });
    };
    function singleValidateValue() {
        $this = $(this);
        var val = $this.val();
        if (!isPositiveNumber(val)) {
            alert('Value must be a positive number');
            $this.css("background-color", "red");
        }
    }

    $("table[id=singleChoiceTable]").on("click", "button", function() {
        $(this).closest("tr").remove();
        updateSelection();
    }); 

    $("#addSingleBtn").click(function () {
        var row = "<tr><td><input type=text class='singleLabel'/></td><td><input type=text class='singleValue'/></td><td><button class='btn btn-primary'>X</button></td></tr>";
        $("table[id=singleChoiceTable]").append(row);
    });

    // delegate
    $('#singleChoiceModal').delegate('.singleLabel', 'change', updateSelection);
    $('#singleChoiceModal').delegate('.singleValue', 'change', singleValidateValue);

});
