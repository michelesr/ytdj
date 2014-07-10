var vol = [0.5, 0.5];
var keys = [56, 57, 48, 73, 79, 80, 81, 87, 69, 65, 83, 90, 88, 72, 77, 78];
var loop = [{"start" : 0, "end" : 0 , "interval": 0, "state" : "off"}, {"start" : 0, "end" : 0 , "interval": 0, "state": "off"}];
var fiftyFifty = false;
var mute_vol = [0.5, 0.5];
var playing = [false,false];

function whatIsId() { 
  alert("Id is the code that identifies the video on youtube site. You can find it in the url of the video, after watch?v= ");
}

function howToLoop() {
  alert("To loop a video, press the trigger key 3 times, first time to get start time, second time to get end time and start the loop, last time to release the loop.\nTrigger key is 'z' for first video and 'x' for second video");
}

function printControls() {
  alert("Control Keys\n\nFADER:\na/s: move left/right\nq: full left (100-0)\nw:middle (100-100 or 50-50)\ne: full right (0-100)\n\nTRACK #1:\nn: pause/play\n8: mute/unmute\n9: volume at 50%\n0: volume at 100%\nz: loop trigger\n\nTRACK #2:\nm: pause/play\ni: mute/unmute\no: volume at 50%\np: volume at 100%\nx: loop trigger\n\nOTHER:\nh: hide/show the players");
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
    $("#loop"+x +", #pause"+x).css("display", "none");
  }
  else {
    $("#loop"+x +", #pause"+x).css("display", "inline-block");
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
    loop[p].interval = window.setInterval(checkLoop, 1, p);
}

function checkLoop(p) {
 if (players[p].getCurrentTime() >= loop[p].end)
   players[p].seekTo(loop[p].start);
}

function triggerLoop(p) {
  var time = players[p].getCurrentTime();
  if (loop[p].state == "off") {
    loop[p].start = time; 
    loop[p].state = "init";
    $("#loop"+(p+1)).css("background-color", "#f80");
    $("#loop"+(p+1)).attr("title", "Take the final loop time and start the loop");
  }
  else if (loop[p].state == "init") {
    loop[p].end = time; 
    loop[p].state = "on";
    setLoop(p, loop[p].start, loop[p].end);
    $("#loop"+(p+1)).css("background-color", "#080");
    $("#loop"+(p+1)).attr("title", "Release the loop");
  }
  else if (loop[p].state = "on") {
    loop[p].state = "off";
    clearLoop(p);
    $("#loop"+(p+1)).css("background-color", "#f00");
    $("#loop"+(p+1)).attr("title", "Take the initial loop time");
  }
}

function clearLoop(p) {
  window.clearInterval(loop[p].interval);
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
    players[p-1].loadVideoById(id);
}

function changeVolume(v) {
    vol[v-1] = getVolume(v) / 100;
    checkVolume();
    updateVolume();
}

$(document).ready(function() {
  $("#fader-slider").css("margin-left", "auto");
  $("#fader-slider").css("margin-right", "auto");


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
	case 90: // z
	  triggerLoop(0);
	  break;
	case 88: // x
	  triggerLoop(1);
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

  $("#loop1").click(function() {
    triggerLoop(0);
  });
  
  $("#loop2").click(function() {
    triggerLoop(1);
  });

  $("#pause1").click(function() {
    pausePlay(1);
  });

  $("#pause2").click(function() {
    pausePlay(2);
  });
});
