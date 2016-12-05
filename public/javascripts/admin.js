$(function() {
    $(".center").html($(".addGame").html());
    $("li").click(function() {
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
    $("#goback").click(function() {
        window.location = '/';
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
            var name = $(el).attr('value');
            sources.push({
                sourceName: name,
                sourceLink: link,
                price: 0
            });
        }
    });
    var sourceJson = JSON.stringify(sources);
    var statusLabel = $("#addGameDiv");
    statusLabel.text("Adding " + gameName);
    statusLabel.addClass("alert-info");
    $.post('/api/add/game', {
            gameName: gameName,
            gameImageUrl: gameImageUrl,
            platform: platform,
            sources: sourceJson
        },
        function(data) {
            var result = JSON.stringify(data);
            if(result.error){
                statusLabel.text("Error, game already exist!");
                statusLabel.removeClass("alert-info");
                statusLabel.addClass("alert-error");
            }else{
                statusLabel.text("Added to database, now getting prices.");
                $.get('/api/update/one/' + gameName,function(data){
                    statusLabel.removeClass("alert-info");
                    statusLabel.addClass("alert-success");
                    statusLabel.text("Game added!");
                });
            }
        });
}

var addSource = function(){
    var sourceName = $("#sourceName").val();
    var parseTag = $("#parseTag").val();
    var statusLabel = $("#addSourceDiv");
    statusLabel.text("Adding " + sourceName);
    statusLabel.addClass("alert-info");
    $.post('/api/add/source',{
        "sourceName" : sourceName,
        "parseTag" : parseTag
    },function(data){
        statusLabel.removeClass("alert-info");
        statusLabel.addClass("alert-success");
        statusLabel.text("Source added!");
    })
}

var updateGame = function(gameName){
    var statusLabel = $("#updateDiv");
    statusLabel.text("Updating " + gameName);
    statusLabel.addClass("alert-info");
    $.get('/api/update/one/' + gameName,function(data){
        statusLabel.text("Game updated!");
        statusLabel.removeClass("alert-info");
        statusLabel.addClass("alert-success");
    });
}

var removeGame = function(gameName){
    var statusLabel = $("#updateDiv");
    statusLabel.text("Removing " + gameName);
    statusLabel.addClass("alert-info");
    $.get('/api/remove/game/' + gameName,function(data){
        statusLabel.text("Game removed!");
        statusLabel.removeClass("alert-info");
        statusLabel.addClass("alert-success");
    });
}

var currentCount = 0;

var updateGames = function(){
    var statusLabel = $("#updateAllDiv");
    $(".gameNames").each(function(){
        var name  = $(this).text();
        var gameCount = $(".gameCount").text();
        $.get('/api/update/one/' + name),function(data){
        //
        }
    });
    statusLabel.text("All updates requested, server will update all data in background.");
    statusLabel.removeClass("alert-info");
    statusLabel.addClass("alert-success");
}