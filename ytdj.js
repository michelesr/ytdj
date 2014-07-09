var vol1 = 0.5;
var vol2 = 0.5;
var loop = [{"start" : 0, "end" : 0 , "interval": 0, "state" : "off"}, {"start" : 0, "end" : 0 , "interval": 0, "state": "off"}];
var fiftyFifty = false;
var hover = false;

function whatIsId() { 
  alert("Id is the code that identifies the video on youtube site. You can find it in the url of the video, after watch?v= ");
}

function howToLoop() {
  alert("To loop a video, press the trigger key 3 times, first time to get start time, second time to get end time and start the loop, last time to release the loop.\nTrigger key is 'z' for first video and 'x' for second video");
}

function printControls() {
  alert("Control Keys:\nleft/right: move the fader when mouse is near it\nz: loop trigger for video #1\nx: loop trigger for video #2\nh: hide/show the players");
}

function onKeyDown(k) {
  var currentValue = parseInt($('#fader').val());
  switch(k.keyCode? k.keyCode: k.charCode) {
    case 37:  // left
      if (hover)
	$('#fader').simpleSlider("setValue", currentValue - 1);
      break;
    case 39: // right
      if (hover)
	$('#fader').simpleSlider("setValue", currentValue + 1);
      break;
    case 90: // z
      triggerLoop(0);
      break;
    case 88: // x
      triggerLoop(1);
      break;
    case 72: // h
      if($(".players").is(":visible"))
        hidePlayers();
      else
	showPlayers();
      break;
  }
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
	player.setVolume(100 * vol1);
	player2.setVolume(fv * vol2);
      }
      else {
	$('#vol').html((200 - fv) + "-100");
	player.setVolume((200 - fv) * vol1);
	player2.setVolume(100 * vol2);
      }
    }
    else {
      fv /= 2;
      $('#vol').html((100 - fv) + "-" + fv);
      player.setVolume((100 - fv) * vol1);
      player2.setVolume(fv * vol2);
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
    checkLoop(p);
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
  }
  else if (loop[p].state == "init") {
    loop[p].end = time; 
    loop[p].state = "on";
    setLoop(p, loop[p].start, loop[p].end);
  }
  else if (loop[p].state = "on") {
    loop[p].state = "off";
    clearLoop(p);
  }
  console.log(loop[p].state);
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

$(document).ready(function() {
  $("#fader-slider").css("margin-left", "auto");
  $("#fader-slider").css("margin-right", "auto");

  $('#b1').click(function () {
    player.loadVideoById(checkVideoId($("#id1").val()));
  });

  $('#b2').click(function () {
    player2.loadVideoById(checkVideoId($("#id2").val()));
  });

  $('#fader').change(function () {
    updateVolume();
  });

  $('#vol1').change(function () {
    vol1 = $('#vol1').val() / 100;
    checkVolume();
    updateVolume();
  });

  $('#vol2').change(function () {
    vol2 = $('#vol2').val() / 100;
    checkVolume();
    updateVolume();
  });

  $('.faderDiv').hover(function () {
    hover = true;
  }, function() {
    hover = false;
  });
});
