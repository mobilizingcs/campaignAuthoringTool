var campaignWrapper = $.parseJSON(localStorage['campaignWrapper']);

var isEditing = false;

$(function() {

    function checkDirty() {
        if($('.surveyItem').find('.collapse-group2').find('.dirtyFlag').val() == 1) {
            return true;
        } 

    }
    // overide menu buttons
    $('#editCampaign').unbind('click').click(function(){
        if($('.surveyItem').find('.collapse-group2').find('.in').length > 0 && checkDirty()) {
            if (confirm('Are you sure you want to navigate away from this page? \nThere is one or more unfinished editing survey(s)')) {
                localStorage['campaignWrapper'] = JSON.stringify(campaignWrapper);
                console.log($('.surveyItem').find('.collapse-group2').find('.in').length);
                window.location.replace('campaign-edit.php');
            }
        } else {
            localStorage['campaignWrapper'] = JSON.stringify(campaignWrapper);
            //console.log($('.surveyItem').find('.collapse-group2').find('.in').length);
            window.location.replace('campaign-edit.php');
        }
    });
    // create new survey button
    $('#createNewSurvey').unbind('click').click(function() {
        if($('.surveyItem').find('.collapse-group2').find('.in').length > 0 && checkDirty()) {
            if (confirm('Are you sure you want to navigate away from this page? \nThere is one or more unfinished editing survey(s)')) {
                localStorage['campaignWrapper'] = JSON.stringify(campaignWrapper);
                console.log($('.surveyItem').find('.collapse-group2').find('.in').length);
                window.location.replace('survey.php');
            }
        } else {
            localStorage['campaignWrapper'] = JSON.stringify(campaignWrapper);
            window.location.replace('survey.php');
        }
    });

    // edit existing survey button
    $('#editExistingSurvey').unbind('click').click(function() {
        if($('.surveyItem').find('.collapse-group2').find('.in').length > 0 && checkDirty()) {
            if (confirm('Are you sure you want to navigate away from this page? \nThere is one or more unfinished editing survey(s)')) {
                localStorage['campaignWrapper'] = JSON.stringify(campaignWrapper);
                console.log($('.surveyItem').find('.collapse-group2').find('.in').length);
                window.location.replace('existing-surveys.php');
            }
        } else {
            localStorage['campaignWrapper'] = JSON.stringify(campaignWrapper);
            window.location.replace('existing-surveys.php');
        }
    });

	// save data before unload
	window.onbeforeunload = function() {
        localStorage['campaignWrapper'] = JSON.stringify(campaignWrapper);
    }

	// create survey list
    for (i in campaignWrapper['campaign']['surveys']['survey']) {
        addSurveyToPage(i);
    }

    function updateSurveyList() {
        for (i in campaignWrapper['campaign']['surveys']['survey']) {
            addSurveyToPage(i);
        }
    }

    // sort survey list
    $('#existingSurveysSortable').sortable({
        start: function(event, ui) {
            $(ui.item).data('startIndex', ui.item.index());
        },
        stop: function(event, ui) {
            campaignEditor.shiftSurveys($(ui.item).data('startIndex'), ui.item.index());
        }
    });//.disableSelection();

    // view survey click event
    $('#existingSurveysSortable').on('click', 'button.viewSurvey', function(e) {   
        $parent = $(this).parent();
        if (($parent).find('.collapse-group2').find('.in').length > 0) {
            $parent.find('.surveyEdit').collapse('hide');
        }
        
    });

    // edit prompts click event
    $('#existingSurveysSortable').on('click', 'button.editPrompts', function(e) {
        if($('.surveyItem').find('.collapse-group2').find('.in').length > 0 && checkDirty()) {
                alert('Please finish editing or cancel before closing this');
        } else {
            e.stopPropagation();
            $parent = $(this).parent();
            var index = $('#existingSurveysSortable li').index($parent);
            $.cookie('currentSurvey', index);
            window.location.replace('prompt.php');
        }
    });

    // edit survey click event
    $('#existingSurveysSortable').on('click', 'button.editSurvey', function(e) {
        if (!isEditing) {
            //isEditing = true;
            $parent = $(this).parent();
            $this = $(this);
            $this.focus();
            if (($parent).find('.collapse-group1').find('.in').length > 0) {
                $parent.find('.surveyDetails').collapse('hide');
            }
            // TODO
            // check if collapse already open
            //if (($parent).find('.in').length > 0) {
            //    alert('visible'); 
            //}
            //else alert('not visible');
            //$parent.find('.surveyDetails').collapse('toggle');

            $edit = $parent.find('.group1');

            var index = $('#existingSurveysSortable li').index($parent);
            $.cookie('currentSurvey', index);

            var survey = campaignWrapper['campaign']['surveys']['survey'][index];
        
        	//var target = 'edit' + survey['id'] + 'Details';
        	
            //alert($this.find('#' + target).find('.editSurveyDetails').html());
            //alert('ping');

    		$edit.find('.editSurveyDetails').find('#surveyId').val(survey['id']);
    		$edit.find('.editSurveyDetails').find('#surveyTitle').val(survey['title']);
    		$edit.find('.editSurveyDetails').find('#surveyDescription').val(survey['description']);
    		$edit.find('.editSurveyDetails').find('#surveyIntroText').val(survey['introText']);
    		$edit.find('.editSurveyDetails').find('#surveySubmitText').val(survey['submitText']);
    		if (survey['anytime'])
                $edit.find('.editSurveyDetails').find('#surveyAnytime').prop('checked', true);

            //var $collapse = $(this).closest('.collapse-group').find('.collapse');
        	//$/collapse.collapse('toggle');
        } else {
            e.stopPropagation(); 
            alert('Please finish editing or cancel before closing this');
        }
    });

    $('#existingSurveysSortable').on('change', 'input', function() {
        $parent = $(this).closest('.surveyItem');
        $this = $(this);

        $edit = $parent.find('.group1');
        var index = $('#existingSurveysSortable li').index($parent);
        $edit.find('.editSurveyDetails').find('.dirtyFlag').val('1');

        //alert("Flag is " + $edit.find('.editSurveyDetails').find('.dirtyFlag').val());
    });

	// edit survey click event
    $('#existingSurveysSortable').on('click', 'button.save', function() {
        $parent = $(this).closest('.surveyItem');
        $this = $(this);

        $edit = $parent.find('.group1');

        //console.log($parent);
        var index = $('#existingSurveysSortable li').index($parent);
        $.cookie('currentSurvey', index);

        var survey = campaignWrapper['campaign']['surveys']['survey'][index];
    
    	//var target = 'edit' + survey['id'] + 'Details';
    	
        //alert($this.find('#' + target).find('.editSurveyDetails').html());
        //alert('save');

        var surveyData = {};

        // Extract all form data and show error to user if present
        surveyData['id'] = $edit.find('.editSurveyDetails').find('#surveyId').val();
        surveyData['title'] = $edit.find('.editSurveyDetails').find('#surveyTitle').val();
        surveyData['description'] = false;
        // Check if field is hidden and empty, and if so, don't include it
        if ($edit.find('.editSurveyDetails').find('#surveyDescription').val()) surveyData['description'] = $edit.find('.editSurveyDetails').find('#surveyDescription').val();
        surveyData['introText'] = false;
        // Check if field is hidden and empty, and if so, don't include it
        if ($edit.find('.editSurveyDetails').find('#surveyIntroText').val()) surveyData['introText'] = $edit.find('.editSurveyDetails').find('#surveyIntroText').val();
        
        surveyData['submitText'] = $edit.find('.editSurveyDetails').find('#surveySubmitText').val();
        
        surveyData['anytime'] = $edit.find('.editSurveyDetails').find('#surveyAnytime').attr('checked') ? true : false;

        var success = campaignEditor.editSurvey(campaignWrapper['campaign'], surveyData, index);
        
        if (!success) {
        	alert('Some required field are misssing');
        	/*
            var errorAlert = '<div class="alert alert-error createSurveyError hide"><button class="close">&times;</button><strong>Error:</strong> A required field is missing!</div>';
            $(errorAlert).insertAfter('.newSurvey hr').slideToggle();
            if($('.createSurveyError').size() > 1) {
                $('.createSurveyError').slice(1).delay('1000').slideToggle('slow',function() { $(this).alert('close')});
            }
            e.preventDefault();
            */
        } else {
            //isEditing = false;
            $.cookie('currentSurvey', campaignWrapper['campaign']['surveys']['survey'].length - 1);
            localStorage['campaignWrapper'] = JSON.stringify(campaignWrapper);
            survey = campaignWrapper['campaign']['surveys']['survey'][index];

            // update view details Info
            var description = survey['description'] ? survey['description'] : ""
            var introText = survey['introText'] ? survey['introText'] : ""
            $parent.find('.detailsID').html(survey['id']);
            $parent.find('.viewDetailsID').html('<strong>ID: </strong>' + survey['id']);
            $parent.find('.viewDetailsTitle').html('<strong>Title: </strong>' + survey['title']);
            $parent.find('.viewDetailsDesc').html('<strong>Description: </strong>' + description);
            $parent.find('.viewDetailsIntroText').html('<strong>Introduction Text: </strong>' + introText);
            $parent.find('.viewDetailsSubmitText').html('<strong>Submit Text: </strong>' + survey['submitText']);
            $parent.find('.viewDetailsAnytime').html('<strong>Anytime: </strong>' + survey['anytime']);
            $parent.find('.group1').collapse('hide');
            $parent.find('.surveyDetails').collapse('show');
            

            //$collapse.collapse('toggle');
            //$('.createItemError').slideToggle('slow',function() { $(this).alert('close')});
            //$('#newMessage').collapse('hide');
            //setTimeout(updateSurveyList, 150);
            //location.reload();

            // reset dirty flag
            $edit.find('.editSurveyDetails').find('.dirtyFlag').val('0');
            //if ($edit.find('.editSurveyDetails').find('.dirtyFlag').val() == 0)
            //    alert("Flag is " + $edit.find('.editSurveyDetails').find('.dirtyFlag').val());            

        }
        //var $collapse = $(this).closest('.collapse-group').find('.collapse');
    	//$collapse.collapse('toggle');

        // change attribute
        //var target = 'edit' + survey['id'] + 'Details';
        //$parent.find('.editSurvey').attr('data-target','#' + target);
        //$parent.find('.group1').attr('id', target);

        
    	//$(this).closest('.collapse').collapse('toggle');
    });

    // cancel edit survey click event
    $('#existingSurveysSortable').on('click', 'button.cancel', function() {
        if (confirm('Are you sure ? All unsaved data will be lost')) {
            //isEditing = false;
            //location.reload();
            $parent.find('.group1').collapse('hide');
            $parent.find('.surveyDetails').collapse('show');
        }
    });

    // delete survey click event
    // Removes the survey item from the previous items list
	function deleteItemCallback(item) {
	    return function() {
	        item.remove();
	    }
	}
    $('#existingSurveysSortable').on('click', 'button.deleteSurvey', function() {
        $parent = $(this).parent();
        var index = $('#existingSurveysSortable li').index($parent);

        if(isEditing) {
            alert('Please finish editing or cancel before closing this');
        } else {
            if (confirm("Are you sure you want to delete survey '" + campaignWrapper['campaign']['surveys']['survey'][index]['id'] + "'")) {
            	$parent.slideUp('fast');
            	setTimeout(deleteItemCallback($parent), 200);
            	campaignEditor.deleteSurvey(index);
            }
        }
    });
});

