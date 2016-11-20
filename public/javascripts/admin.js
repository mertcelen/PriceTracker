$(function() {
    $("button").click(function() {
        $(".content").css('visibility', 'hidden');
        $(".content").removeClass('active');
        $(".center").html($('.' + $(this).attr('id')).html());
        $('.' + $(this).attr('id')).addClass('active');
    });
    $("#logout").click(function() {
        $.ajax({
            type: 'DELETE',
            url: '/admin',
            success: function(data) {
                window.location.href = "/";
            }
        });
    });
});

var addGameForm = function() {

    var gameName = document.forms["addGame"]["gameName"].value;
    var gameImageUrl = document.forms["addGame"]["gameImageUrl"].value;
    var platform = document.forms["addGame"]["platform"].value;
    var sources = [];
    $(".sourceName").each(function(index, el) {
        var link = $("#source" + index).val();
        if (typeof(link) !== "undefined") {
            var price = $("#price" + index).val();
            var name = $(el).attr('value');
            sources.push({
                sourceName: name,
                sourceLink: link,
                price: price
            });
        }
    });
    var sourceJson = JSON.stringify(sources);
    $(".json").html(sourceJson);

    $.post('/add/game', {
            gameName: gameName,
            gameImageUrl: gameImageUrl,
            platform: platform,
            sources: sourceJson
        },
        function(data, textStatus, xhr) {
            $(".json").html("added");
        });
}
