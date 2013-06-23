var campaignWrapper = $.parseJSON(localStorage['campaignWrapper']);
var tempSurvey = campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')];

//var isEditing = false;
//var indexMapper = {};

$(function() {

    // populate promot page with information
    $('#choosePromptType').val("");
    $('#groupPromptType').val("");
    $('#promptType').val("");
    $('#addedPrompt').val("");
    $('#conditionType').val("");
    $('#editPromptId').val(-1);
    $('#editMessageId').val(-1);
    updateNumQuestion();
    isEditing = false;
    
    function savePrompts() {
        if (campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''].length != 0) {// survey need at least 1 prompt
            deleteEditField(campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList']['']);
            //console.log(campaignWrapper);
            localStorage['campaignWrapper'] = JSON.stringify(campaignWrapper);
            return true;
        } else {
            //alert("Survey needs at least one prompt.\nEmpty survey won't be accepted by the Ohmage server");
            //e.preventDefault();
            return false;
        }
    }

    // overide menu buttons
    $('#editCampaign').unbind('click').click(function(){
        if(!savePrompts()) {
            alert("Empty survey won't be accepted by the Ohmage server");
        } else {
            window.location = ('campaign-edit.php');
        }
    });
    // create new survey button
    $('#createNewSurvey').unbind('click').click(function() {
        if(!savePrompts()) {
            alert("Empty survey won't be accepted by the Ohmage server");
        } else {
            window.location.replace('survey.php');
        }
    });

    // edit existing survey button
    $('#editExistingSurvey').unbind('click').click(function() {
        if(!savePrompts()) {
            alert("Empty survey won't be accepted by the Ohmage server");
        } else {
            window.location.replace('existing-surveys.php');
        }
    });
    window.onbeforeunload = function(e) {
        savePrompts();
    }

    for (i in campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList']['']) {
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
                case 'video':
                    addVideoToPrevItem(i);
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

    function showNewModal() {
        var prevValue = jQuery("#choosePromptType").val();
        $('#promptData').empty();
        switch (prevValue) {
            case 'multi_choice':
            case 'multi_choice_custom':
                $.get("promptModals/multiChoiceModal.html", function(data){
                    $("#promptData").append(data);
                });
                break;
            case 'single_choice':
            case 'single_choice_custom':
                $.get("promptModals/singleChoiceModal.html", function(data){
                    $("#promptData").append(data);
                });
                break;
            case 'number':
                $.get("promptModals/numberModal.html", function(data){
                    $("#promptData").append(data);
                });
                break;
            case 'photo':
                $.get("promptModals/photoModal.html", function(data){
                    $("#promptData").append(data);
                });
                break; 
            case 'remote_activity':
                $.get("promptModals/remoteActivityModal.html", function(data){
                    $("#promptData").append(data);
                });
                break;
            case 'text':
                $.get("promptModals/textModal.html", function(data){
                    $("#promptData").append(data);
                });
                break;
            case 'timestamp':
                $.get("promptModals/timestamp.html", function(data){
                            $("#promptData").append(data);
                        });
                break;
            case 'video':
                $.get("promptModals/videoModal.html", function(data){
                    $("#promptData").append(data);
                });
                break;                
            default:
                break;
        }

        $('#promptTypeModal').modal('show');
        $('#promptTypeModal').modal({
            backdrop: true,
            keyboard: true
        }).css({
            width: 'auto',
            'margin-left': function () {
                return -($(this).width() / 2);
            }
        });
    }
    $('#promptTypeBtn').click(function() {
        $('#promptTypeModal').modal('show');
        $('#promptTypeModal').modal({
            backdrop: true,
            keyboard: true
        }).css({
            width: 'auto',
            'margin-left': function () {
                return -($(this).width() / 2);
            }
        });
        //showModal();
    });
    
    $(".promptTypeBtn").on("click", function(event){
      $('#promptTypeModal').modal('show');
        $('#promptTypeModal').modal({
            backdrop: true,
            keyboard: true
        }).css({
            width: 'auto',
            'margin-left': function () {
                return -($(this).width() / 2);
            }
        });
        //showModal();
    });

    $('#previousItemsSortable').sortable({
        start: function(event, ui) {
            $(ui.item).data('startIndex', ui.item.index());
        },
        stop: function(event, ui) {
            campaignEditor.shiftSurveyItems($(ui.item).data('startIndex'), ui.item.index());
        }
    });

    $('#saveSurvey').click(function(e) {
        if (campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''].length != 0) {// survey need at least 1 prompt
            if (confirm('Are you sure you wish to save this survey?')) {
                deleteEditField(campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList']['']);
                //console.log(campaignWrapper);
                localStorage['campaignWrapper'] = JSON.stringify(campaignWrapper);
            } else {
                e.preventDefault();
            }
        } else {
            alert("Survey need at least one prompt.");
            e.preventDefault();
        }
    }) 

    jQuery("#choosePromptType").change(function(){
        $this = $(this);
        $('.promptType').val($this.val());
    });

    function clearTableData() {
        $('#simpleConditionTbl tr:gt(1)').remove();
        $('.conditionPromptType').val('');
        $('.conditionValue').val('');
        $('.simpleConditionTbl').val('');
    }
    function setUpConditionPromptList() {
        // remove all previous options 
        if ($('.previousPrompts option').length != 0) $('.previousPrompts option').remove();
        $('.previousPrompts').append($('<option>', { value : ""})
                                     .text('None'));
        var size = campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''].length;

        for (var i = 0; i < size; i++) {
            var item = campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][i]
            if (item['message']) {
                var value = item['message']['id'];
                var text = value;
                $('.previousPrompts').append($('<option>', { value : 'message' })
                                     .text(text));
            }
            else if (item['prompt']) {
                var value = item['prompt']['id'];
                var text = value;
                $('.previousPrompts').append($('<option>', { value :  item['prompt']['promptType']})
                                     .text(text));
            }
        }        
    }

    // Edit condition button
    $('#messageConditionBtn, .messageConditionBtn').click(function() {
        $('#conditionSource').val('message');
        $('#advancedCondition').val($(this).prev().val());
        if($('#messageCondition').val().trim() == "") setUpConditionPromptList();
        $('#conditionModal').modal('show');
        $('#conditionModal').modal({
            backdrop: true,
            keyboard: true
        }).css({
            width: 'auto',
            'margin-left': function () {
                return -($(this).width() / 2);
            }
        });
    });

    $('#promptConditionBtn').click(function() {
        $('#conditionSource').val('prompt');
        $('#advancedCondition').val($(this).prev().val());
        if($('#promptCondition').val().trim() == "") {
            $('#simpleConditionTbl tr:gt(1)').remove();
            clearTableData();
            setUpConditionPromptList();
        }
        $('#conditionModal').modal('show');
        $('#conditionModal').modal({
            backdrop: true,
            keyboard: true
        }).css({
            width: 'auto',
            'margin-left': function () {
                return -($(this).width() / 2);
            }
        });
    });

    $('.promptConditionBtn').click(function() {
        $('#conditionSource').val('prompt');
        $('#advancedCondition').val($(this).prev().val());
        if($('#promptCondition').val().trim() == "") {
            $('#simpleConditionTbl tr:gt(1)').remove();
            clearTableData();
            setUpConditionPromptList();
        }
        $('#conditionModal').modal('show');
        $('#conditionModal').modal({
            backdrop: true,
            keyboard: true
        }).css({
            width: 'auto',
            'margin-left': function () {
                return -($(this).width() / 2);
            }
        });
    });

    // delete prompt
    $('#previousItemsSortable').on('click', 'button.deleteItem', function() {
        if(isEditing) {
            alert('Please finish editing or cancel before closing this');
        } else {
            if (confirm('Are you sure you want to delete this item ?')) {
                $parent = $(this).parent();
                var index = $('#previousItemsSortable li').index($parent);
                $parent.slideUp('fast');
                setTimeout(deleteItemCallback($parent), 200);
                campaignEditor.deleteItem(index);
                updateNumQuestion();
            }
        }
        //alert("Not Implemented yet");
    });

    // edit survey item
    $('#previousItemsSortable').on('click', 'button.editItem', function(e) {
        if (!isEditing) {
            isEditing = true;
            $parent = $(this).parent();
            var currentSurvey = campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')];
            var index = $('#previousItemsSortable li').index($parent);
            var item = currentSurvey['contentList'][''][index];
            $edit = $parent.find('.group2');
            editObj = $edit;

            if (item['message']) {
                setupEditMessage($edit, item['message'], index);
            } else if (item['prompt']) {
                setupEditPrompt($edit, item['prompt'], index);
            } else if (item['repeatableSet']) {

            } else {

            }
        } else {
            e.stopPropagation(); 
            alert('Please finish editing or cancel before closing this');
        }
        //alert("Not Implemented yet");
    });

    // edit survey item
    $('#previousItemsSortable').on('click', 'button.save', function() {
        $parent = $(this).closest('.previousItem');
        var currentSurvey = campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')];
        var index = $('#previousItemsSortable li').index($parent);
        var item = currentSurvey['contentList'][''][index];
        $edit = $parent.find('.group2');

        if (item['message']) {
            var messageData = {};
            messageData['id'] = $edit.find('.editPromptDetails').find('#messageId').val();
            messageData['messageText'] = $edit.find('.editPromptDetails').find('#messageText').val();
            if ($edit.find('.editPromptDetails').find('#messageCondition').val().trim() != "") messageData['condition'] = $edit.find('.editPromptDetails').find('#messageCondition').val();

            var result = campaignEditor.editMessage(messageData, index);

            if (result === false) {
                alert('Some required fields are missing!')
            } else {
                //editIndex = -1;
                isEditing = false;
                location.reload();
            }
        } else if (item['prompt']) {
            //var itemId = $('#editPromptId').val();
            var promptData = {};
            promptData['id'] = $edit.find('.editPromptDetails').find('.promptId').val();
            promptData['displayLabel'] = $edit.find('.editPromptDetails').find('.displayLabel').val();
            promptData['promptText'] = $edit.find('.editPromptDetails').find('.promptText').val();
            promptData['promptType'] = $edit.find('.editPromptDetails').find('.choosePromptType').val();

            if ($edit.find('.editPromptDetails').find('.default').val()!=null && $edit.find('.editPromptDetails').find('.default').val()!="") {
                //alert($('#default').val());
                promptData['default'] = $edit.find('.editPromptDetails').find('.default').val();
            } else {
                if (promptData['default'] != "") delete promptData.default;
                //alert(promptData['default'])
            }

            if (condition) promptData['condition'] = $edit.find('.editPromptDetails').find('.promptCondition').val();
            if ($edit.find('.editPromptDetails').find('.skippable').is(':checked')) { 
                promptData['skippable'] = true;
            } else {
                promptData['skippable'] = false;
            }
            if (promptData['skippable']) {
                if ($edit.find('.editPromptDetails').find('.skipLabel').val()) promptData['skipLabel'] = $edit.find('.editPromptDetails').find('.skipLabel').val();
                //else promptData['skipLabel'] = "Skip";
            } else {
                if (promptData['skipLabel']) delete promptData.skipLabel;
            }
            promptData['properties'] = $edit.find('.editPromptDetails').find('.addedPrompt').val();
            properties = addProperties(promptData, promptData['promptType']);

            result = campaignEditor.editPrompt(
                    campaignWrapper['campaign'], 
                    $.cookie('currentSurvey'),
                    promptData['id'], 
                    promptData['displayLabel'],
                    promptData['promptText'],
                    promptData['promptType'],
                    promptData['default'],
                    promptData['promptCondition'],
                    promptData['skippable'],
                    promptData['skipLabel'],
                    properties,
                    index
               );
            if (result == false) {
                alert('Some required fields are missing!')
            } else {
                isEditing = false;
                //editIndex = -1;
                location.reload();
            }
        } else if (item['repeatableSet']) {

        } else {

        }
    });

    // cancel edit survey click event
    $('#previousItemsSortable').on('click', 'button.cancel', function() {
        if (confirm('Are you sure ? All unsaved data will be lost')) {
            isEditing = false;
            location.reload();
        }
    });

    $('.createItem').on('click', function(e) {
        if (isEditing) {
            e.stopPropagation(); 
            alert('Please finish editing or cancel before proceed further');
        }
    });

    function setupEditMessage (currItem, message, itemId) {
        //var itemId = message['editId'];
        //console.log(currItem);
        currItem.find('.editPromptDetails').find('#editMessageId').val(itemId);
        currItem.find('.editPromptDetails').find('#messageText').val(message['messageText']);
        currItem.find('.editPromptDetails').find('#messageId').val(message['id']);
        if (message['condition']) currItem.find('.editPromptDetails').find('#messageCondition').val(message['condition']);

        //$('#createMessage').toggle();
        //$('#editMessage').toggle();
        //$('#cancelMessageEdit').toggle();

        // next 2 lines somehow cause errors, temporary disable
        //$('#newPrompt').collapse('hide');
        //$('#newRepeatableSet').collapse('hide');
        //$('#newMessage').collapse('show');
    }

    $('#editMessage').live('click',function() {
        var itemId = $('#editMessageId').val();
        var messageData = {};
        messageData['id'] = $('#messageId').val();
        messageData['messageText'] = $('#messageText').val();
        if ($('#messageCondition').val().trim() != "") messageData['condition'] = $('#messageCondition').val();

        var index = campaignEditor.editMessage(messageData, itemId);

        if (index === false) {
            surveyItemError('Some required fields are missing!')
        } else {
            location.reload();
            //$('#createMessage').toggle();
            //$('#editMessage').toggle();
            //$('#cancelMessageEdit').toggle();
        }
    });

    $('#cancelMessageEdit').live('click',function() {
        if (confirm("Are you sure you want to Cancel ?\n All unchanged save will be lost"))
            location.reload();
    });
    $('#cancelPromptEdit').live('click',function() {
        if (confirm("Are you sure you want to Cancel ?\n All unchanged save will be lost"))
            location.reload();
    });

    function setupEditPrompt (currItem, prompt, itemId) {
        // TODO
        //var itemId = prompt['editId'];
        console.log(currItem);
        currItem.find('.editPromptDetails').find('.editPromptId').val(itemId);
        currItem.find('.editPromptDetails').find('.promptId').val(prompt['id']);
        currItem.find('.editPromptDetails').find('.displayLabel').val(prompt['displayLabel']);
        //$('#displayType').val(prompt['displayType']);
        currItem.find('.editPromptDetails').find('.promptText').val(prompt['promptText']);
        currItem.find('.editPromptDetails').find('.abbreviatedText').val(prompt['abbreviatedText']);
        $('#groupPromptType').val(prompt['promptType']);
        currItem.find('.editPromptDetails').find('.choosePromptType').val(prompt['promptType']);
        currItem.find('.editPromptDetails').find('.promptType').val(prompt['promptType']);
        

        switch (prompt['promptType']) {
            case "multi_choice":
            case "multi_choice_custom":
                $(".multiChoiceModal").toggle();
                var defaultList;
                if (prompt['default']) { 
                    currItem.find('.editPromptDetails').find('.default').val(prompt['default'])
                    defaultList = prompt['default'].split(",");
                }
                var size = prompt['properties']['property'].length;

                var properties = "";
                for (var i = 0; i < size; i++) {
                    label = prompt['properties']['property'][i]['label'];
                    if (prompt['properties']['property'][i]['value']) value = prompt['properties']['property'][i]['value'];
                    else value = "";
                    var tmp = label + ':' + value;
                    if (prompt['default']) {
                        for (j = 0; j < defaultList.length; j++){
                             if (i == defaultList[i]) {
                                tmp += " (default)"
                                break;
                            }
                        }
                    }
                    properties += tmp + '\n';

                    if (i == 0) {
                        $('#multiChoiceTable tr:nth-child(2)').find(".multiOptionNum").val(i);
                        $('#multiChoiceTable tr:nth-child(2)').find(".multiLabel").val(label);
                        $('#multiChoiceTable tr:nth-child(2)').find(".multiValue").val(value);
                    } else {
                        // add row to table
                        $row = $('#multiChoiceTable tr:nth-child(2)').clone();
                        $('#multiChoiceTable tr:last').after($row);
                        $('#multiChoiceTable tr:last').find(".multiOptionNum").val(i);
                        $('#multiChoiceTable tr:last').find(".multiLabel").val(label);
                        $('#multiChoiceTable tr:last').find(".multiValue").val(value);
                    }
                }

                // update default box
                $('#multiChoiceDefault').empty();
                var key = 0;
                $('#multiChoiceTable tr:not(:first-child)').each(function()
                {
                    $this = $(this);
                    var optionNum = $this.find(".multiOptionNum").val();
                    var label = $this.find(".multiLabel").val();
                    $('#multiChoiceDefault')
                     .append($("<option></option>")
                     .attr("value",key++)
                     .text(optionNum + ': ' + label)); 
                });
                $('#multiChoiceDefault').val(defaultList);
                    
                currItem.find('.editPromptDetails').find('.addedPrompt').val(properties);
                break;
            case "single_choice":
            case "single_choice_custom":
                $(".singleChoiceModal").toggle();
                var size = prompt['properties']['property'].length;
                if (prompt['default']) { 
                    currItem.find('.editPromptDetails').find('.default').val(prompt['default'])
                }
                var properties = "";
                for (var i = 0; i < size; ++i) {
                    label = prompt['properties']['property'][i]['label'];
                    if (prompt['properties']['property'][i]['value']) value = prompt['properties']['property'][i]['value'];
                    else value = "";
                    var tmp = label + ':' + value;
                    if (prompt['default']) {
                        if (i == prompt['default']) tmp += " (default)"
                    }
                    properties += tmp + '\n';

                    if (i == 0) {
                        $('#singleChoiceTable tr:nth-child(2)').find(".singleOptionNum").val(i);
                        $('#singleChoiceTable tr:nth-child(2)').find(".singleLabel").val(label);
                        $('#singleChoiceTable tr:nth-child(2)').find(".singleValue").val(value);
                    } else {
                        // add row to table
                        $row = $('#singleChoiceTable tr:nth-child(2)').clone();
                        $('#singleChoiceTable tr:last').after($row);
                        $('#singleChoiceTable tr:last').find(".singleOptionNum").val(i);
                        $('#singleChoiceTable tr:last').find(".singleLabel").val(label);
                        $('#singleChoiceTable tr:last').find(".singleValue").val(value);
                    }
                }

                // update default box
                $('#singleChoiceDefault').empty();
                var key = 0;
                $('#singleChoiceDefault')
                    .append($("<option></option>")
                    .attr("value",-1)
                    .text("None")); 
                $('#singleChoiceTable tr:not(:first-child)').each(function()
                {
                    $this = $(this);
                    var optionNum = $this.find(".singleOptionNum").val();
                    var label = $this.find(".singleLabel").val();
                    $('#singleChoiceDefault')
                     .append($("<option></option>")
                     .attr("value",key++)
                     .text(optionNum + ': ' + label)); 
                });
                $('#singleChoiceDefault').val(currItem.find('.editPromptDetails').find('.default').val());
                currItem.find('.editPromptDetails').find('.addedPrompt').val(properties);
                break;
            case "number":
                $(".numberModal").toggle();
                var minNum = prompt['properties']['property'][0]['label'];
                var maxNum = prompt['properties']['property'][1]['label'];
                var properties = "min:" + minNum + "\n" + "max:" + maxNum;
                $('#numberTable').find('.minNum').val(minNum);
                $('#numberTable').find('.maxNum').val(maxNum);
                if (prompt['default']) { 
                    currItem.find('.editPromptDetails').find('.default').val(prompt['default']);
                    $('#numberTable').find('.numberDefault').val(prompt['default']);
                    properties += "\n" + "Default: " + prompt['default']
                } else properties += "\n" + "Default: ";
                currItem.find('.editPromptDetails').find('.addedPrompt').val(properties);
                break;
            case "text":
                $(".textModal").toggle();
                var minNum = prompt['properties']['property'][0]['label'];
                var maxNum = prompt['properties']['property'][1]['label'];
                var properties = "min:" + minNum + "\n" + "max:" + maxNum;
                $('#textTable').find('.minTextLength').val(minNum);
                $('#textTable').find('.maxTextLength').val(maxNum);
                if (prompt['default']) { 
                    currItem.find('.editPromptDetails').find('.default').val(prompt['default']);
                    $('#textTable').find('.textDefault').val(prompt['default']);
                    properties += "\n" + "Default: " + prompt['default']
                } else properties += "\n" + "Default: ";
                currItem.find('.editPromptDetails').find('.addedPrompt').val(properties);
                break;
            case "photo":
                $(".photoModal").toggle();
                var resolution = prompt['properties']['property'][0]['label'];
                var properties = "resolution:" + resolution;
                $('#photoTable').find('.maxRes').val(resolution);
                currItem.find('.editPromptDetails').find('.addedPrompt').val(properties);
                break;
            case "remote_activity":
                $(".remoteModal").toggle();
                var pack = prompt['properties']['property'][0]['label'];
                var activity = prompt['properties']['property'][1]['label'];
                var action = prompt['properties']['property'][2]['label'];
                var auto = prompt['properties']['property'][3]['label'];
                var retry = prompt['properties']['property'][4]['label'];
                var min = prompt['properties']['property'][5]['label'];
                if (prompt['properties']['property'][6]['label'])
                    var input = prompt['properties']['property'][6]['label'];
                else var input = "";
                var properties = "Package:" + pack + "\n"
                              + "Activity:" + activity + "\n"
                              + "Action:" + action + "\n"
                              + "Auto:" + auto + "\n"
                              + "Retry:" + retry + "\n"
                              + "Min run:" + min + "\n"
                              + "Input:" + input + "\n"  
                $('#remoteActivityTable').find('.packageRemote').val(pack);
                $('#remoteActivityTable').find('.activityRemote').val(activity);
                $('#remoteActivityTable').find('.actionRemote').val(action);
                $('#remoteActivityTable').find('.autoLaunch').val(auto);
                $('#remoteActivityTable').find('.retriesRemote').val(retry);
                $('#remoteActivityTable').find('.minrunRemote').val(min);
                if (input != "") $('#remoteActivityTable').find('.inputRemote').val(input);

                currItem.find('.editPromptDetails').find('.addedPrompt').val(properties);
                break;                            
            case "timestamp":
                $(".timeStampModal").toggle();
                break;
            case "video":
                $(".videoModal").toggle();
                var maxLength = prompt['properties']['property'][0]['label'];
                var properties = "max_seconds:" + maxLength;
                $('#videoTable').find('.maxVideoLength').val(maxLength);
                currItem.find('.editPromptDetails').find('.addedPrompt').val(properties);
                break;
            default:
                console.log('Error, unknown prompt type found.');
                break;
        }
    
        // optional field
        
        if (prompt['condition']) currItem.find('.editPromptDetails').find('.promptCondition').val(prompt['condition']);
        if (prompt['skippable']) {
            currItem.find('.editPromptDetails').find('.skippable').prop('checked', true);;
            if (prompt['skipLabel']) currItem.find('.editPromptDetails').find('.skipLabel').val(prompt['skipLabel']);
        } else {
            currItem.find('.editPromptDetails').find('.skippable').prop('checked', false);
            currItem.find('.editPromptDetails').find('.skipLabel').val("");
        }
        
        //$('#addPrompt').text('Edit Prompt');
        //$('#addPrompt').toggle();
        //$('#editPrompt').toggle();
        //$('#cancelPromptEdit').toggle();
        
        // next 2 lines somehow cause errors, temporary disable
        //$('#newMessage').collapse('hide');
        //$('#newRepeatableSet').collapse('hide');
        //$('#newPrompt').collapse('show');
        
    }

    $('#editPrompt').live('click',function() {
        var itemId = $('#editPromptId').val();
        var promptData = {};
        promptData['id'] = $('#promptId').val();
        promptData['displayLabel'] = $('#displayLabel').val();
        promptData['promptText'] = $('#promptText').val();
        promptData['promptType'] = $('#promptType').val();

        if ($('#default').val()!=null && $('#default').val()!="") {
            //alert($('#default').val());
            promptData['default'] = $('#default').val();
        } else {
            if (promptData['default'] != "") delete promptData.default;
            //alert(promptData['default'])
        }

        if (condition) promptData['condition'] = $('#promptCondition').val();
        if ($('#skippable').is(':checked')) { 
            promptData['skippable'] = true;
        } else {
            promptData['skippable'] = false;
        }
        if (promptData['skippable']) {
            if ($('#skipLabel').val()) promptData['skipLabel'] = $('#skipLabel').val();
            //else promptData['skipLabel'] = "Skip";
        } else {
            if (promptData['skipLabel']) delete promptData.skipLabel;
        }
        promptData['properties'] = $('#addedPrompt').val();
        properties = addProperties(promptData, promptData['promptType']);

        index = campaignEditor.editPrompt(
                campaignWrapper['campaign'], 
                $.cookie('currentSurvey'),
                promptData['id'], 
                promptData['displayLabel'],
                promptData['promptText'],
                promptData['promptType'],
                promptData['default'],
                promptData['promptCondition'],
                promptData['skippable'],
                promptData['skipLabel'],
                properties,
                itemId
           );
        if (index == false) {
            surveyItemError('Some required fields are missing!')
        } else {
            location.reload();
        }
        /*
        messageData['id'] = $('#messageId').val();
        messageData['messageText'] = $('#messageText').val();
        if ($('#messageCondition').val().trim() != "") messageData['condition'] = $('#messageCondition').val();

        var index = campaignEditor.editMessage(messageData, itemId);

        if (index === false) {
            surveyItemError('Some required fields are missing!')
        } else {
            location.reload();
            //$('#createMessage').toggle();
            //$('#editMessage').toggle();
            //$('#cancelMessageEdit').toggle();
        }
        */
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
        /*
        if (messageData['editMessageId']) {
            event.preventDefault();
            var messageId = parseInt(messageData['editMessageId']);
    
            console.log(messageId);
            itemIndex = campaignEditor.surveyItemIndexes(campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList']['']).indexOf(messageId);
            //itemIndex = indexMapper[campaignEditor.surveyItemIndexes(campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList']['']).indexOf(id)];
            console.log(itemIndex);
            campaignEditor.addMessage(messageData, itemIndex);
        } else {
            */
        event.preventDefault();
        itemIndex = campaignEditor.addMessage(messageData);
        

        if (itemIndex === false) {
            surveyItemError('Some required fields are missing!')
            event.preventDefault();
            return;
        }
        addMessageToPrevItems(itemIndex);
        updateNumQuestion();
        // cleanup code
        $('#editMessageId').val('');
        $('#createMessage').text('Create Message');
        $('#cancelMessageEdit').hide();
        $('.createItemError').slideToggle('slow',function() { $(this).alert('close')});
        $('#newMessage').collapse('hide');
        setTimeout(formCallback($this), 150);
        event.preventDefault();
        //location.reload();
	});
   
    
    // submit prompt and save to JSON object
    $('#promptForm').submit(function(event) {
        event.preventDefault();
        var $this = $(this);
        $('#promptType').val($('#choosePromptType').val());
        var disabled = $this.find(':input:disabled').removeAttr('disabled');
        var promptData = $this.serializeObject();
        disabled.attr('disabled','disabled');

        var promptType = promptData['promptType'];
        console.log(promptType);
        var itemIndex;
        properties = addProperties(promptData, promptType);
        /*
        if (promptData['editPromptId']) {
            event.preventDefault();
            var promptId = parseInt(promptData['editPromptId']);
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
        } else {*/
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
        //} 

        if (itemIndex === false) {
            surveyItemError('Some required fields are missing!')
            event.preventDefault();
            return;
        } else {
            /*
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
            */
            updateNumQuestion();
        }

        // cleanup code
        $('#editPromptId').val('');
        $('#createPrompt').text('Create Prompt');
        $('#cancelPromptEdit').hide();
        //$('.createItemError').slideToggle('slow',function() { $(this).alert('close')});
        //$('#newPrompt').collapse('hide');
        //setTimeout(formCallback($this), 150);
        //event.preventDefault();
        location.reload();
	});

    function updateNumQuestion() {
        var length = campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''].length;
        $('#numQuestion').html(length);
    }
    // delegate
    var prevValue = jQuery("#choosePromptType").val();
    $('#choosePromptType' ).on('mousedown', 'option', function (event) {
        event.preventDefault();
        if ($(this).val() === prevValue) {
            $('#promptTypeBtn').trigger('click');
        }
    });

    //var prevValue2 = $('.choosePromptType').val();
    /*
    $('.choosePromptType' ).on('mousedown', 'option', function (event) {
        $parent = $(this).closest('.previousItem');
        //var currentSurvey = campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')];
        //var index = $('#previousItemsSortable li').index($parent);
        //var item = currentSurvey['contentList'][''][index];
        $edit = $parent.find('.group2');
        event.preventDefault();
        if ($(this).val() === prevValue2) {
            alert('same');
            $('.promptTypeBtn').trigger('click');
        }
        //alert('click3');
    });
    */
    /*
    jQuery(".choosePromptType").focus(function() {
        //alert('click');
        prevValue = $(this).val();
    }).change(function() {
        //alert('click2');
        $this = $(this);
        $parent = $(this).closest('.previousItem');
        $edit = $parent.find('.group2');
        var changeConfirm = true;
        if ($edit.find('.editPromptDetails').find('.addedPrompt').val() != "") {
            var text = "WARNING: Choosing new prompt type will clear all the data of old prompt type\n Proceed ?"
            changeConfirm = confirm(text);
        } else {
            var text = "WARNING: Choosing new prompt type will clear all the data in the current prompt type\n Proceed ?"
            changeConfirm = confirm(text);
        }

        if (changeConfirm) {
            $edit.find('.editPromptDetails').find('.addedPrompt').val(""); // clear text box   
            showNewModal();
        } else {
            $this.val(prevValue);
            prevValue = $this.val();
        }
        //$this.val(0);
    });
    */

    jQuery("#choosePromptType").focus(function() {
        prevValue = $(this).val();
    }).change(function() {
        $this = $(this);
        var changeConfirm = true;
        if ($('#addedPrompt').val() != "") {
            var text = "WARNING: Choosing new prompt type will clear all the data of old prompt type\n Proceed ?"
            changeConfirm = confirm(text);
        } else {
            var text = "WARNING: Choosing new prompt type will clear all the data in the current prompt type\n Proceed ?"
            changeConfirm = confirm(text);
        }

        if (changeConfirm) {
            $('#addedPrompt').val(""); // clear text box   
            showNewModal();
        } else {
            $this.val(prevValue);
            prevValue = $this.val();
        }

        //$this.val(0);
    });
    
});
