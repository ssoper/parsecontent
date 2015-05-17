var showEntryByIdx = function(idx) {
    var content = window.content[idx];
    $('#wordcloud').remove();
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

    window.cloudWords = [];
    var smallestCount = window.topWords[window.topWords.length-1][1];
    window.topWords.forEach(function(wordAry) {
        var word = wordAry[0];
        var count = wordAry[1];
        count = parseInt(count/smallestCount);
        console.log(smallestCount + ':' + wordAry[1] + ':' + count);

        for(i=0; i < count; i++) {
            window.cloudWords.push(word);
        }
    });

    var fill = d3.scale.category20();
      d3.layout.cloud().size([960, 600])
          .words(window.cloudWords.map(function(d) {
            return {text: d, size: 10 + Math.random() * 90};
          }))
          .padding(5)
          .rotate(function() { return ~~(Math.random() * 2) * 90; })
          .font("Impact")
          .fontSize(function(d) { return d.size; })
          .on("end", draw)
          .start();
      function draw(words) {
        d3.select("#wordcloud").append("svg")
            .attr("width", 960)
            .attr("height", 600)
          .append("g")
            .attr("transform", "translate(480,300)")
          .selectAll("text")
            .data(words)
          .enter().append("text")
            .style("font-size", function(d) { return d.size + "px"; })
            .style("font-family", "Impact")
            .style("fill", function(d, i) { return fill(i); })
            .attr("text-anchor", "middle")
            .attr("transform", function(d) {
              return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function(d) { return d.text; });
      }
});
