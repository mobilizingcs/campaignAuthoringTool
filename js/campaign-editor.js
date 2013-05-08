var campaignEditor = {

    /*
    Creates and sets up new campaign object.
    INPUT: Campaign metadata
    OUTPUT: New campaign object
    */
    createCampaign: function(title, urn, version) {
        if (typeof(version) === 'undefined') {
            version = 1;
        }

        if (!title || !urn) {
            return false;
        }

        var author = $.cookie('username');
        var campaign = {};

        //campaign['campaignUrn'] = campaignEditor.generateCampaignURN(title, author, version);
        campaign['campaignUrn'] = urn;
        campaign['campaignName'] = title;
        campaign['surveys'] = {'survey': []};

        return campaign;
    },

    /*
    Adds a survey to the given campaign object.
    INPUT: Campaign object, survey metadata
    OUTPUT: True if the addition succeeded, false otherwise
    */
    addSurvey: function(campaign, surveyData) {
        // Check if all required components are present
        if (!campaign || !surveyData['id'] || !surveyData['title'] || !surveyData['submitText'] ||
            (surveyData['showSummary'] && !surveyData['summaryText']) || 
            (typeof(surveyData['anytime']) === 'undefined')) {
            return false;
        }

        var survey = {};
           
        //survey['id'] = surveyData['title'].replace(/\s/g, '');    // ID is equivalent to title sans whitespace
        survey['id'] = surveyData['id'];
        survey['title'] = surveyData['title'];
        if (surveyData['description']) survey['description'] = surveyData['description'];
        if (surveyData['introText']) survey['introText'] = surveyData['introText'];
        survey['submitText'] = surveyData['submitText'];
        if (surveyData['showSummary']) {
            survey['summaryText'] = surveyData['summaryText'];
            survey['editSummary'] = surveyData['editSummary'];
        }
        survey['anytime'] = surveyData['anytime'];
        survey['contentList'] = {'': []}
        campaign['surveys']['survey'].push(survey);


        return true;
    },

    /*
    Adds a message to the given survey of the given campaign.
    INPUT: Campaign object, the index of the survey within that campaign, and messageData
        messageData can contain the following keys:
            messageText,
            condition
    OUTPUT: Index of added item, false otherwise
    */
    addMessage: function(messageData, index) {
        // Check if all required components are present
        if (!messageData['messageText'] || !messageData['id']) {
            return false;
        }
        var savedId;
        var contentList = campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''];
        if (typeof(index) === "undefined") {
            index = contentList.length;
        } else {
            // We need to save the ID in case another condition references this item
            savedId = contentList[index]['message']['editId'];
            
            // savedId = contentList[index]['message']['id'];
            contentList.splice(index, 1);
        }
        var message = {};

        message['id'] = messageData['id'];
        message['messageText'] = messageData['messageText'];
        
        if (messageData['messageCondition']) message['condition'] = messageData['messageCondition'];
        
        message['editId'] =  typeof(savedId) === "undefined" ? campaignEditor.maxItemIndex(contentList) + 1 : savedId;
        //message['editId'] = typeof(saveId) === "undefined" ? campaignEditor.maxItemIndex(contentList) + 1 : savedId;
        contentList.splice(index, 0, {'message': message});

        return index;
    },


    //TODO: TURN PARAMETERS INTO AN OBJECT INSTEAD...
    /*
    Adds a prompt to the given survey of the given campaign.
    INPUT: Campaign object, the index of the survey within that campaign, prompt metadata
    OUTPUT: Index of added item, false otherwise
    */
    addPrompt: function(
        campaign,
        surveyIndex,
        id,
        displayLabel,
        displayType,
        promptText,
        abbrText,
        promptType,
        defaultValue,
        condition,
        skippable,
        skipLabel,
        properties, 
        index
        ) {

        var showSummary = campaign['surveys']['survey'][surveyIndex]['showSummary'];
        // Check if all required components are present
        if (!campaign || !surveyIndex || !id || !displayLabel ||
            !promptText || !promptType ||
            (skippable && !skipLabel) || !properties) {
            return false;
        }

        var savedId;
        var contentList = campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''];
        if (typeof(index) === "undefined") {
            index = contentList.length;
        } else {
            // We need to save the ID in case another condition references this item
            savedId = contentList[index]['prompt']['editId'];
            console.log(savedId);
            contentList.splice(index, 1);
        }

        var promptItem = {};

        promptItem['id'] = id;
        promptItem['displayLabel'] = displayLabel;
        promptItem['promptText'] = promptText;
        promptItem['promptType'] = promptType;

        if (defaultValue!=null && defaultValue!="") {
            promptItem['default'] = defaultValue;
        }

        if (condition) promptItem['condition'] = condition;
        promptItem['skippable'] = skippable
        if (skippable) {
            if (skipLabel) promptItem['skipLabel'] = skipLabel;
        }
        promptItem['properties'] = properties;

        promptItem['editId'] = typeof(savedId) === "undefined" ? campaignEditor.maxItemIndex(contentList) + 1 : savedId;
        contentList.splice(index, 0, {'prompt': promptItem});
        //console.log(contentList);
        //console.log(index);
        return index;

    },

    deleteItem: function(index) {
        campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''].splice(index, 1);
    },

    /*
    Adds a repeatable set to the given survey of the given campaign.
    INPUT: Campaign object, the index of the survey within that campaign, repeatable set metadata
    OUTPUT: True if the addition succeeded, false otherwise
    */
    addRepeatableSet: function(
        campaign,
        surveyIndex,
        termQuestion,
        termTrueLabel,
        termFalseLabel,
        termSkipEnabled,
        termSkipLabel,
        condition
        ) {

        // Check if all required components are present
        if (!campaign || !surveyIndex || !termQuestion || !termTrueLabel ||
            !termFalseLabel || (termSkipEnabled && !termSkipLabel)) {
            return false;
        }

        var repeatableSet = {'prompts': {'prompt': []}};

        repeatableSet['terminationQuestion'] = termQuestion;
        repeatableSet['terminationTrueLabel'] = termTrueLabel;
        repeatableSet['terminationFalseLabel'] = termFalseLabel;
        repeatableSet['terminationSkipEnabled'] = termSkipEnabled
        if (termSkipEnabled) {
            repeatableSet['terminationSkipLabel'] = termSkipLabel;
        }
        repeatableSet['condition'] = condition;

        repeatableSet['id'] = campaignEditor.maxItemIndex(campaign['surveys']['survey'][surveyIndex]['contentList']['']) + 1;
        campaign['surveys']['survey'][surveyIndex]['contentList'][''].push(repeatableSet);

        return true;
    },

    /*
    Generate the URN for a campaign based on the campaign title, current author, etc.
    INPUT: Campaign metadata, current author
    OUTPUT: The campaign URN string
    */
    generateCampaignURN: function(title, author, version) {
        var campaignURN = 'urn:campaign:';
        campaignURN += title.replace(/\s/g, '') + ':nodesc:' + author.replace('.', '') + ':' + version;

        return campaignURN;
    },


    // Function used when user moves a survey item.  Takes the object at an index and moves it to another.
    shiftSurveyItems: function(startIndex, endIndex) {
        var surveyIndex = $.cookie('currentSurvey');
        var contentList = campaignWrapper['campaign']['surveys']['survey'][surveyIndex]['contentList'][''];

        // Remove element, and insert it into endIndex
        contentList.splice(endIndex, 0, contentList.splice(startIndex, 1)[0]);
    },

    // Find the current maximum index in the contentList
    maxItemIndex: function(contentList) {
        if (contentList.length === 0) {
            return 0;
        }
        console.log(campaignEditor.surveyItemIndexes(contentList));
        return Math.max.apply(Math, campaignEditor.surveyItemIndexes(contentList));
    },

    surveyItemIndexes: function(contentList) {
        return contentList.map(function(item) {
            if (item['message']) {
                return item['message']['editId'];
            } else if (item['prompt']) {
                return item['prompt']['editId'];
            } else {
                return item['repeatableSet']['editId'];
            }
        });
    },

    // function to parse campaign from xml
    campaignParser: function(jsonContent) {
        
        return 0;
    }
};
