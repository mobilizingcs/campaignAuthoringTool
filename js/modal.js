$(function() {
	jQuery("#groupPromptType").focus(function() {
		prevValue = $(this).val();
	}).change(function() {
        $this = $(this);
        var changeConfirm = true;
        if ($('#addedPrompt').val() != "") {
            var text = "WARNING: Choosing new prompt type will clear all the options/keys/values.. associate with current prompt type\n Proceed ?"
            changeConfirm = confirm(text);
        } else {
            var text = "WARNING: Choosing new prompt type will clear all the options/keys/values.. associate with current prompt type\n Proceed ?"
            changeConfirm = confirm(text);
        }

        if (changeConfirm) {   
            $('#addedPrompt').val(""); // clear text box
            $('#promptData').empty();
            switch ($this.val()) {
                case 'audio':
                    $.get("promptModals/aufioModal.html", function(data){
                        $("#promptData").append(data);
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
        } else {
        	$this.val(prevValue);
        	prevValue = $this.val();
        }

        //$this.val(0);
    });



	// modal stuff
	// single choice
	function updateOptionSingle() {
		var optionNum = 0;
		$('#singleChoiceTable tr:not(:first-child)').each(function()
        {
            $this = $(this);
            $this.find(".singleOptionNum").val(optionNum++);
        });
	}
    function updateSelection() {
        //console.log($(this).val());
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
    };
    function singleValidateValue() {
        $this = $(this);
        $this.val($this.val().trim());
        var val = $this.val();
        if (!isPositiveNumber(val)) {
            alert('Value must be a positive number');
            $this.val("");
            //$this.css("background-color", "red");
        }
    }
    function checkDuplicateSingle() {
        $this = $(this);
        var currentLabel = $this.val().trim();
        var currentOption = $this.parents("tr:first").find(".singleOptionNum").val();
        var errorCode = 0;
        var errorMessage = "";

        $('#singleChoiceTable tr:not(:first-child)').each(function()
        {
            $this = $(this);
            var optionNum = $this.find(".singleOptionNum").val();
            if (currentOption != optionNum) {
                var label = $this.find(".singleLabel").val().trim();
                if (label === currentLabel) {
                    errorMessage += "Currently edit Option " + currentOption + " has the same label as Option " + optionNum + "\n";
                    errorCode = 1;
                }
            }
        });

        if (errorCode != 0) {
            alert("WARNING: Duplicate Label \n\n" + errorMessage + "\nIs this what you want ?");
        }
    };

	$("table[id=singleChoiceTable] .delete").live("click", function(e) {
		e.preventDefault();
        if ($("#singleChoiceTable tr").length <= 2) alert("Cannot delete last option");
        else $(this).closest("tr").remove();
        updateOptionSingle();
        updateSelection();
    });

	$("table[id=singleChoiceTable] .add").live("click", function(e) {
		e.preventDefault();
		var $tr = $(this).closest("tr");
        var $clone = $tr.clone();
        /*
        var counter = Number($("#singleCounter").val()) + 1;
        $("#singleCounter").val(counter);
        $clone.find(':text').val('');
        $clone.find('.singleOptionNum').val(counter);
        */
        $clone.find(':text').val('');
        $(this).closest("tr").after($clone);
        updateOptionSingle();
        updateSelection();
    });

    $("table[id=singleChoiceTable] .up,.down").live("click", function(e){
    	e.preventDefault();
        var row = $(this).parents("tr:first");
        var firstrow = $('table tr:first');
        if ($(this).is(".up") && row.prevAll().length > 1) {
            row.insertBefore(row.prev());
        } else if ($(this).is(".down") && row.nextAll().length > 0) {
            row.insertAfter(row.next());
        }
        updateOptionSingle();
        updateSelection();
    });
    // delegate
    $('#promptTypeModal').delegate('.singleLabel', 'change', updateSelection);
    $('#promptTypeModal').delegate('.singleLabel', 'change', checkDuplicateSingle);
    $('#promptTypeModal').delegate('.singleValue', 'change', singleValidateValue);

    // multiple choice
    function updateOptionMulti() {
		var optionNum = 0;
		$('#multiChoiceTable tr:not(:first-child)').each(function()
        {
            $this = $(this);
            $this.find(".multiOptionNum").val(optionNum++);
        });
	}
    function updateSelectionMulti() {
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
    };
    function multiValidateValue() {
        $this = $(this);
        var currentLabel = $this.val().trim();
        var val = $this.val();
        if (!isPositiveNumber(val)) {
            alert('Value must be a positive number');
            $this.val("");
            //$this.css("background-color", "red");
        }
    }
    function checkDuplicateMulti() {
        $this = $(this);
        var currentLabel = $this.val().trim();
        var currentOption = $this.parents("tr:first").find(".multiOptionNum").val();
        var errorCode = 0;
        var errorMessage = "";

        $('#multiChoiceTable tr:not(:first-child)').each(function()
        {
            $this = $(this);
            var optionNum = $this.find(".multiOptionNum").val();
            if (currentOption != optionNum) {
                var label = $this.find(".multiLabel").val().trim();
                if (label === currentLabel) {
                    errorMessage += "Currently edit Option " + currentOption + " has the same label as Option " + optionNum + "\n";
                    errorCode = 1;
                }
            }
        });
        if (errorCode != 0) {
            alert("WARNING: Duplicate Label \n\n" + errorMessage + "\nIs this what you want ?");
        }
    };

    $("table[id=multiChoiceTable] .upMulti,.downMulti,.addMulti,.deleteMulti").live("click", function(e){
    	e.preventDefault();
        var row = $(this).parents("tr:first");
        var firstrow = $('table tr:first');
        if ($(this).is(".upMulti") && row.prevAll().length > 1) {
            row.insertBefore(row.prev());
        } else if ($(this).is(".downMulti") && row.nextAll().length > 0) {
            row.insertAfter(row.next());
        } else if ($(this).is(".addMulti")) {
        	var $tr = $(this).closest("tr");
    		var $clone = $tr.clone();
            //var counter = Number($("#multiCounter").val()) + 1;
            //$("#multiCounter").val(counter);
            $clone.find(':text').val('');
            //$clone.find('.multiOptionNum').val(counter);
        	$(this).closest("tr").after($clone);
        } else if ($(this).is(".deleteMulti")) {
            if ($("#multiChoiceTable tr").length <= 2) alert("Cannot delete last option");
        	else $(this).closest("tr").remove();
        }

        updateOptionMulti();
        updateSelectionMulti();
    });
    // delegate
    $('#promptTypeModal').delegate('.multiLabel', 'change', updateSelectionMulti);
    $('#promptTypeModal').delegate('.multiLabel', 'change', checkDuplicateMulti);
    $('#promptTypeModal').delegate('.multiValue', 'change', multiValidateValue);

});