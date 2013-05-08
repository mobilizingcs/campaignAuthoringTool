function addMessageToPrevItems(index) {
    var message = campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][index]['message'];
    var condition;
    if (!message['condition']) condition = "None";
    else condition = message['condition'];
    var target = message['id'] + 'Details';
    var newItem = '<li class="previousItem hide">' +
        '<button type="button" class="btn btn-danger pull-right deleteItem"><i class="icon-trash icon-white"></i> Delete</button>' +
        '<button type="button" class="btn btn-primary pull-right editItem"><i class="icon-pencil icon-white"></i> Edit</button>' +
        '<i class="icon-comment help-hover" data-original-title="Message" rel="tooltip" data-placement="right"></i> <strong>' + message['id'] + '</strong><br>' + 
         
        '<div class="accordion-group">' +
            '<div class="accordion-heading textLink">' +
                '<a class="accordion-toggle textLink" data-toggle="collapse" href="#' + target + '">'+
                    'More details'+
                '</a>'+
            '</div>'+
            '<div id="' + target + '" class="accordion-body collapse">'+
                '<div class="accordion-inner">'+
                    
                 '<p>-Message: ' + message['messageText'] + '</p>' +  
                 '<p>-Condition:' + condition + '</p>' +  
                '</div>'+
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
    var newItem = '<li class="previousItem hide">' +
        '<button type="button" class="btn btn-danger pull-right deleteItem"><i class="icon-trash icon-white"></i> Delete</button>' +
        '<button type="button" class="btn btn-primary pull-right editItem"><i class="icon-pencil icon-white"></i> Edit</button>' +
        '<i class="icon-stop help-hover" data-original-title="Multiple Choice" rel="tooltip" data-placement="right"></i> <strong>' + prompt['id'] + '</strong><br>'+
        '<div class="accordion-group">' +
            '<div class="accordion-heading textLink">' +
                '<a class="accordion-toggle textLink" data-toggle="collapse" href="#' + target + '">'+
                    'More details'+
                '</a>'+
            '</div>'+
            '<div id="' + target + '" class="accordion-body collapse">'+
                '<div class="accordion-inner">'+
                    
                '<p><span class="detailLabel">Prompt Text: </span>' + prompt['promptText'] + '</p>' + 
                '<p><span class="detailLabel">Display Label: </span>' + prompt['displayLabel'] + '</p>' + 
                '<p><span class="detailLabel">Prompt options: </span></p>' +
                '<span class="detailList">' + propertiesText + '</span>' +
                '<p><span class="detailLabel">Default: </span>' + defaultValue + '</p>' + 
                '<p><span class="detailLabel">Condition: </span>' + condition + '</p>' + 
                '<p><span class="detailLabel">Skippable: </span>' + prompt['skippable'] + '</p>' +
                '<p><span class="detailLabel">Skip Label: </span>' + skipLabel + '</p>' +
                '</div>'+
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
    var newItem = '<li class="previousItem hide">' +
        '<button type="button" class="btn btn-danger pull-right deleteItem"><i class="icon-trash icon-white"></i> Delete</button>' +
        '<button type="button" class="btn btn-primary pull-right editItem"><i class="icon-pencil icon-white"></i> Edit</button>' +
        '<i class="icon-stop help-hover" data-original-title="Number" rel="tooltip" data-placement="right"></i> <strong>' + prompt['id'] + '</strong><br>' +
        '<div class="accordion-group">' +
            '<div class="accordion-heading textLink">' +
                '<a class="accordion-toggle textLink" data-toggle="collapse" href="#' + target + '">'+
                    'More details'+
                '</a>'+
            '</div>'+
            '<div id="' + target + '" class="accordion-body collapse">'+
                '<div class="accordion-inner">'+
                    
                '<p><span class="detailLabel">Prompt Text: </span>' + prompt['promptText'] + '</p>' + 
                '<p><span class="detailLabel">Display Label: </span>' + prompt['displayLabel'] + '</p>' + 
                '<p><span class="detailLabel">Prompt options: </span></p>' +
                '<span class="detailList">' + propertiesText + '</span>' +
                '<p><span class="detailLabel">Default: </span>' + defaultValue + '</p>' + 
                '<p><span class="detailLabel">Condition: </span>' + condition + '</p>' + 
                '<p><span class="detailLabel">Skippable: </span>' + prompt['skippable'] + '</p>' +
                '<p><span class="detailLabel">Skip Label: </span>' + skipLabel + '</p>' +
                '</div>'+
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
    var newItem = '<li class="previousItem hide">' +
        '<button type="button" class="btn btn-danger pull-right deleteItem"><i class="icon-trash icon-white"></i> Delete</button>' +
        '<button type="button" class="btn btn-primary pull-right editItem"><i class="icon-pencil icon-white"></i> Edit</button>' +
        '<i class="icon-camera help-hover" data-original-title="Photo" rel="tooltip" data-placement="right"></i> <strong>' + prompt['id'] + '</strong><br>' +
        '<div class="accordion-group">' +
            '<div class="accordion-heading textLink">' +
                '<a class="accordion-toggle textLink" data-toggle="collapse" href="#' + target + '">'+
                    'More details'+
                '</a>'+
            '</div>'+
            '<div id="' + target + '" class="accordion-body collapse">'+
                '<div class="accordion-inner">'+
                    
                '<p><span class="detailLabel">Prompt Text: </span>' + prompt['promptText'] + '</p>' + 
                '<p><span class="detailLabel">Display Label: </span>' + prompt['displayLabel'] + '</p>' + 
                '<p><span class="detailLabel">Prompt options: </span></p>' +
                '<span class="detailList">' + propertiesText + '</span>' +
                '<p><span class="detailLabel">Default: </span>' + defaultValue + '</p>' + 
                '<p><span class="detailLabel">Condition: </span>' + condition + '</p>' + 
                '<p><span class="detailLabel">Skippable: </span>' + prompt['skippable'] + '</p>' +
                '<p><span class="detailLabel">Skip Label: </span>' + skipLabel + '</p>' +
                '</div>'+
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
    var newItem = '<li class="previousItem hide">' +
        '<button type="button" class="btn btn-danger pull-right deleteItem"><i class="icon-trash icon-white"></i> Delete</button>' +
        '<button type="button" class="btn btn-primary pull-right editItem"><i class="icon-pencil icon-white"></i> Edit</button>' +
        '<i class="icon-user help-hover" data-original-title="Remote Activity" rel="tooltip" data-placement="right"></i> <strong>' + prompt['id'] + '</strong><br>' +
        '<div class="accordion-group">' +
            '<div class="accordion-heading textLink">' +
                '<a class="accordion-toggle textLink" data-toggle="collapse" href="#' + target + '">'+
                    'More details'+
                '</a>'+
            '</div>'+
            '<div id="' + target + '" class="accordion-body collapse">'+
                '<div class="accordion-inner">'+
                    
                '<p><span class="detailLabel">Prompt Text: </span>' + prompt['promptText'] + '</p>' + 
                '<p><span class="detailLabel">Display Label: </span>' + prompt['displayLabel'] + '</p>' + 
                '<p><span class="detailLabel">Prompt options: </span></p>' +
                '<span class="detailList">' + propertiesText + '</span>' +
                '<p><span class="detailLabel">Default: </span>' + defaultValue + '</p>' + 
                '<p><span class="detailLabel">Condition: </span>' + condition + '</p>' + 
                '<p><span class="detailLabel">Skippable: </span>' + prompt['skippable'] + '</p>' +
                '<p><span class="detailLabel">Skip Label: </span>' + skipLabel + '</p>' +
                '</div>'+
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
    var newItem = '<li class="previousItem hide">' +
        '<button type="button" class="btn btn-danger pull-right deleteItem"><i class="icon-trash icon-white"></i> Delete</button>' +
        '<button type="button" class="btn btn-primary pull-right editItem"><i class="icon-pencil icon-white"></i> Edit</button>' +
        '<i class="icon-ok-circle help-hover" data-original-title="Single Choice" rel="tooltip" data-placement="right"></i> <strong>' + prompt['id'] + '</strong><br>' +
        '<div class="accordion-group">' +
            '<div class="accordion-heading textLink">' +
                '<a class="accordion-toggle textLink" data-toggle="collapse" href="#' + target + '">'+
                    'More details'+
                '</a>'+
            '</div>'+
            '<div id="' + target + '" class="accordion-body collapse">'+
                '<div class="accordion-inner">'+
                    
                '<p><span class="detailLabel">Prompt Text: </span>' + prompt['promptText'] + '</p>' + 
                '<p><span class="detailLabel">Display Label: </span>' + prompt['displayLabel'] + '</p>' + 
                '<p><span class="detailLabel">Prompt options: </span></p>' +
                '<span class="detailList">' + propertiesText + '</span>' +
                '<p><span class="detailLabel">Default: </span>' + defaultValue + '</p>' + 
                '<p><span class="detailLabel">Condition: </span>' + condition + '</p>' + 
                '<p><span class="detailLabel">Skippable: </span>' + prompt['skippable'] + '</p>' +
                '<p><span class="detailLabel">Skip Label: </span>' + skipLabel + '</p>' +
                '</div>'+
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

    var newItem = '<li class="previousItem hide">' +
        '<button type="button" class="btn btn-danger pull-right deleteItem"><i class="icon-trash icon-white"></i> Delete</button>' +
        '<button type="button" class="btn btn-primary pull-right editItem"><i class="icon-pencil icon-white"></i> Edit</button>' +
        '<i class="icon-font help-hover" data-original-title="Text" rel="tooltip" data-placement="right"></i> <strong>' + prompt['id'] + '</strong><br>' +
        '<div class="accordion-group">' +
            '<div class="accordion-heading textLink">' +
                '<a class="accordion-toggle textLink" data-toggle="collapse" href="#' + target + '">'+
                    'More details'+
                '</a>'+
            '</div>'+
            '<div id="' + target + '" class="accordion-body collapse">'+
                '<div class="accordion-inner">'+
                    
                '<p><span class="detailLabel">Prompt Text: </span>' + prompt['promptText'] + '</p>' + 
                '<p><span class="detailLabel">Display Label: </span>' + prompt['displayLabel'] + '</p>' + 
                '<p><span class="detailLabel">Prompt options: </span></p>' +
                '<span class="detailList">' + propertiesText + '</span>' +
                '<p><span class="detailLabel">Default: </span>' + defaultValue + '</p>' + 
                '<p><span class="detailLabel">Condition: </span>' + condition + '</p>' + 
                '<p><span class="detailLabel">Skippable: </span>' + prompt['skippable'] + '</p>' +
                '<p><span class="detailLabel">Skip Label: </span>' + skipLabel + '</p>' +
                '</div>'+
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
    var newItem = '<li class="previousItem hide">' +
        '<button type="button" class="btn btn-danger pull-right deleteItem"><i class="icon-trash icon-white"></i> Delete</button>' +
        '<button type="button" class="btn btn-primary pull-right editItem"><i class="icon-pencil icon-white"></i> Edit</button>' +
        '<i class="icon-time help-hover" data-original-title="Timestamp" rel="tooltip" data-placement="right"></i> <strong>' + prompt['id'] + '</strong><br>' +
        '<div class="accordion-group">' +
            '<div class="accordion-heading textLink">' +
                '<a class="accordion-toggle textLink" data-toggle="collapse" href="#' + target + '">'+
                    'More details'+
                '</a>'+
            '</div>'+
            '<div id="' + target + '" class="accordion-body collapse">'+
                '<div class="accordion-inner">'+
                    
                '<p><span class="detailLabel">Prompt Text: </span>' + prompt['promptText'] + '</p>' + 
                '<p><span class="detailLabel">Display Label: </span>' + prompt['displayLabel'] + '</p>' + 
                '<p><span class="detailLabel">Condition: </span>' + condition + '</p>' + 
                '<p><span class="detailLabel">Skippable: </span>' + prompt['skippable'] + '</p>' +
                '<p><span class="detailLabel">Skip Label: </span>' + skipLabel + '</p>' +
                '</div>'+
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
    var newItem = '<li class="previousItem hide">' +
        '<button type="button" class="btn btn-danger pull-right deleteItem"><i class="icon-trash icon-white"></i> Delete</button>' +
        '<button type="button" class="btn btn-primary pull-right editItem"><i class="icon-pencil icon-white"></i> Edit</button>' +
        '<i class="icon-facetime-video help-hover" data-original-title="Video" rel="tooltip" data-placement="right"></i> <strong>' + prompt['id'] + '</strong><br>' +
        '<div class="accordion-group">' +
            '<div class="accordion-heading textLink">' +
                '<a class="accordion-toggle textLink" data-toggle="collapse" href="#' + target + '">'+
                    'More details'+
                '</a>'+
            '</div>'+
            '<div id="' + target + '" class="accordion-body collapse">'+
                '<div class="accordion-inner">'+
                    
                '<p><span class="detailLabel">Prompt Text: </span>' + prompt['promptText'] + '</p>' + 
                '<p><span class="detailLabel">Display Label: </span>' + prompt['displayLabel'] + '</p>' + 
                '<p><span class="detailLabel">Prompt options: </span></p>' +
                '<span class="detailList">' + propertiesText + '</span>' +
                '<p><span class="detailLabel">Default: </span>' + defaultValue + '</p>' + 
                '<p><span class="detailLabel">Condition: </span>' + condition + '</p>' + 
                '<p><span class="detailLabel">Skippable: </span>' + prompt['skippable'] + '</p>' +
                '<p><span class="detailLabel">Skip Label: </span>' + skipLabel + '</p>' +
                '</div>'+
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