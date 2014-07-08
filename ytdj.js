var vol1 = 1;
var vol2 = 1;
var hover = false;

function whatIsId() { 
  alert("Id is the code that identifies the video on youtube site. You can find it in the url of the video, after watch?v= ");
}

function onKeyDown(k) {
  var currentValue = parseInt($('#fader').val());
  switch(k.keyCode? k.keyCode: k.charCode) {
    case 37:
      if (hover)
	$('#fader').simpleSlider("setValue", currentValue - 1);
      break;
    case 39:
      if (hover)
	$('#fader').simpleSlider("setValue", currentValue + 1);
      break;
    }
}

function updateVolume() {
    var fv = $("#fader").val();
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

$(document).ready(function() {
  $("#fader-slider").css("margin-left", "auto");
  $("#fader-slider").css("margin-right", "auto");

  $('#b1').click(function () {
    player.loadVideoById($("#id1").val());
  });

  $('#b2').click(function () {
    player2.loadVideoById($("#id2").val());
  });

  $('#fader').change(function () {
    updateVolume();
  });

  $('#vol1').change(function () {
    vol1 = $('#vol1').val() / 100;
    updateVolume();
  });

  $('#vol2').change(function () {
    vol2 = $('#vol2').val() / 100;
    updateVolume();
  });

  $('.faderDiv').hover(function () {
    hover = true;
  }, function() {
    hover = false;
  });
});
