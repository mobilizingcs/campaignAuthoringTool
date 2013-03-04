function addMessageToPrevItems(index) {
    var message = campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][index]['message'];
    var newItem = '<li class="previousItem hide">' +
        '<button type="button" class="btn btn-danger pull-right deleteItem"><i class="icon-trash icon-white"></i> Delete</button>' +
        '<button type="button" class="btn btn-primary pull-right editItem"><i class="icon-pencil icon-white"></i> Edit</button>' +
        '<i class="icon-comment"></i> <strong>Message (ID:' + message['id'] +')</strong><br><p>' + 
        message['messageText'] + '</p>' + '</li>';
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
    var newItem = '<li class="previousItem hide">' +
        '<button type="button" class="btn btn-danger pull-right deleteItem"><i class="icon-trash icon-white"></i> Delete</button>' +
        '<button type="button" class="btn btn-primary pull-right editItem"><i class="icon-pencil icon-white"></i> Edit</button>' +
        '<i class="icon-stop"></i> <strong>Multi-Choice</strong><br><p>' + prompt['promptText'] + '</p>' + '</li>';
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
    var min = prompt['properties']['property'][0]['label'];
    var max = prompt['properties']['property'][1]['label'];
    var newItem = '<li class="previousItem hide">' +
        '<button type="button" class="btn btn-danger pull-right deleteItem"><i class="icon-trash icon-white"></i> Delete</button>' +
        '<button type="button" class="btn btn-primary pull-right editItem"><i class="icon-pencil icon-white"></i> Edit</button>' +
        '<strong><em>(123)</em> Number</strong><br><p>' + prompt['promptText'] + '</p>' + 
        '<p><strong>Range: </strong>' + min + ' - ' + max + '</p></li>';
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
    var maxRes = prompt['properties']['property'][0]['label']
    var newItem = '<li class="previousItem hide">' +
        '<button type="button" class="btn btn-danger pull-right deleteItem"><i class="icon-trash icon-white"></i> Delete</button>' +
        '<button type="button" class="btn btn-primary pull-right editItem"><i class="icon-pencil icon-white"></i> Edit</button>' +
        '<i class="icon-camera"></i> <strong>Photo</strong><br><br><p>' + prompt['promptText'] + '</p>' +
        '<p><strong>Maximum Vertical Resolution: </strong>' + maxRes + '</p></li>';
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
    var newItem = '<li class="previousItem hide">' +
        '<button type="button" class="btn btn-danger pull-right deleteItem"><i class="icon-trash icon-white"></i> Delete</button>' +
        '<button type="button" class="btn btn-primary pull-right editItem"><i class="icon-pencil icon-white"></i> Edit</button>' +
        '<i class="icon-user"></i> <strong>Remote Activity</strong><br><p>' + prompt['promptText'] + '</p>' +
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
    var newItem = '<li class="previousItem hide">' +
        '<button type="button" class="btn btn-danger pull-right deleteItem"><i class="icon-trash icon-white"></i> Delete</button>' +
        '<button type="button" class="btn btn-primary pull-right editItem"><i class="icon-pencil icon-white"></i> Edit</button>' +
        '<i class="icon-ok-circle"></i> <strong>Single Choice</strong><br><p>' + prompt['promptText'] + '</p>' +
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
    var min = prompt['properties']['property'][0]['label']
    var max = prompt['properties']['property'][1]['label']

    var newItem = '<li class="previousItem hide">' +
        '<button type="button" class="btn btn-danger pull-right deleteItem"><i class="icon-trash icon-white"></i> Delete</button>' +
        '<button type="button" class="btn btn-primary pull-right editItem"><i class="icon-pencil icon-white"></i> Edit</button>' +
        '<i class="icon-font"></i> <strong>Text</strong><br><p>' + prompt['promptText'] + '</p>' +
        '<p><strong>Character Count Range: </strong>' + min + ' - ' + max + '</p></li>';
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
    var newItem = '<li class="previousItem hide">' +
        '<button type="button" class="btn btn-danger pull-right deleteItem"><i class="icon-trash icon-white"></i> Delete</button>' +
        '<button type="button" class="btn btn-primary pull-right editItem"><i class="icon-pencil icon-white"></i> Edit</button>' +
        '<i class="icon-time"></i> <strong>Timestamp</strong><br><p>' + prompt['promptText'] + '</p>' +
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
    var maxLength = prompt['properties']['property'][0]['label']
    var newItem = '<li class="previousItem hide">' +
        '<button type="button" class="btn btn-danger pull-right deleteItem"><i class="icon-trash icon-white"></i> Delete</button>' +
        '<button type="button" class="btn btn-primary pull-right editItem"><i class="icon-pencil icon-white"></i> Edit</button>' +
        '<i class="icon-facetime-video"></i> <strong>Video</strong><br><br><p>' + prompt['promptText'] + '</p>' +
        '<p><strong>Maximum Video Length: </strong>' + maxLength + '</p></li>';
    $('#previousItemsSortable').children().eq(index).remove();
    if (index != 0) {
        $(newItem).insertAfter($('#previousItemsSortable').children().eq(index - 1)).slideToggle().removeClass('hide');
    } else {
        $(newItem).prependTo('#previousItemsSortable').slideToggle().removeClass('hide');
    }
    return true;
};