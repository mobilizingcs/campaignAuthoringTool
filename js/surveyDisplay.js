
//jQuery.noConflict();

/*
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
*/
function addSurveyToPage(index) {
    var survey = campaignWrapper['campaign']['surveys']['survey'][index];
    
    var uniqueID = Math.floor( Math.random()*99999 );
    var target = uniqueid();
    var target2 = uniqueid();
    var description = survey['description'] ? survey['description'] : ""
    var introText = survey['introText'] ? survey['introText'] : ""
    var newItem = '<li class="surveyItem hide ">' +
        '<button type="button" class="btn btn-link pull-right deleteSurvey"><i class="icon-trash icon-black"></i><small> Delete</small></button>' +
        '<button type="button" class="btn btn-link pull-right editPrompts"><i class="icon-edit icon-black"></i><small> Edit Survey Items</small></button>' +
        //'<button type="button" class="btn btn-link pull-right editSurvey"><i class="icon-pencil icon-black"></i> Edit Survey</button>' +
        '<button type="button" class="btn btn-link pull-right editSurvey" data-toggle="collapse" data-target="#edit' + target + '"><i class="icon-pencil icon-black"></i> <small>Edit Survey Info</small></button>' +

        

        //'<i class="icon-pencil help-hover" data-original-title="Click to edit survey details" rel="tooltip" data-placement="right" data-toggle="collapse" data-target="#edit' + target + '"></i>' + Edit Survey +  
        '<i class="icon-list-alt"></i> <button type="button" class="btn btn-link help-hover viewSurvey" data-original-title="Click to view survey details" rel="tooltip" data-placement="top" data-toggle="collapse" data-target="#' + target + '"><u><strong class="detailsID">' + survey['id'] + '</strong></u></button><br>' + 
        
        // survey details
        '<div class="collapse-group1">' + 
            '<div id="' + target + '" class="collapse surveyDetails out">'+
                '<div class="accordion-inner">'+
                    '<p class="viewDetailsID">ID: ' + survey['id'] + '</p>' + 
                    '<p class="viewDetailsTitle">Title: ' + survey['title'] + '</p>' + 
                    '<p class="viewDetailsDesc">Description: ' + description + '</p>' + 
                    '<p class="viewDetailsIntroText">Introduction Text: ' + introText + '</p>' + 
                    '<p class="viewDetailsSubmitText">Submit Text: ' + survey['submitText'] + '</p>' +
                    '<p class="viewDetailsAnytime">Anytime: ' + survey['anytime'] + '</p>' +
                '</div>' +
            '</div>'+
        '</div>'+

            // survey edit
        '<div class="collapse-group2">' + 
            '<div id="edit' + target + '" class="collapse surveyEdit group1">'+
                '<hr>' + 
                '<div class="accordion-inner editSurveyDetails">'+
                    '<div class="control-group">' +
                        '<label class="control-label" for="surveyId">Survey Id: <span class="red">*</span></label>'+
                        //'<div class="controls">' +
                            '<input class="span3" type="text" id="surveyId" />' +
                            '<i class="help-icon icon-question-sign" data-original-title="A unique identifier for this survey." rel="tooltip" data-placement="right"></i>' +
                        //'</div>' +
                    '</div>' +

                    '<div class="control-group">' +
                        '<label class="control-label" for="surveyTitle">Title: <span class="red">*</span></label>' +
                        //'<div class="controls">' +
                            '<input class="span3" type="text" id="surveyTitle" />'+
                            '<i class="help-icon icon-question-sign" data-original-title="A name for the survey to be displayed to the user." rel="tooltip" data-placement="right"></i>' +
                        //'</div>' +
                    '</div>' +

                    '<div class="descriptionInput">' +
                        '<div class="control-group">' +
                            '<label class="control-label" for="surveyDescription">Description: </label>' +
                            //'<div class="controls">' +
                                '<textarea id="surveyDescription" class="span3" placeholder="Enter the description of your survey here..."></textarea>' +
                                '<i class="help-icon icon-question-sign" data-original-title="A user-friendly description of the survey." rel="tooltip" data-placement="right"></i>' +
                            //'</div>' +
                        '</div>' +
                    '</div>' +

                    '<div class="introTextInput">' +
                        '<div class="control-group">' +
                            '<label class="control-label" for="surveyIntroText">Introduction Text: </label>' +
                            //'<div class="controls">' +
                                '<textarea id="surveyIntroText" class="span3" placeholder="Text to display to the user before they begin the survey..."></textarea>' +
                                '<i class="help-icon icon-question-sign" data-original-title="The text to be displayed when a survey is started." rel="tooltip" data-placement="right"></i>' +
                            //'</div>' +
                        '</div>' +
                    '</div>' +

                    '<div class="control-group">' +
                        '<label class="control-label" for="surveySubmitText">Submit Text: <span class="red">*</span></label>' +
                        //'<div class="controls">' +
                            '<textarea class="span3" id="surveySubmitText" placeholder="Text to display to a user upon survey completion..."></textarea>' +
                            '<i class="help-icon icon-question-sign" data-original-title="The text to be displayed on the submit screen once a survey has been completed." rel="tooltip" data-placement="right"></i>' +
                        //'</div>' +
                    '</div>' +     

                    '<div class="control-group">' +
                        '<label class="control-label" for="surveyAnytime">Anytime</label>' +
                        //'<div class="controls">' +
                            
                            //'<label class="checkbox">' +
                            '<input type="checkbox" id="surveyAnytime" value="">' +
                                
                            //'</label>' +
                            'Can the survey be taken at anytime? ' +
                            '<i class="help-icon icon-question-sign" data-original-title="A boolean value indicating whether or not the survey may be taken at any time. If false, the survey may only be taken when a trigger has fired indicating that the user may now take the survey." rel="tooltip" data-placement="right"></i>' +
                        //'</div>' +
                    '</div>' +                          
                    '<div class="control-group">' +
                        '<div class="controls">' +
                            '<input type="hidden" class="dirtyFlag" value="0">' + 
                            '<button type="button" class="btn save">Save</button>' +
                            '<button type="button" class="btn cancel">Cancel</button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>'+
        '</div>'+

        
        + '</li>';
    $('#existingSurveysSortable').children().eq(index).remove();
    if (index != 0) {   
        $(newItem).insertAfter($('#existingSurveysSortable').children().eq(index - 1)).slideToggle().removeClass('hide');
    } else {
        $(newItem).prependTo('#existingSurveysSortable').slideToggle().removeClass('hide');
    }
    return true;
};

