var vol = [0.5, 0.5];
var keys = [49, 50, 51, 52, 53, 54, 56, 57, 48, 73, 79, 80, 81, 87, 69, 65, 83, 72, 77, 78];
var loop = [{"start" : 0, "end" : 0 , "interval": 0, "state" : "off"}, {"start" : 0, "end" : 0 , "interval": 0, "state": "off"}];
var fiftyFifty = false;
var mute_vol = [0.5, 0.5];
var playing = [false,false];
var MICROLOOP_SIZE = 0.1;
var cue = [0,0]

function whatIsId() { 
  alert('Id is the code that identifies the video on youtube site. You can find it in the url of the video, after "watch?v="\nYou can load a video providing its URL (the address) or ID.');
}

function howToLoop() {
  alert("To loop a video, press the loop in key to get initial time, loop out to take final time and start the loop, exit to finish the loop, reloop to retrigger the same loop. The loop won't start if final time is lower than start time.");
}

function howToCue() {
  alert('Click "Pause" to pause the video, then seek to the desired point usign youtube timeline, click "Hear" to hear the audio in the seeked position, when you found the right position click "Set" to set the cue, then you can hold "Cue" or click "C-Play" to play the track from Cue position, the difference is that "Cue" will stop the track when you stop hold.');
}

function printControls() {
  alert("Control Keys\n\nFADER:\na/s: move left/right\nq: full left (100-0)\nw:middle (100-100 or 50-50)\ne: full right (0-100)\n\nTRACK #1:\nn: pause/play\n8: mute/unmute\n9: volume at 50%\n0: volume at 100%\n1: loop in\n2: loop out\n3: exit/reloop\n\nTRACK #2:\nm: pause/play\ni: mute/unmute\no: volume at 50%\np: volume at 100%\n4: loop in\n5: loop out\n6: exit/reloop\n\nOTHER:\nh: hide/show the players");
}

function onStateChangeHandler1(state) {
  stateChange(1, state);  
}

function onStateChangeHandler2(state) {
  stateChange(2, state);
}

function stateChange(x, s) {
  var d = s.data;
  if (d == -1) {
    $(".button"+x).css("display", "none");
  }
  else {
    $(".button"+x).css("display", "inline-block");
    if (d == 0 || d == 2) {
      $("#pause"+x).html("Play");
      $("#pause"+x).css("background-color", "green");
      $("#pause"+x).attr("title", "Play the video");
      playing[x-1] = false;
    }
    else if (d == 1) {
      $("#pause"+x).html("Pause");
      $("#pause"+x).css("background-color", "red");
      $("#pause"+x).attr("title", "Pause the video");
      playing[x-1] = true;
    }
  }
}

function pausePlay(x) {
  if (playing[x-1]) {
    players[x-1].pauseVideo();
  }
  else {
    players[x-1].playVideo();
  }
}

function sliderToLeft() {
  $('#fader').simpleSlider("setValue", 0);
}

function hearCurrentTime(p) {
  var t = players[p].getCurrentTime();
  players[p].playVideo();
  setTimeout(function(p) {
    players[p].pauseVideo();
    players[p].seekTo(t);
  }, 1000 * MICROLOOP_SIZE, p);
}
function sliderToRight() {
  $('#fader').simpleSlider("setValue", 200);
}

function sliderToCenter() {
  $('#fader').simpleSlider("setValue", 100);
}

function checkInputFocus() {
  return $(".textbox").is(":focus"); 
}

function getVolume(x) {
  return($("#vol"+x).val());
}

function setVolume(x, v) {
  $("#vol"+x).val(v);
  changeVolume(x);;
}

function volumeMax(x) {
 setVolume(x, 100);
}

function volumeMin(x) {
 setVolume(x, 0);
}

function volumeMid(x) {
 setVolume(x, 50);
}

function mute(x) {
  mute_vol[x-1] =  $("#vol"+x).val();
  volumeMin(x);
}

function unmute(x) {
  setVolume(x, mute_vol[x-1]);
}

function muteUnmute(x) {
    if(getVolume(x) != 0)
      mute(x);
    else
      unmute(x);
}

function increaseSlider(x) {
  var currentValue = parseInt($('#fader').val());
  $('#fader').simpleSlider("setValue", currentValue - 2*x);
}

function decreaseSlider(x) {
  var currentValue = parseInt($('#fader').val());
  $('#fader').simpleSlider("setValue", currentValue + 2*x);
}

function checkVolume() {
  if($("#vol1").val() > 75 || $("#vol2").val() > 75)
    $("#loud").fadeIn(500);
  else
    $("#loud").fadeOut(500);
}

function updateVolume() {
    var fv = $("#fader").val();
    if (!fiftyFifty) {
      if (fv <= 100) {
	$('#vol').html("100-" + fv);
	player.setVolume(100 * vol[0]);
	player2.setVolume(fv * vol[1]);
      }
      else {
	$('#vol').html((200 - fv) + "-100");
	player.setVolume((200 - fv) * vol[0]);
	player2.setVolume(100 * vol[1]);
      }
    }
    else {
      fv = Math.round(fv / 2);
      $('#vol').html((100 - fv) + "-" + fv);
      player.setVolume((100 - fv) * vol[0]);
      player2.setVolume(fv * vol[1]);
    }

}

function changeMode() {
  fiftyFifty = fiftyFifty? false: true;
  if (fiftyFifty)
    $("#mode").html('Switch to 100-100');
  else
    $("#mode").html('Switch to 50-50');
  updateVolume();
}

function setLoop(p) {
    if (checkLoopRange(p)) {
      loop[p].interval = window.setInterval(checkLoop, 1, p);
      loop[p].state = "on";
      $("#reloop"+(p+1)).css("background-color", "green");
      $("#reloop"+(p+1)).html("Exit");
      $("#reloop"+(p+1)).attr("title", "Stop the loop");
    }
}

function checkLoop(p) {
 if (players[p].getCurrentTime() >= loop[p].end)
   players[p].seekTo(loop[p].start);
}

function setLoopIn(p) {
  loop[p].start = players[p].getCurrentTime();
}

function setLoopOut(p) {
  loop[p].end = players[p].getCurrentTime();
  setLoop(p);
}

function checkLoopRange(p) {
  return loop[p].start < loop[p].end; 
}
function clearLoop(p) {
  window.clearInterval(loop[p].interval);
  loop[p].state = "off";
  $("#reloop"+(p+1)).css("background-color", "#f00");
  $("#reloop"+(p+1)).html("Reloop");
  $("#reloop"+(p+1)).attr("title", "Restart the loop");
}

function hidePlayers() {
  $(".players").fadeOut(500); 
}

function showPlayers() {
  $(".players").fadeIn(500); 
}

function checkVideoId(id) {
  if (id.indexOf("youtu.be/") != -1)
    id = id.substring(id.indexOf("e") + 2, id.length);
  index = id.indexOf("=");
  if (index != -1) 
    id = id.substring(index +1, id.length);
  index = id.indexOf("&");
  if (index != -1) 
    id = id.substring(0, index);
  return(id);
}

function startVideo(p) {
    var id = checkVideoId($("#id"+p).val());
    $("#id"+p).val(id);
    localStorage.setItem("ytdjpl_input" + p, id);
    players[p-1].loadVideoById(id);
}

function changeVolume(v) {
    vol[v-1] = getVolume(v) / 100;
    checkVolume();
    updateVolume();
}

function setCue(p) {
  cue[p] = players[p].getCurrentTime();
}

function cuePlay(p) {
  players[p].seekTo(cue[p]);
  players[p].playVideo();
}

function cueStop(p) {
  players[p].pauseVideo();
}

function reloopExit(p) {
  if (loop[p].state == "on") {
    clearLoop(p);
  }
  else {
    setLoop(p);
  }
}

$(document).ready(function() {
  $("#fader-slider").css("margin-left", "auto");
  $("#fader-slider").css("margin-right", "auto");
  var x;
  if (x = localStorage.getItem("ytdjpl_input1"))
    $("#id1").val(x);
  if (x = localStorage.getItem("ytdjpl_input2"))
    $("#id2").val(x);

  $(document).keydown(function(k) {
    x = k.keyCode? k.keyCode: k.charCode;
    if (keys.indexOf(x) != -1 && !checkInputFocus()) {
      k.preventDefault();
      switch(k.keyCode? k.keyCode: k.charCode) {
        case 48: // 0
	  volumeMax(1);
	  break;
	case 57: // 9
	  volumeMid(1);
	  break;
	case 56: // 8
	  muteUnmute(1);
	  break;
	case 80: // p
	  volumeMax(2);
	  break;
	case 79: // o
	  volumeMid(2);
	  break;
	case 73: // i
	muteUnmute(2);
	break;
	case 81: // q
	  sliderToLeft();
	  break;
	case 87: // w
	  sliderToCenter();
	  break;
	case 69: // e
	  sliderToRight();
	  break;
	case 65:  // a
	  increaseSlider(1);
	  break;
	case 83: // s
	  decreaseSlider(1);
	  break;
	case 49: // 1
	  setLoopIn(0);
	  break;
	case 50: // 2
	  setLoopOut(0);
	  break;
	case 51: // 3
	  reloopExit(0);
	  break;
	case 52: // 4
	  setLoopIn(1);
	  break;
	case 53: // 5
	  setLoopOut(1);
	  break;
	case 54: // 6
	  reloopExit(1);
	  break;
  case 77:
    pausePlay(2);
    break;
  case 78:
    pausePlay(1);
    break;
	case 72: // h
	  if($(".players").is(":visible"))
	    hidePlayers();
	  else
	    showPlayers();
	  break;
      }
    }
  });

  $('#b1').click(function () {
    startVideo(1);
  });
 
  $('#b2').click(function () {
    startVideo(2);
  });

  $('#id1').keydown(function (k) {
    var x = k.keyCode? k.keyCode: k.charCode;
    if(x == 13) {
      k.preventDefault();
      startVideo(1);
    }
  });

  $('#id2').keydown(function (k) {
    var x = k.keyCode? k.keyCode: k.charCode;
    if(x == 13) {
      k.preventDefault();
      startVideo(2);
    }
  });

  $('#fader').change(function () {
    updateVolume();
  });

  $('#vol1').change(function () {
    changeVolume(1);
  });

  $('#vol2').change(function () {
    changeVolume(2);
  });

  $("#loop_in1").click(function() {
    setLoopIn(0);
  });
  
  $("#loop_in2").click(function() {
    setLoopIn(1);
  });

  $("#loop_out1").click(function() {
    setLoopOut(0);
  });
  
  $("#loop_out2").click(function() {
    setLoopOut(1);
  });

  $("#reloop1").click(function() {
    reloopExit(0);
  });

  $("#reloop2").click(function() {
    reloopExit(1);
  });

  $("#pause1").click(function() {
    pausePlay(1);
  });

  $("#hear1").click(function() {
    hearCurrentTime(0);
  });

  $("#hear2").click(function() {
    hearCurrentTime(1);
  });

  $("#pause2").click(function() {
    pausePlay(2);
  });

  $("#cue_set1").click(function() {
    setCue(0);
  });

  $("#cue_set2").click(function() {
    setCue(1);
  });

  $("#cue_play1").click(function() {
    cuePlay(0);
  });

  $("#cue_play2").click(function() {
    cuePlay(1);
  });

  $("#cue1").mousedown(function() {
    cuePlay(0);
  });

  $("#cue1").mouseup(function() {
    cueStop(0);
  });


  $("#cue2").mousedown(function() {
    cuePlay(1);
  });

  $("#cue2").mouseup(function() {
    cueStop(1);
  });
});
