$(function() {
    $('.help-icon').hover(function() {
        var $this = $(this);
        $this.tooltip('show');
    }, function() {
        var $this = $(this);
        $this.tooltip('hide');
    })

    $(".help-hover").on({
        mouseenter: function() {
           		var $this = $(this);
        		$this.tooltip('show');
           },
        mouseleave: function() {
           		var $this = $(this);
        		$this.tooltip('hide');
           }
       }
    );
});
