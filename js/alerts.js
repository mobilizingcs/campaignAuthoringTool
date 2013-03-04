$(function() {
    $('.content').on('click', '.close', function() {
        var $this = $(this);
        $this.parent().slideToggle('slow', function() { $(this).alert('close'); });
    });
});
