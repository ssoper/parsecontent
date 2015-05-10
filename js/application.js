var showEntryByIdx = function(idx) {
    var content = window.content[idx];
    $('.content:first').html(content.html);
    $('.navigation').css({ display: 'block' });

    if (idx > 0) {
        $('#previous').show();
        $('#previous').bind('click', function(evt) {
            evt.preventDefault();
            evt.stopPropagation();
            window.setTimeout(function() {
                $('#previous').unbind();
                $('#next').unbind();
                showEntryByIdx(idx-1);
            }, 250);
        });
    } else {
        $('#previous').hide();
    }

    if (idx < window.content.length-1) {
        $('#next').show();
        $('#next').bind('click', function(evt) {
            evt.preventDefault();
            evt.stopPropagation();
            window.setTimeout(function() {
                $('#previous').unbind();
                $('#next').unbind();
                showEntryByIdx(idx+1);
            }, 250);
        });
    } else {
        $('#next').hide();
    }

    $(document).scrollTop(0);
}

window.showEntryByDate = function(dateStr) {
    if (!window.dateIndex[dateStr]) {
        return;
    }

    var entries = window.dateIndex[dateStr];
    var idx = entries[0];
    showEntryByIdx(idx);
}

$(document).ready(function() {
    $(document).scrollTop(0);
});
