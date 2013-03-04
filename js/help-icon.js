$(function() {
    $('.help-icon').hover(function() {
        var $this = $(this);
        $this.tooltip('show');
    }, function() {
        var $this = $(this);
        $this.tooltip('hide');
    })
});