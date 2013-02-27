$(function() {
    $('.form-toggle-btn').click(function() {
        var $this = $(this);
        $this.next().children().slideToggle('fast');
        $this.children().toggle();
        $this.toggleClass('btn-primary btn-danger');
        return false;
    });
});