$(function() {
	var prevValue = jQuery("#groupPromptType").val();
	jQuery("#groupPromptType").focus(function() {
		prevValue = $(this).val();
	}).change(function() {
        $this = $(this);
        var changeConfirm = true;
        if ($('#addedPrompt').val != "") {
            var text = "WARNING: Choosing new prompt type will clear all the data of old prompt type\n Proceed ?"
            changeConfirm = confirm(text);
        }

        if (changeConfirm) {   
            $('#addedPrompt').val(""); // clear text box
            $('#promptData').empty();
            switch ($this.val()) {
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
                    // Timestamp modal is not needed.  Do nothing.
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
	function updateOptionSingle() {
		var optionNum = 1;
		$('#singleChoiceTable tr:not(:first-child)').each(function()
        {
            $this = $(this);
            $this.find(".singleOptionNum").val(optionNum++);
        });
	}
    function updateSelection() {
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
        var val = $this.val();
        if (!isPositiveNumber(val)) {
            alert('Value must be a positive number');
            $this.css("background-color", "red");
        }
    }

    /*
	$('#promptTypeSubmit').click(function() {
        //displayRemoveActivityValues();
        $('#promptTypeModal').modal('hide');
    });
	*/
	var row = "<tr><td><input type='text' class='singleOptionNum' /></td><td><input type=text class='singleLabel'/></td><td><input type=text class='singleValue'/></td><td><button class='btn btn-primary add' >+</button></td><td><button class='btn btn-primary delete'>X</button></td></tr>";

	$("table[id=singleChoiceTable] .delete").live("click", function(e) {
		e.preventDefault();
        $(this).closest("tr").remove();
        updateOptionSingle();
        updateSelection();
    });

	$("table[id=singleChoiceTable] .add").live("click", function(e) {
		e.preventDefault();
        $(this).closest("tr").after(row);
        updateOptionSingle();
        updateSelection();
    });
    /* 
    $("table[id=singleChoiceTable]").on("click", "button", function() {
        $(this).closest("tr").remove();
        updateSelection();
    }); 
	*/
    /*
    $("#addSingleBtn").click(function () {
        var row = "<tr><td><input type=text class='singleLabel'/></td><td><input type=text class='singleValue'/></td><td><button class='btn btn-primary'>X</button></td></tr>";
        $("table[id=singleChoiceTable]").append(row);
    });
	*/
    // delegate
    $('#promptTypeModal').delegate('.singleLabel', 'change', updateSelection);
    $('#promptTypeModal').delegate('.singleValue', 'change', singleValidateValue);
});