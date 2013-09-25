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
    
    // tootltip setting
    $("[rel=tooltip]").tooltip({
        container: 'body'    
    });
    function savePrompts() {
        if (campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''].length != 0) {// survey need at least 1 prompt
            deleteEditField(campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList']['']);
            //console.log(campaignWrapper);
            localStorage['campaignWrapper'] = JSON.stringify(campaignWrapper);
            return true; // WARNING
        } else {
            //alert("Survey needs at least one prompt.\nEmpty survey won't be accepted by the Ohmage server");
            //e.preventDefault();
            return true;
        }
    }

    // overide menu buttons
    $('#editCampaign').unbind('click').click(function(){
        if(!savePrompts()) {
            alert("Empty survey won't be accepted by the Ohmage server");
        } else if ($('.previousItem').find('.collapse-group2').find('.in').length > 0) {
            if (confirm('Are you sure you want to navigate away from this page? \nThere is one or more unfinished editing prompt(s)')) {
                localStorage['campaignWrapper'] = JSON.stringify(campaignWrapper);
                window.location.replace('campaign-edit.html');
            }
        } else if ($('.accordion-group').find('.in').length > 0) {
            if (confirm('Are you sure you want to navigate away from this page? \nYou are creating a message or prompt')) {
                localStorage['campaignWrapper'] = JSON.stringify(campaignWrapper);
                window.location.replace('campaign-edit.html');
            }
        } else {
            window.location = ('campaign-edit.html');
        }
    });
    // create new survey button
    $('#createNewSurvey').unbind('click').click(function() {
        if(!savePrompts()) {
            alert("Empty survey won't be accepted by the Ohmage server");
        } else if ($('.previousItem').find('.collapse-group2').find('.in').length > 0) {
            if (confirm('Are you sure you want to navigate away from this page? \nThere is one or more unfinished editing prompt(s)')) {
                localStorage['campaignWrapper'] = JSON.stringify(campaignWrapper);
                console.log($('.previousItem').find('.collapse-group2').find('.in').length);
                window.location.replace('survey.html');
            }
        } else if ($('.accordion-group').find('.in').length > 0) {
            if (confirm('Are you sure you want to navigate away from this page? \nYou are creating a message or prompt')) {
                localStorage['campaignWrapper'] = JSON.stringify(campaignWrapper);
                window.location.replace('survey.html');
            }
        } else {
            window.location.replace('survey.html');
        }
    });

    // edit existing survey button
    $('#editExistingSurvey').unbind('click').click(function() {
        if(!savePrompts()) {
            alert("Empty survey won't be accepted by the Ohmage server");
        } else if ($('.previousItem').find('.collapse-group2').find('.in').length > 0) {
            if (confirm('Are you sure you want to navigate away from this page? \nThere is one or more unfinished editing prompt(s)')) {
                localStorage['campaignWrapper'] = JSON.stringify(campaignWrapper);
                console.log($('.previousItem').find('.collapse-group2').find('.in').length);
                window.location.replace('existing-surveys.html');
            }
        } else if ($('.accordion-group').find('.in').length > 0) {
            if (confirm('Are you sure you want to navigate away from this page? \nYou are creating a message or prompt')) {
                localStorage['campaignWrapper'] = JSON.stringify(campaignWrapper);
                window.location.replace('existing-surveys.html');
            }
        } else {
            window.location.replace('existing-surveys.html');
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
                case 'audio':
                    addAudioToPrevItem(i);
                    break;
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

    $('.createPrompt').click(function() {

        $('html,body').animate({scrollTop: $('#newPrompt').offset().top - 100});
        setTimeout(formCallback($('#promptForm'), 150));
        //$('#promptId').focus();
    });
    $('.createMessage').click(function() {
        $('html,body').animate({scrollTop: $('#newMessage').offset().top - 100});
        setTimeout(formCallback($('#messageForm'), 150));
        //$('#promptId').focus();
    });

    var skipLabel = $('.skipLabelText').text();
    $('#skippable').change(function() { 
        if (this.checked) {
            $('#skipLabel').removeAttr('disabled');
            $('.skipLabelText').append('<span class="red">*</span>');
        }
        else {
            $('#skipLabel').attr('disabled', 'disabled');
            $('.skipLabelText').html(skipLabel);
        }
    });

    function showNewModal(prevValue) {
        //var prevValue = jQuery("#choosePromptType").val();
        $('#groupPromptType').val(prevValue);  
        $('#promptData').empty();
        switch (prevValue) {
            case 'audio':
                $.get("promptModals/audioModal.html", function(data){
                    $("#promptData").append(data);
                    //$("#maxAudioLength").val(promptValue.maxAudioLength);
                });
                break;
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
                    //alert('test!!!!')
                    $("#promptData").append(data);
                });
                break;
            case 'text':
                $.get("promptModals/textModal.html", function(data){
                    $("#promptData").append(data);
                });
                break;
            case 'timestamp':
                $.get("promptModals/timestampModal.html", function(data){
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
        editObj = null;
        var prevValue = jQuery("#choosePromptType").val();
        var jsonString = $('#jsonText').val();
        if (jsonString == "") {
            showNewModal(prevValue);
        } else {
            if ($('#jsonText').val() != '')
                var json = JSON.parse($('#jsonText').val());
            switch(prevValue) {
                case 'audio':
                    var maxLength = json['property'][0]['label'];
                    //var properties = "max_seconds:" + maxLength;
                    $('#promptData').load("promptModals/audioModal.html", function() {
                        $('#audioTable', this).find('#maxAudioLength').val(maxLength);
                    });
                    break;
                case 'multi_choice':
                case 'multi_choice_custom':
                    $('#promptData').load("promptModals/multiChoiceModal.html", function() {
                        /*
                        var defaultList;
                        if (prompt['default']) { 
                            currItem.find('.editPromptDetails').find('.default').val(prompt['default'])
                            defaultList = prompt['default'].split(",");
                        }
                        */
                        var size = json['property'].length;

                        //var properties = "";
                        for (var i = 0; i < size; i++) {
                            label = json['property'][i]['label'];
                            if (json['property'][i]['value']) value = json['property'][i]['value'];
                            else value = "";

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
                        //$('#multiChoiceDefault').val(defaultList);
                            
                        //currItem.find('.editPromptDetails').find('.addedPrompt').val(properties);
                    });
                    break;
                case "single_choice":
                case "single_choice_custom":
                    $('#promptData').load("promptModals/singleChoiceModal.html", function() {
                        var size = json['property'].length;
                        /*
                        if (prompt['default']) { 
                            currItem.find('.editPromptDetails').find('.default').val(prompt['default'])
                        }
                        */
                        //var properties = "";
                        for (var i = 0; i < size; ++i) {
                            label = json['property'][i]['label'];
                            if (json['property'][i]['value']) value = json['property'][i]['value'];
                            else value = "";
                            
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
                        $('#singleChoiceDefault').val($('#default').val());
                        //currItem.find('.editPromptDetails').find('.addedPrompt').val(properties);
                    });
                    break;
                case "number":
                    $('#promptData').load("promptModals/numberModal.html", function() {
                        var minNum = json['property'][0]['label'];
                        var maxNum = json['property'][1]['label'];
                        //var properties = "min:" + minNum + "\n" + "max:" + maxNum;
                        $('#numberTable').find('#minNumber').val(minNum);
                        $('#numberTable').find('#maxNumber').val(maxNum);
                        if ($('#default').val()) { 
                            //currItem.find('.editPromptDetails').find('.default').val(prompt['default']);
                            $('#numberTable').find('#numberDefault').val($('#default').val());
                            //properties += "\n" + "Default: " + prompt['default']
                        } //else properties += "\n" + "Default: ";
                        //currItem.find('.editPromptDetails').find('.addedPrompt').val(properties);
                    });
                    break;
                case "text":
                    $('#promptData').load("promptModals/textModal.html", function() {
                        var minNum = json['property'][0]['label'];
                        var maxNum = json['property'][1]['label'];
                        //var properties = "min:" + minNum + "\n" + "max:" + maxNum;
                        $('#textTable').find('#minTextLength').val(minNum);
                        $('#textTable').find('#maxTextLength').val(maxNum);
                        if ($('#default').val()) { 
                            //currItem.find('.editPromptDetails').find('.default').val(prompt['default']);
                            $('#textTable').find('#textDefault').val($('#default').val());
                            //properties += "\n" + "Default: " + prompt['default']
                        } 
                    });
                    break;
                case "photo":
                    $('#promptData').load("promptModals/photoModal.html", function() {
                        var resolution = json['property'][0]['label'];
                        //var properties = "resolution:" + resolution;
                        $('#photoTable').find('#maxRes').val(resolution);
                        //currItem.find('.editPromptDetails').find('.addedPrompt').val(properties);
                    });
                    break;
                case "remote_activity":
                    $('#promptData').load("promptModals/remoteActivityModal.html", function() {
                        var pack = json['property'][0]['label'];
                        var activity = json['property'][1]['label'];
                        var action = json['property'][2]['label'];
                        var auto = json['property'][3]['label'];
                        var retry = json['property'][4]['label'];
                        var min = json['property'][5]['label'];
                        if (json['property'][6]['label'])
                            var input = json['property'][6]['label'];
                        else var input = "";
                    
                        $('#remoteActivityTable').find('#packageRemote').val(pack);
                        $('#remoteActivityTable').find('#activityRemote').val(activity);
                        $('#remoteActivityTable').find('#actionRemote').val(action);
                        $('#remoteActivityTable').find('#autoLaunch').val(auto);
                        $('#remoteActivityTable').find('#retriesRemote').val(retry);
                        $('#remoteActivityTable').find('#minrunRemote').val(min);
                        if (input != "") $('#remoteActivityTable').find('#inputRemote').val(input);
                        else $('#remoteActivityTable').find('#inputRemote').val('null');

                    });
                    break;                            
                case "timestamp":
                    $('#promptData').load("promptModals/timestampModal.html", function() {
                    });
                    break;
                case 'video':
                    var maxLength = json['property'][0]['label'];
                    
                    $('#promptData').load("promptModals/videoModal.html", function() {
                        $('#videoTable', this).find('#maxVideoLength').val(maxLength);
                    });
                    break;
            }
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
        editObj = null;
        //showNewModal();
        $this = $(this);
        $('#groupPromptType').val($this.val());
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

    function updateConditionTable(row, promptType) {
        $this = row;
        // update table
        switch (promptType) {
            case 'audio':
            case 'photo':
            case 'remote_activity':
            case 'timestamp':
            case 'video':
                $this.find(".operator option").remove();
                $this.find(".operator").append(operator2[0]);
                $this.find(".operator").append(operator2[5]);
                $this.find(".conditionValueChoice option").remove();
                $this.find(".conditionValueChoice").append(conditionValueChoice[0]);
                $this.find(".conditionValueChoice").append(conditionValueChoice[1]);
                break;
            case 'message':
                $this.find(".operator option").remove();
                $this.find(".operator").append(operator2[0]);
                $this.find(".operator").append(operator2[5]);
                $this.find(".conditionValueChoice option").remove();
                $this.find(".conditionValueChoice").append(conditionValueChoice[0]);
                break;
            case 'text':
                $this.find(".operator option").remove();
                $this.find(".operator").append(operator2[0]);
                $this.find(".operator").append(operator2[5]);
                $this.find(".conditionValueChoice option").remove();
                $this.find(".conditionValueChoice").append(conditionValueChoice[0]);
                $this.find(".conditionValueChoice").append(conditionValueChoice[1]);
                $this.find(".conditionValueChoice").append(conditionValueChoice[2]);
                break;
            case 'multi_choice':
            case 'multi_choice_custom':
            case 'single_choice':
            case 'single_choice_custom':
            case 'number':
                $this.find(".operator option").remove();
                $this.find(".operator").append(operator2[0]);
                $this.find(".operator").append(operator2[1]);
                $this.find(".operator").append(operator2[2]);
                $this.find(".operator").append(operator2[3]);
                $this.find(".operator").append(operator2[4]);
                $this.find(".operator").append(operator2[5]);
                $this.find(".conditionValueChoice option").remove();
                $this.find(".conditionValueChoice").append(conditionValueChoice[0]);
                $this.find(".conditionValueChoice").append(conditionValueChoice[1]);
                $this.find(".conditionValueChoice").append(conditionValueChoice[2]);
                break;       
            case '-1':
                //$this.parents("tr:first").find(".operator option").remove();
                break;
            default:
                break;
        }
    }
    // Edit condition button
    $('#messageConditionBtn').click(function() {
        editObj = null;
        $('#conditionSource').val('message');
        $('#advancedCondition').val($(this).prev().val());
        if($('#messageCondition').val().trim() == "") {
            setUpConditionPromptList(); 
            $('#conditionType').val("");
            $("#conditionData").empty();
            $("#simpleCondition").hide();
            $("#advancedCondition").hide();
        } else {
            setUpConditionPromptList(); 
            switch ($('#messageConditionType').val()) {
                case 'simple':
                    $('#conditionType').val($('#messageConditionType').val());
                    var jsonText = $('#messageConditionJson').val();
                    if (jsonText != '') {
                        json = JSON.parse(jsonText);
                    }
                    var size = json['row'].length;

                    for (var i = 0; i < size; i++) {
                        promptID = json['row'][i]['promptID'];
                        operator = json['row'][i]['operator'];
                        value = json['row'][i]['value'];
                        conjunction = json['row'][i]['conjunction'];
                        promptType = json['row'][i]['promptType'];
                        //if (json['property'][i]['value']) value = json['property'][i]['value'];
                        //else value = "";
                        

                        if (i == 0) {
                            updateConditionTable($('#simpleConditionTbl tr:nth-child(2)'), promptType);
                            //$('#simpleConditionTbl tr:nth-child(2)').find(".previousPrompts option").filter(function () { return $(this).html() == promptID; }).val();
                            $('#simpleConditionTbl tr:nth-child(2) .previousPrompts option')
                            .filter(function () { return $(this).html() == promptID; })
                            .attr('selected',true);
                            //$('#simpleConditionTbl tr:nth-child(2) .previousPrompts').find('option[text="' + promptID + '"]').val();
                            $('#simpleConditionTbl tr:nth-child(2)').find(".operator").val(operator);
                            if (value == 'NOT_DISPLAYED' || value === 'SKIPPED') {
                                $('#simpleConditionTbl tr:nth-child(2)').find(".conditionValueChoice").val(value);
                                $('#simpleConditionTbl tr:nth-child(2)').find(".valueRow").empty();
                            } else {
                                $('#simpleConditionTbl tr:nth-child(2)').find(".conditionValueChoice").val('USER_INPUT');
                                $('#simpleConditionTbl tr:nth-child(2)').find(".valueRow").empty();
                                switch(promptType) {
                                    case 'multi_choice':
                                    case 'multi_choice_custom':
                                    case 'single_choice':
                                    case 'single_choice_custom':
                                        var numOption = 0;
                                        for (i in campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList']['']) {
                                            if (campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][i]['prompt']) {
                                                if (campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][i]['prompt']['id'] == promptID) {
                                                    numOption = campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][i]['prompt']['properties']['property'].length;
                                                    console.log(numOption);
                                                    break;
                                                }
                                            }
                                        }
                                        $('#simpleConditionTbl tr:nth-child(2)').find(".valueRow").append('<select class="conditionValue span1" ></select>');
                                        for (j=0; j<numOption; j++) {
                                            var option = '<option value=' + j + '>' + j + '</option>';
                                            $('#simpleConditionTbl tr:nth-child(2)').find(".conditionValue").append(option);
                                        }
                                        $('#simpleConditionTbl tr:nth-child(2)').find(".conditionValue").val(value);
                                        break;
                                    case 'number':
                                    case 'text':
                                        $('#simpleConditionTbl tr:nth-child(2)').find(".valueRow").append('<input type="text" class="conditionValue span1" value="" disabled/>');
                                        $('#simpleConditionTbl tr:nth-child(2)').find(".conditionValue").removeAttr('disabled');
                                        $('#simpleConditionTbl tr:nth-child(2)').find(".conditionValue").val('');
                                        $('#simpleConditionTbl tr:nth-child(2)').find(".conditionValue").val(value);
                                        break;
                                    default:
                                        // cannot reach here
                                        alert('Error: Prompt type cannot have an user input value')
                                        break;
                                }
                            }
                            $('#simpleConditionTbl tr:nth-child(2)').find(".conjunction").val(conjunction);
                        } else {
                            // add row to table
                            
                            $row = $('#simpleConditionTbl tr:nth-child(2)').clone();
                            $('#simpleConditionTbl tr:last').after($row);

                            updateConditionTable($('#simpleConditionTbl tr:last'), promptType);
                            //$('#simpleConditionTbl tr:last').find(".previousPrompts").val(promptID);
                            $('#simpleConditionTbl tr:last .previousPrompts option')
                            .filter(function () { return $(this).html() == promptID; })
                            .attr('selected',true);
                            $('#simpleConditionTbl tr:last').find(".operator").val(operator);
                            if (value == 'NOT_DISPLAYED' || value === 'SKIPPED') {
                                $('#simpleConditionTbl tr:last').find(".conditionValueChoice").val(value);
                                $('#simpleConditionTbl tr:last').find(".valueRow").empty();
                            } else {
                                
                                $('#simpleConditionTbl tr:last').find(".conditionValueChoice").val('USER_INPUT');
                                $('#simpleConditionTbl tr:last').find(".valueRow").empty();
                                switch(promptType) {
                                    case 'multi_choice':
                                    case 'multi_choice_custom':
                                    case 'single_choice':
                                    case 'single_choice_custom':
                                        var numOption = 0;
                                        for (i in campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList']['']) {
                                            if (campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][i]['prompt']) {
                                                if (campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][i]['prompt']['id'] == promptID) {
                                                    numOption = campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][i]['prompt']['properties']['property'].length;
                                                    console.log(numOption);
                                                    break;
                                                }
                                            }
                                        }
                                        $('#simpleConditionTbl tr:last').find(".valueRow").append('<select class="conditionValue span1" ></select>');
                                        for (j=0; j<numOption; j++) {
                                            var option = '<option value=' + j + '>' + j + '</option>';
                                            $('#simpleConditionTbl tr:last').find(".conditionValue").append(option);
                                        }
                                        $('#simpleConditionTbl tr:last').find(".conditionValue").val(value);
                                        break;
                                    case 'number':
                                    case 'text':
                                        $('#simpleConditionTbl tr:last').find(".valueRow").append('<input type="text" class="conditionValue span1" value="" disabled/>');
                                        $('#simpleConditionTbl tr:last').find(".conditionValue").removeAttr('disabled');
                                        $('#simpleConditionTbl tr:last').find(".conditionValue").val('');
                                        $('#simpleConditionTbl tr:last').find(".conditionValue").val(value);
                                        break;
                                    default:
                                        // cannot reach here
                                        alert('Error: Prompt type cannot have an user input value')
                                        break;
                                }
                            }
                            $('#simpleConditionTbl tr:last').find(".conjunction").val(conjunction);
                        }
                    }

                    $("#simpleCondition").show();
                    $("#advancedCondition").hide();
                    break;
                case 'advanced':
                    $('#conditionType').val($('#messageConditionType').val());
                    $("#advancedConditionText").val($('#messageCondition').val().trim());
                    $("#simpleCondition").hide();
                    $("#advancedCondition").show();
                    break;
                default:
                    setUpConditionPromptList(); 
                    $('#conditionType').val("");
                    $("#conditionData").empty();
                    $("#simpleCondition").hide();
                    $("#advancedCondition").hide();
                    break;
            }
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

        //showConditionModal()
    });

    // condtition button when editing
    $('#previousItemsSortable').on('click', 'button.conditionBtn', function() {
        if (!isEditing) {
            //isEditing = true;
            $parent = $(this).closest('.previousItem');
            
            var currentSurvey = campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')];
            var index = $('#previousItemsSortable li').index($parent);
            var item = currentSurvey['contentList'][''][index];
            $edit = $parent.find('.group2');
            editObj = $edit;

            if (item['message']) {
                $('#conditionSource').val('message');
                console.log(item['message']['condition']);
                $('.advancedCondition').val(item['message']['condition']);
            } else if (item['prompt']) {
                $('#conditionSource').val('prompt');
                $('.advancedCondition').val(item['prompt']['condition']);
            } else if (item['repeatableSet']) {
                // todo
            } else {
                // nothing
            }

            $("#simpleCondition").hide();
            $("#advancedCondition").show();
            $('#conditionType').val('advanced');
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
        } else {
            e.stopPropagation(); 
            alert('Please finish editing or cancel before closing this');
        }
        //alert("Not Implemented yet");
    });

    $('#promptConditionBtn').click(function() {
        editObj = null;
        $('#conditionSource').val('prompt');
        $('#advancedCondition').val($(this).prev().val());
        if($('#promptCondition').val().trim() == "") {
            $('#simpleConditionTbl tr:gt(1)').remove();
            clearTableData();
            setUpConditionPromptList();
            $('#conditionType').val("");
            $("#conditionData").empty();
            $("#simpleCondition").hide();
            $("#advancedCondition").hide();
        } else {
            setUpConditionPromptList();
            switch ($('#promptConditionType').val()) {
                case 'simple':
                    $('#conditionType').val($('#promptConditionType').val());
                    var jsonText = $('#promptConditionJson').val();
                    if (jsonText != '') {
                        json = JSON.parse(jsonText);
                    }
                    var size = json['row'].length;

                    for (var i = 0; i < size; i++) {
                        promptID = json['row'][i]['promptID'];
                        operator = json['row'][i]['operator'];
                        value = json['row'][i]['value'];
                        conjunction = json['row'][i]['conjunction'];
                        promptType = json['row'][i]['promptType'];
                        //if (json['property'][i]['value']) value = json['property'][i]['value'];
                        //else value = "";
                        

                        if (i == 0) {
                            updateConditionTable($('#simpleConditionTbl tr:nth-child(2)'), promptType);
                            //$('#simpleConditionTbl tr:nth-child(2)').find(".previousPrompts option").filter(function () { return $(this).html() == promptID; }).val();
                            $('#simpleConditionTbl tr:nth-child(2) .previousPrompts option')
                            .filter(function () { return $(this).html() == promptID; })
                            .attr('selected',true);
                            //$('#simpleConditionTbl tr:nth-child(2) .previousPrompts').find('option[text="' + promptID + '"]').val();
                            $('#simpleConditionTbl tr:nth-child(2)').find(".operator").val(operator);
                            if (value == 'NOT_DISPLAYED' || value === 'SKIPPED') {
                                $('#simpleConditionTbl tr:nth-child(2)').find(".conditionValueChoice").val(value);
                                $('#simpleConditionTbl tr:nth-child(2)').find(".valueRow").empty();
                            } else {
                                $('#simpleConditionTbl tr:nth-child(2)').find(".conditionValueChoice").val('USER_INPUT');
                                $('#simpleConditionTbl tr:nth-child(2)').find(".valueRow").empty();
                                switch(promptType) {
                                    case 'multi_choice':
                                    case 'multi_choice_custom':
                                    case 'single_choice':
                                    case 'single_choice_custom':
                                        var numOption = 0;
                                        for (i in campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList']['']) {
                                            if (campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][i]['prompt']) {
                                                if (campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][i]['prompt']['id'] == promptID) {
                                                    numOption = campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][i]['prompt']['properties']['property'].length;
                                                    console.log(numOption);
                                                    break;
                                                }
                                            }
                                        }
                                        $('#simpleConditionTbl tr:nth-child(2)').find(".valueRow").append('<select class="conditionValue span1" ></select>');
                                        for (j=0; j<numOption; j++) {
                                            var option = '<option value=' + j + '>' + j + '</option>';
                                            $('#simpleConditionTbl tr:nth-child(2)').find(".conditionValue").append(option);
                                        }
                                        $('#simpleConditionTbl tr:nth-child(2)').find(".conditionValue").val(value);
                                        break;
                                    case 'number':
                                    case 'text':
                                        $('#simpleConditionTbl tr:nth-child(2)').find(".valueRow").append('<input type="text" class="conditionValue span1" value="" disabled/>');
                                        $('#simpleConditionTbl tr:nth-child(2)').find(".conditionValue").removeAttr('disabled');
                                        $('#simpleConditionTbl tr:nth-child(2)').find(".conditionValue").val('');
                                        $('#simpleConditionTbl tr:nth-child(2)').find(".conditionValue").val(value);
                                        break;
                                    default:
                                        // cannot reach here
                                        alert('Error: Prompt type cannot have an user input value')
                                        break;
                                }
                            }
                            $('#simpleConditionTbl tr:nth-child(2)').find(".conjunction").val(conjunction);
                        } else {
                            // add row to table
                            
                            $row = $('#simpleConditionTbl tr:nth-child(2)').clone();
                            $('#simpleConditionTbl tr:last').after($row);

                            updateConditionTable($('#simpleConditionTbl tr:last'), promptType);
                            //$('#simpleConditionTbl tr:last').find(".previousPrompts").val(promptID);
                            $('#simpleConditionTbl tr:last .previousPrompts option')
                            .filter(function () { return $(this).html() == promptID; })
                            .attr('selected',true);
                            $('#simpleConditionTbl tr:last').find(".operator").val(operator);
                            if (value == 'NOT_DISPLAYED' || value === 'SKIPPED') {
                                $('#simpleConditionTbl tr:last').find(".conditionValueChoice").val(value);
                                $('#simpleConditionTbl tr:last').find(".valueRow").empty();
                            } else {
                                
                                $('#simpleConditionTbl tr:last').find(".conditionValueChoice").val('USER_INPUT');
                                $('#simpleConditionTbl tr:last').find(".valueRow").empty();
                                switch(promptType) {
                                    case 'multi_choice':
                                    case 'multi_choice_custom':
                                    case 'single_choice':
                                    case 'single_choice_custom':
                                        var numOption = 0;
                                        for (i in campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList']['']) {
                                            if (campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][i]['prompt']) {
                                                if (campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][i]['prompt']['id'] == promptID) {
                                                    numOption = campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][i]['prompt']['properties']['property'].length;
                                                    console.log(numOption);
                                                    break;
                                                }
                                            }
                                        }
                                        $('#simpleConditionTbl tr:last').find(".valueRow").append('<select class="conditionValue span1" ></select>');
                                        for (j=0; j<numOption; j++) {
                                            var option = '<option value=' + j + '>' + j + '</option>';
                                            $('#simpleConditionTbl tr:last').find(".conditionValue").append(option);
                                        }
                                        $('#simpleConditionTbl tr:last').find(".conditionValue").val(value);
                                        break;
                                    case 'number':
                                    case 'text':
                                        $('#simpleConditionTbl tr:last').find(".valueRow").append('<input type="text" class="conditionValue span1" value="" disabled/>');
                                        $('#simpleConditionTbl tr:last').find(".conditionValue").removeAttr('disabled');
                                        $('#simpleConditionTbl tr:last').find(".conditionValue").val('');
                                        $('#simpleConditionTbl tr:last').find(".conditionValue").val(value);
                                        break;
                                    default:
                                        // cannot reach here
                                        alert('Error: Prompt type cannot have an user input value')
                                        break;
                                }
                            }
                            $('#simpleConditionTbl tr:last').find(".conjunction").val(conjunction);
                        }
                    }

                    $("#simpleCondition").show();
                    $("#advancedCondition").hide();
                    break;
                case 'advanced':
                    $('#conditionType').val($('#promptConditionType').val());
                    $("#advancedConditionText").val($('#promptCondition').val().trim());
                    $("#simpleCondition").hide();
                    $("#advancedCondition").show();
                    break;
                default:
                    setUpConditionPromptList(); 
                    $('#conditionType').val("");
                    $("#conditionData").empty();
                    $("#simpleCondition").hide();
                    $("#advancedCondition").hide();
                    break;
            }
        }
        //$('#conditionType').val("");
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

    $('#previousItemsSortable').on('click', 'button.viewDetails', function(e) {
        //if (!isEditing) {
            //isEditing = true;
            $parent = $(this).parent();
            if (($parent).find('.collapse-group2').find('.in').length > 0) {
                $parent.find('.itemEdit').collapse('hide');
            }
        //} else {
        //    e.stopPropagation(); 
        //    alert('Please finish editing or cancel before closing this');
        //}
        //alert("Not Implemented yet");
    });

    // edit survey item
    $('#previousItemsSortable').on('click', 'button.editItem', function(e) {
        if (!isEditing) {
            //isEditing = true;
            $parent = $(this).parent();
            if (($parent).find('.collapse-group1').find('.in').length > 0) {
                $parent.find('.itemDetails').collapse('hide');
            }
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
        //console.log($edit);

        if (item['message']) {
            var messageData = {};
            messageData['id'] = $edit.find('.editPromptDetails').find('.messageId').val();
            messageData['messageText'] = $edit.find('.editPromptDetails').find('.messageText').val();
            if ($edit.find('.editPromptDetails').find('.messageCondition').val().trim() != "") {
                //console.log('condition: ' + $edit.find('.editPromptDetails').find('.messageCondition').val())
                messageData['messageCondition'] = $edit.find('.editPromptDetails').find('.messageCondition').val();
            } else {
                //$edit.find('.editPromptDetails').find('.messageCondition').val().trim() != "";
                //console.log("EMPTY");
            }

            var result = campaignEditor.editMessage(messageData, index);

            if (result === false) {
                alert('Some required fields are missing!')
            } else {
                //editIndex = -1;
                //isEditing = false;
                //location.reload();
                currentSurvey = campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')];
                index = $('#previousItemsSortable li').index($parent);
                message = item['message'];
                var condition;
                if (!message['condition']) condition = "None";
                else condition = message['condition'];
                $parent.find('.detailsID').html(message['id']);
                $parent.find('.viewDetailsMessageID').html('<strong>Message ID: </strong>' + message['id']);
                $parent.find('.viewDetailsMessageText').html('<strong>Message Text: </strong>' + message['messageText']);
                $parent.find('.viewDetailsMessageCond').html('<strong>Condition: </strong>' + condition);

                $parent.find('.itemEdit').collapse('hide');
                $parent.find('.itemDetails').collapse('show');
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

            if ($edit.find('.editPromptDetails').find('.promptCondition').val().trim() != "") {
                promptData['promptCondition'] = $edit.find('.editPromptDetails').find('.promptCondition').val();
            }
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
            //properties = addProperties(promptData, promptData['promptType']);
            var properties = '';
            var jsonString = $edit.find('.editPromptDetails').find('.jsonText').val();
            if (jsonString != '') {
                properties = JSON.parse(jsonString); 
            }

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
                //isEditing = false;
                //editIndex = -1;
                //location.reload();
                currentSurvey = campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')];
                index = $('#previousItemsSortable li').index($parent);
                prompt = item['prompt'];

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

                
                $parent.find('.detailsID').html(prompt['id']);
                $parent.find('.viewDetailsPromptID').html('<strong>Prompt ID: </strong>' + prompt['id']);
                $parent.find('.viewDetailsPromptText').html('<strong>Prompt Text: </strong>' + prompt['promptText']);
                $parent.find('.viewDetailsPromptDisplayLabel').html('<strong>Display Label: </strong>' + prompt['displayLabel']);
                $parent.find('.viewDetailsPromptType').html('<strong>Display Label: </strong>' + prompt['promptType']);
                $parent.find('.detailList').html(propertiesText);
                $parent.find('.viewDetailsPromptDefault').html('<strong>Default: </strong>' + defaultValue);
                $parent.find('.viewDetailsPromptCond').html('<strong>Condition: </strong>' + condition);
                $parent.find('.viewDetailsPromptSkippable').html('<strong>Skippable: </strong>' + prompt['skippable']);
                $parent.find('.viewDetailsPromptSkipLabel').html('<strong>Skip Label: </strong>' + skipLabel);

                $parent.find('.itemEdit').collapse('hide');
                //$parent.find('.itemDetails').collapse('show');
            }
        } else if (item['repeatableSet']) {

        } else {

        }
    });

    // cancel edit survey click event
    $('#previousItemsSortable').on('click', 'button.cancel', function() {
        if (confirm('Are you sure ? All unsaved data will be lost')) {
            $parent.find('.itemEdit').collapse('hide');
            //$parent.find('.itemDetails').collapse('show');
        }
    });

    $('#previousItemsSortable').on('change', 'select.choosePromptType', function(e) {
        e.preventDefault();
        $parent = $(this).closest('.previousItem');
        var currItem = $parent.find('.group2');
        
        //currItem.find('button.promptTypeBtn').trigger('click');
        var changeConfirm = false;
       
        var text = "WARNING: Choosing new prompt type will clear all the options/keys/values.. associate with current prompt type\n Proceed ?"
        changeConfirm = confirm(text);

        if (changeConfirm) {
            editObj = currItem;
            //currItem.find('.editPromptDetails').find('.addedPrompt').val(""); // clear text box 
            var prevValue = currItem.find('.editPromptDetails').find(".choosePromptType").val();
            showNewModal(prevValue);
        }
    });
    
    $('#previousItemsSortable').on('mousedown', 'select.choosePromptType option', function(e) {
        e.preventDefault();
        $parent = $(this).closest('.previousItem');
        var currItem = $parent.find('.group2');
        editObj = currItem;

        var currentSurvey = campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')];
        var index = $('#previousItemsSortable li').index($parent);
        var item = currentSurvey['contentList'][''][index];
        var prompt = item['prompt'];

        if (prompt['promptType'] == $(this).val()) {
            currItem.find('button.promptTypeBtn').trigger('click');
        } else {
            //currItem.find('select.choosePromptType').trigger('change');
            var changeConfirm = false;
       
            var text = "WARNING: Choosing new prompt type will clear all the options/keys/values.. associate with current prompt type\n Proceed ?"
            changeConfirm = confirm(text);

            if (changeConfirm) {
                showNewModal($(this).val());
            }
        }
    });
    
    // promptype button on edit items
    $('#previousItemsSortable').on('click', 'button.promptTypeBtn', function() {
        $('#promptData').empty();
        
        $parent = $(this).closest('.previousItem');
        var currentSurvey = campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')];
        var index = $('#previousItemsSortable li').index($parent);
        var item = currentSurvey['contentList'][''][index];
        var prompt = item['prompt'];
        var currItem = $parent.find('.group2');
        var promptType = currItem.find('.editPromptDetails').find('.choosePromptType').val(); 
        editObj = currItem;
        //currItem.find('.editPromptDetails').find('.addedPrompt').val("");

        console.log('prompt: ' + editObj);
        console.log('promptType: ' + prompt['promptType']);
        // $("#groupPromptType").val(prompt['promptType']);
        //currItem.find('.editPromptDetails').find('.jsonText').val(JSON.stringify(prompt['properties']));   
        var jsonText = currItem.find('.editPromptDetails').find('.jsonText').val();
        if (jsonText != "")   
            var json = JSON.parse(jsonText);

        switch(promptType) {
            case 'audio':
                var maxLength = json['property'][0]['label'];
                //var properties = "max_seconds:" + maxLength;
                $('#promptData').load("promptModals/audioModal.html", function() {
                    $('#audioTable', this).find('#maxAudioLength').val(maxLength);
                });
                break;
            case 'multi_choice':
            case 'multi_choice_custom':
                $('#promptData').load("promptModals/multiChoiceModal.html", function() {
                    /*
                    var defaultList;
                    if (prompt['default']) { 
                        currItem.find('.editPromptDetails').find('.default').val(prompt['default'])
                        defaultList = prompt['default'].split(",");
                    }
                    */
                    var size = json['property'].length;

                    for (var i = 0; i < size; i++) {
                        label = json['property'][i]['label'];
                        if (json['property'][i]['value']) value = json['property'][i]['value'];
                        else value = "";
                        

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
                    //$('#multiChoiceDefault').val(defaultList);
                        
                    //currItem.find('.editPromptDetails').find('.addedPrompt').val(properties);
                });
                break;
            case "single_choice":
            case "single_choice_custom":
                $('#promptData').load("promptModals/singleChoiceModal.html", function() {
                    var size = json['property'].length;
                    if (prompt['default']) { 
                        currItem.find('.editPromptDetails').find('.default').val(prompt['default'])
                    }
                    //var properties = "";
                    for (var i = 0; i < size; ++i) {
                        label = json['property'][i]['label'];
                        if (json['property'][i]['value']) value = json['property'][i]['value'];
                        else value = "";
                        
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
                    //currItem.find('.editPromptDetails').find('.addedPrompt').val(properties);
                });
                break;
            case "number":
                $('#promptData').load("promptModals/numberModal.html", function() {
                    var minNum = json['property'][0]['label'];
                    var maxNum = json['property'][1]['label'];
                    
                    $('#numberTable').find('#minNumber').val(minNum);
                    $('#numberTable').find('#maxNumber').val(maxNum);
                    if (prompt['default']) { 
                        currItem.find('.editPromptDetails').find('.default').val(prompt['default']);
                        $('#numberTable').find('#numberDefault').val(prompt['default']);
                        
                    } 
                });
                break;
            case "text":
                $('#promptData').load("promptModals/textModal.html", function() {
                    var minNum = json['property'][0]['label'];
                    var maxNum = json['property'][1]['label'];
                    
                    $('#textTable').find('#minTextLength').val(minNum);
                    $('#textTable').find('#maxTextLength').val(maxNum);
                    if (prompt['default']) { 
                        currItem.find('.editPromptDetails').find('.default').val(prompt['default']);
                        $('#textTable').find('#textDefault').val(prompt['default']);  
                    } 
                });
                break;
            case "photo":
                $('#promptData').load("promptModals/photoModal.html", function() {
                    var resolution = json['property'][0]['label'];
                    $('#photoTable').find('#maxRes').val(resolution);
                });
                break;
            case "remote_activity":
                $('#promptData').load("promptModals/remoteActivityModal.html", function() {
                    var pack = json['property'][0]['label'];
                    var activity = json['property'][1]['label'];
                    var action = json['property'][2]['label'];
                    var auto = json['property'][3]['label'];
                    var retry = json['property'][4]['label'];
                    var min = json['property'][5]['label'];
                    if (json['property'][6]['label'])
                        var input = json['property'][6]['label'];
                    else var input = "";
                    
                    $('#remoteActivityTable').find('#packageRemote').val(pack);
                    $('#remoteActivityTable').find('#activityRemote').val(activity);
                    $('#remoteActivityTable').find('#actionRemote').val(action);
                    $('#remoteActivityTable').find('#autoLaunch').val(auto);
                    $('#remoteActivityTable').find('#retriesRemote').val(retry);
                    $('#remoteActivityTable').find('#minrunRemote').val(min);
                    if (input != "") $('#remoteActivityTable').find('#inputRemote').val(input);

                    
                });
                break;                            
            case "timestamp":
                $('#promptData').load("promptModals/timestampModal.html", function() {
                });
                break;
            case 'video':
                var maxLength = json['property'][0]['label'];
                
                $('#promptData').load("promptModals/videoModal.html", function() {
                    $('#videoTable', this).find('#maxVideoLength').val(maxLength);
                });
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
        // NOTE: this should change to somehow handle the call
        //showModal();
    });

    // skipable click event
    $('#previousItemsSortable').on('click', '.skippable', function() {
        $parent = $(this).closest('.previousItem');
        var currentSurvey = campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')];
        var index = $('#previousItemsSortable li').index($parent);
        var item = currentSurvey['contentList'][''][index];
        $edit = $parent.find('.group2');

        $edit.find('.editPromptDetails').find('.skipLabel').val();

        if (this.checked) {
            $edit.find('.editPromptDetails').find('.skipLabel').removeAttr('disabled');
            $edit.find('.editPromptDetails').find('.skipLabelText').append('<span class="red">*</span>');
        }
        else {
            $edit.find('.editPromptDetails').find('.skipLabel').attr('disabled', 'disabled');
            $edit.find('.editPromptDetails').find('.skipLabelText').html("Skip Label: ");
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
        currItem.find('.editPromptDetails').find('.editMessageId').val(itemId);
        currItem.find('.editPromptDetails').find('.messageText').val(message['messageText']);
        currItem.find('.editPromptDetails').find('.messageId').val(message['id']);
        if (message['condition']) currItem.find('.editPromptDetails').find('.messageCondition').val(message['condition']);

        //$('#createMessage').toggle();
        //$('#editMessage').toggle();
        //$('#cancelMessageEdit').toggle();

        // next 2 lines somehow cause errors, temporary disable
        //$('#newPrompt').collapse('hide');
        //$('#newRepeatableSet').collapse('hide');
        //$('#newMessage').collapse('show');
    }

    /*
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
    */
    $('#cancelMessage').live('click',function() {
        if (confirm("Are you sure you want to Cancel ?\n All unchanged save will be lost")) {
            //$('.createItemError').slideToggle('slow',function() { $(this).alert('close')});
            $this = $(this)
            $('#newMessage').collapse('hide');
            setTimeout(formCallback($this), 150);
        }
    });
    $('#cancelPrompt').live('click',function() {
        if (confirm("Are you sure you want to Cancel ?\n All unchanged save will be lost")) {
            //$('.createItemError').slideToggle('slow',function() { $(this).alert('close')});
            $this = $(this);
            $('#newPrompt').collapse('hide');
            setTimeout(formCallback($this), 150);
        }
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
        //var string = 
        currItem.find('.editPromptDetails').find('.jsonText').val(JSON.stringify(prompt['properties']));        

        switch (prompt['promptType']) {
            case "audio":
                // TODO
                var maxLength = prompt['properties']['property'][0]['label'];
                var properties = "max_milliseconds:" + maxLength;
                //$('#videoTable').find('.maxVideoLength').val(maxLength);
                currItem.find('.editPromptDetails').find('.addedPrompt').val(properties);
                break;
            case "multi_choice":
            case "multi_choice_custom":
                //$(".multiChoiceModal").toggle();
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
                             if (i == defaultList[j]) {
                                tmp += " (default)"
                                break;
                            }
                        }
                    }
                    properties += tmp + '\n';
                }
                currItem.find('.editPromptDetails').find('.addedPrompt').val(properties);
                break;
            case "single_choice":
            case "single_choice_custom":
                //$(".singleChoiceModal").toggle();
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

                    /*
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
                    */
                }

                // update default box
                /*
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
                */
                currItem.find('.editPromptDetails').find('.addedPrompt').val(properties);
                break;
            case "number":
                //$(".numberModal").toggle();
                var minNum = prompt['properties']['property'][0]['label'];
                var maxNum = prompt['properties']['property'][1]['label'];
                var properties = "min:" + minNum + "\n" + "max:" + maxNum;
                //$('#numberTable').find('.minNum').val(minNum);
                //$('#numberTable').find('.maxNum').val(maxNum);
                if (prompt['default']) { 
                    //currItem.find('.editPromptDetails').find('.default').val(prompt['default']);
                    //$('#numberTable').find('.numberDefault').val(prompt['default']);
                    properties += "\n" + "Default: " + prompt['default']
                } else properties += "\n" + "Default: ";
                currItem.find('.editPromptDetails').find('.addedPrompt').val(properties);
                break;
            case "text":
                //$(".textModal").toggle();
                var minNum = prompt['properties']['property'][0]['label'];
                var maxNum = prompt['properties']['property'][1]['label'];
                var properties = "min:" + minNum + "\n" + "max:" + maxNum;
                //$('#textTable').find('.minTextLength').val(minNum);
                //$('#textTable').find('.maxTextLength').val(maxNum);
                if (prompt['default']) { 
                    //currItem.find('.editPromptDetails').find('.default').val(prompt['default']);
                    //$('#textTable').find('.textDefault').val(prompt['default']);
                    properties += "\n" + "Default: " + prompt['default']
                } else properties += "\n" + "Default: ";
                currItem.find('.editPromptDetails').find('.addedPrompt').val(properties);
                break;
            case "photo":
                //$(".photoModal").toggle();
                var resolution = prompt['properties']['property'][0]['label'];
                var properties = "resolution:" + resolution;
                //$('#photoTable').find('.maxRes').val(resolution);
                currItem.find('.editPromptDetails').find('.addedPrompt').val(properties);
                break;
            case "remote_activity":
                //$(".remoteModal").toggle();
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
                //$('#remoteActivityTable').find('.packageRemote').val(pack);
                //$('#remoteActivityTable').find('.activityRemote').val(activity);
                //$('#remoteActivityTable').find('.actionRemote').val(action);
                //$('#remoteActivityTable').find('.autoLaunch').val(auto);
                //$('#remoteActivityTable').find('.retriesRemote').val(retry);
                //$('#remoteActivityTable').find('.minrunRemote').val(min);
                //if (input != "") $('#remoteActivityTable').find('.inputRemote').val(input);

                currItem.find('.editPromptDetails').find('.addedPrompt').val(properties);
                break;                            
            case "timestamp":
                //$(".timeStampModal").toggle();
                break;
            case "video":
                //$(".videoModal").toggle();
                //$('#promptData').empty();
                //$.get("promptModals/videoModal.html", function(data){
                //    $("#promptData").append(data);
                //});
                //$('#promptData').load("promptModals/videoModal.html");
                var maxLength = prompt['properties']['property'][0]['label'];
                var properties = "max_seconds:" + maxLength;
                //$('#videoTable').find('.maxVideoLength').val(maxLength);
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

        console.log($('#messageCondition').val());
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
        //properties = addProperties(promptData, promptType);
        var properties = '';
        var jsonString = $('#jsonText').val();
        if (jsonString != '')
            properties = JSON.parse(jsonString); 
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
            switch (promptType) {
                case "audio":
                    addAudioToPrevItem(itemIndex);
                    break;
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
            updateNumQuestion();
        }

        // cleanup code
        $('#editPromptId').val('');
        $('#createPrompt').text('Create Prompt');
        $('#cancelPromptEdit').hide();
        $('.createItemError').slideToggle('slow',function() { $(this).alert('close')});
        $('#newPrompt').collapse('hide');
        setTimeout(formCallback($this), 150);
        event.preventDefault();
        //location.reload();
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
            var text = "WARNING: Choosing new prompt type will clear all the options/keys/values.. associate with current prompt type\n Proceed ?"
            changeConfirm = confirm(text);
        } else {
            //var text = "Empty! YO"
            //changeConfirm = confirm(text);
        }

        if (changeConfirm) {
            //$('#addedPrompt').val(""); // clear text box 
            var prevValue = jQuery("#choosePromptType").val();  
            showNewModal(prevValue);
        } else {
            $this.val(prevValue);
            prevValue = $this.val();
        }

        //$this.val(0);
    });
    
});
