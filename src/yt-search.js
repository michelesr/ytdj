// you need a valid youtube api key to use the search functions
var KEY = "AIzaSyCQjzDdNpEFXcz6KZBeX12YGOoS9sLxGLA"; 
var obj;
var activePlayer = 1;

function searchVideo(name) {
  $.getJSON("https://www.googleapis.com/youtube/v3/search", {type: "video", q: name, part:"snippet", key : KEY}, function(o) {
    obj = o;
    if (obj.items.length > 0) {
      var htmlString = "<div><p><a href='javascript:void(0)' onClick='hideResults()'>Hide results</a></p>";
      for (var i = 0; i < obj.items.length; i++) 
        htmlString += "<div>" + "<p><img class='result' id='result" + i + "'src='" 
                   + obj.items[i].snippet.thumbnails.medium.url + "'/>" + "</p><p><b>"
                   + obj.items[i].snippet.title + "</b></p><p>" 
                   + obj.items[i].snippet.description + "</div>";
      $("#searchDiv").html(htmlString + "</div>");
      $(".result").click(function() {
        var s = $(this).attr("id");
        var x = s.substring(6, 7);
        startVideo(activePlayer, obj.items[x].id.videoId);
        $('html, body').animate({scrollTop: $("#num"+activePlayer).offset().top}, 500);
      });
    }
    else
      $("#searchDiv").html("<div><div onClick='hideResults()' class='result'>No results</div></div>");
  });
}

function hideResults() {
  $("#searchDiv").html("");
}

function selectPlayer(x) {
  var y = (x%2)+1;
  activePlayer = x;
  $("#num"+x).css("color", "#fff");
  $("#num"+x).css("background-color", "#f00");
  $("#num"+x).css("border", "2px solid #fff");
  $("#num"+y).css("color", "#333");
  $("#num"+y).css("background-color", "#ede");
  $("#num"+y).css("border", "2px solid #eee");
}
