$(document).ready(function() {
    $('.entry').click(function(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        var dateStr = evt.target.id.split('entry-')[1];
        if (!window.dateIndex[dateStr]) {
            return;
        }

        var entries = window.dateIndex[dateStr];
        var idx = entries[0];
        var content = window.content[idx];
        $('.content:first').replaceWith(content.html);
        $('.navigation').css({ display: 'block' });
        $(document).scrollTop(0);
    });        
});
