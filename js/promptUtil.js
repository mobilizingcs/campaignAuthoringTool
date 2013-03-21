/***
    A collection of utility function for the prompt page
***/

/*
    Delete a prompt from the previous prompt section. Called when click "delete" in the previous prompt section
*/
function deletePrompt(curr_index) {
    promptXMLArray.splice(curr_index, 1);
    update();
}

/*
    Swap 2 prompt in the prompt array, also swap in the type array. Called when changing position of prompt
    in previous prompt section
    Input:
        - promptArr: the prompt array
        - typeArr: prompt type array
        - index_a, index_b: 2 index for swapping
*/
function swapArrayElem(promptArr, typeArr, index_a, index_b) {
    // swap data
    var tmp = promptArr[index_a];
    promptArr[index_a] = promptArr[index_b];
    promptArr[index_b] = tmp;
    
    // swap type
    tmp = typeArr[index_a];
    typeArr[index_a] = typeArr[index_b];
    typeArr[index_b] = tmp;
}

/*
    This function wiil clear (reset) the form. Called after click submit/edit on the form
    credit goes to: http://www.learningjquery.com/2007/08/clearing-form-data
*/
$.fn.clearForm = function() {
  return this.each(function() {
    var type = this.type, tag = this.tagName.toLowerCase();
    if (tag == 'form')
      return $(':input',this).clearForm();
    if (type == 'text' || type == 'password' || tag == 'textarea')
      this.value = '';
    else if (type == 'checkbox' || type == 'radio')
      this.checked = false;
    else if (tag == 'select')
      this.selectedIndex = -1;
    //special cases
    $('#skipLabel').attr('disabled', 'disabled');
    $('#skipLabelLabel').html(skipLabel);
  });
};

/*
    This function wiil serialize object into JSON form
    credit goes to: stackoverflow
*/
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (this.name != 'condType') {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        }
    });
    return o;
};

/*
    Delete all the editId from the local storage
*/
function deleteEditField(contentList) {
    for (var i = 0; i < contentList.length; i++) {
        var item = contentList[i];
        if (item['message']) {
            delete item['message'].editId;
        } else if (item['prompt']) {
            delete item['prompt'].editId;
        } else {
            delete item['repeatableSet'].editId;
        }
    }
}

/*
    Check if n is a  positive number
*/
function isPositiveNumber(n) {
  //return !isNaN(parseFloat(n)) && isFinite(n);
  var RE = /^\d*$/;
  return RE.test(n);
}

/*
    Check if n is a number
*/
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

/*
    Saves the form to be cleared (after a setTimeout delay)
*/
function formCallback(form){
    return function() {
        form.clearForm();
    }
}

// Removes the survey item from the previous items list
function deleteItemCallback(item) {
    return function() {
        item.remove();
    }
}

function surveyItemError(text) {
    var errorAlert = '<div class="alert alert-error createItemError hide"><button class="close">&times;</button><strong>Error:</strong> ' + text + '</div>';
    $(errorAlert).prependTo('.addNewItem').slideToggle();
    if($('.createItemError').size() > 1) {
        $('.createItemError').slice(1).delay('1000').slideToggle('slow',function() { $(this).alert('close')});
    }
}

function addProperties(input, promptType) {
    text = input['properties'];
    var properties = {'property':[]};
    if (promptType == "multi_choice" || promptType == "multi_choice_custom"
        || promptType == "single_choice" || promptType == "single_choice_custom") {
        propertiesText = text.replace("\r\n", "\n").split("\n");
        lenText = propertiesText.length;
        console.log(lenText);
        for (i = 0; i < lenText; i++)
        {
            property = {};
            temp = propertiesText[i].split(":");
            if (temp[0] != '') {
                key = i 
                label = temp[0].replace("\r", "");
                value = temp[1].replace("\r", "");
                
                property['key'] = key;
                property['label'] = label;
                property['value'] = value;
                properties['property'].push(property);
            }
        }
        return properties;
    }
    else if (promptType == "number") {
        propertiesText = text.split("\n");
        for (i = 0; i < 2; i++)
        {
            property = {};
            temp = propertiesText[i].split(":");
            key = temp[0].replace("\r", "");
            label = temp[1].replace("\r", "");
            
            property['key'] = key;
            property['label'] = label;
            properties['property'].push(property);
        }
        return properties;
    }
    else if (promptType == "photo") {
        propertiesText = text.split("\n");
        temp = propertiesText[0].split(":");
        key = temp[1];
        property = {};
        property['key'] = 'maxDimension';
        property['label'] = key;
        properties['property'].push(property);
        return properties;
    }
    else if (promptType == "remote_activity") {
        propertiesText = text.split("\n");
        lenText = propertiesText.length;
        for (i = 0; i < lenText; i++)
        {
            property = {};
            temp = propertiesText[i].split(":");
            if (temp[0] != "") {
                key = temp[0].toLowerCase();
                label = temp[1].replace("\r", "");;
     
                property['key'] = key;
                property['label'] = label;
                properties['property'].push(property);
            }
        }
        return properties;
    }
    else if (promptType == "text") {
        propertiesText = text.split("\n");
        for (i = 0; i < 2; i++)
        {
            property = {};
            temp = propertiesText[i].split(":");
            key = temp[0].replace("\r", "");
            label = temp[1].replace("\r", "");
            
            property['key'] = key;
            property['label'] = label;
            properties['property'].push(property);
        }
        return properties;
    }
    else if (promptType == "timestamp") {
        // doing nothing
        return properties;
    }
    else if (promptType == "video") {
        propertiesText = text.split("\n");
        temp = propertiesText[0].split(":");
        key = temp[1];
        property = {};
        property['key'] = 'max_seconds';
        property['label'] = key;
        properties['property'].push(property);
        return properties;
    }
    else {
        // invalid
        return properties;
    }
}
