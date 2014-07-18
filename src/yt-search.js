var KEY = "AIzaSyCQjzDdNpEFXcz6KZBeX12YGOoS9sLxGLA"; 
var obj;
var selected_player = 1;

function searchVideo(name) {
  $.getJSON("https://www.googleapis.com/youtube/v3/search", {q: name, part:"snippet", key : KEY}, function(o) {
    obj = o;
    if (obj.items.length > 0) {
      var htmlString = ""
      for (var i = 0; i < obj.items.length; i++) {
        htmlString += "<div class='result' id='result" + i + "'>" + "<p><img src='" + obj.items[i].snippet.thumbnails.medium.url + "'/>" + "</p><p><b>" + obj.items[i].id.videoId + "</b></p><p>" + obj.items[i].snippet.title + "</p><p>"  + obj.items[i].snippet.description + "</div>";
      }
      $("#searchDiv").html(htmlString);
      $(".result").click(function() {
        var s = $(this).attr("id");
        var x = s.substring(6, 7);
        players[selected_player-1].loadVideoById({"videoId":obj.items[x].id.videoId, "suggestedQuality":"small"});
      });
    }
    else
      $("#searchDiv").html("<table><tr><td>No results</td></tr></table>");
  });
}

function selectPlayer(x) {
  var y = (x%2)+1;
  console.log("x" + x + "y" +y);
  selected_player = x;
  $("#num"+x).css("color", "#fff");
  $("#num"+x).css("background-color", "#f00");
  $("#num"+x).css("border", "2px solid #fff");
  $("#num"+y).css("color", "#333");
  $("#num"+y).css("background-color", "#ede");
  $("#num"+y).css("border", "2px solid #eee");
}
