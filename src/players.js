var players = new Array([2])
var player, player2;
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onStateChangeHandler1
    }
  });

  player2 = new YT.Player('player2', {
    height: '390',
    width: '640',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onStateChangeHandler2
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(e) {
  console.log("Started player");
  console.log(e);
  players[0] = player;
  players[1] = player2;
  setVolume(1, 50);
  setVolume(2, 50);
}
