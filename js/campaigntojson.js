/*
This is a terrible hack to try to translate the XML back to JSON. It tries to
fix types of some fields (array, bool, numeric) which get lost in XML. Things
get worse because the original author has modified the xml2json library and
introduced some strange hacks to work around bugs in his application.

In particular, the contentList of each survey is contained within the null field
of a JSON object, and the json2xml lib has been hacked to treat this as an array.
Why not just use an array in the first place? God knows. But at this point we
cannot go back to the unmodified json2xml because he has hardcoded this in 100+
places so that would break the entire application.
*/

function campaigntojson (xml){
	function toBoolean(val){
		if(val === "false") return false;
		if(val === "true") return true;
		return val;
	}

	function toNumber(val){
		var num = +val;
		return (typeof(num) == "number" && !isNaN(num)) ? num : val;
	}

	var jsonstring = xml2json(parseXml(xml), " ")

	//hack for IE
	jsonstring = jsonstring.replace("<", "&lt;").replace(">", "&gt;");

	//parse back to JSON
	var myjson = JSON.parse(jsonstring, " ");

	//surveys must be an array
	var surveys = myjson.campaign.surveys
	if(surveys && surveys.survey) {
		if(!$.isArray(surveys.survey)){
			//cast to array
			surveys.survey = [surveys.survey];
		}

		//properties must be an array
		$.each(surveys.survey, function(i, s){
			if(s.anytime){
				//cast to bool
				surveys.survey[i].anytime = toBoolean(s.anytime)
			}
			if(s.contentList){
				var prompts = s.contentList[""]
				$.each(prompts, function(j, p){
					//messages are not prompts
					if(p.prompt){
						if(p.prompt.skippable){
							//cast to bool
							surveys.survey[i].contentList[""][j].prompt.skippable = toBoolean(p.prompt.skippable)
						}
						if(p.prompt.properties) {
							var prop = p.prompt.properties.property;
							if(!$.isArray(prop)){
								//cast to array
								surveys.survey[i].contentList[""][j].prompt.properties.property = [prop];
							}
							$.each(surveys.survey[i].contentList[""][j].prompt.properties.property, function(k, thisprop){
								if(thisprop.key){
									//cast to numeric
									surveys.survey[i].contentList[""][j].prompt.properties.property[k].key = toNumber(thisprop.key)
								}
							})
						}
					}
				})
			} else {
				s.contentList = {"":[]}
			}
		})
	} else {
		myjson.campaign.surveys = {"survey" : []};
	}

	return myjson
}

/*
var campaign = {campaign :JSON.parse(localStorage.campaignWrapper).campaign}
var myxml = json2xml(campaign)
console.log(JSON.stringify(campaign))
console.log(JSON.stringify(campaigntojson(myxml)))
*/
