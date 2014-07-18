var KEY = "AIzaSyCQjzDdNpEFXcz6KZBeX12YGOoS9sLxGLA"; 
var obj;

function searchVideo(name) {
  $.getJSON("https://www.googleapis.com/youtube/v3/search", {q: name, part:"snippet", key : KEY}, function(obj) {
    if (obj.items.length > 0) {
      var htmlString = ""
      for (var i = 0; i < obj.items.length; i++) {
        htmlString += "<div>" + "<p><img src='" + obj.items[i].snippet.thumbnails.medium.url + "'/>" + "</p><p><b>" + obj.items[i].id.videoId + "</b></p><p>" + obj.items[i].snippet.title + "</p><p>"  + obj.items[i].snippet.description + "</div>";
      }
      $("#searchDiv").html(htmlString);
    }
    else
      $("#searchDiv").html("<table><tr><td>No results</td></tr></table>");
  });
}

