window.showEntry = function(dateStr) {
    if (!window.dateIndex[dateStr]) {
        return;
    }

    var entries = window.dateIndex[dateStr];
    var idx = entries[0];
    var content = window.content[idx];
    $('.content:first').replaceWith(content.html);
    $('.navigation').css({ display: 'block' });

    if (idx > 0) {
        $('#previous').show();
        $('#previous').click(function(evt) {
            evt.preventDefault();
            evt.stopPropagation();
            var content = window.content[idx-1];
            showEntry(content.date);
        });
    } else {
        $('#previous').hide();
    }

    if (idx < window.content.length-1) {
        $('#next').show();
        $('#next').click(function(evt) {
            evt.preventDefault();
            evt.stopPropagation();
            var content = window.content[idx+1];
            showEntry(content.date);
        });
    } else {
        $('#next').hide();
    }

    $(document).scrollTop(0);
}

// $('.entry').click(function(evt) {
//     evt.preventDefault();
//     evt.stopPropagation();
//
//     var dateStr = evt.target.id.split('entry-')[1];
//     alert(dateStr)
//     showEntry(dateStr);
// });

$(document).ready(function() {
    $(document).scrollTop(0);
});
