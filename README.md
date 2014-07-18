ytdj
====

DJ with Youtube Players!

How to: you will se two pairs of textbox and button, in order to start a video you must provide the video ID (for example https://www.youtube.com/watch?v=An2a1_Do_fc has An2a1_Do_fc as ID) and click "Load" to start the video. NEW: you can also provide URL now instead of ID, the software will try to parse it and get the id. 

Use the fader to mix audio! You can set local volume for a video using the control that i provided (please don't use youtube volume control).  
There's 2 fader mode: 50-50 and 100-100, that are related to the crossfading mode, and they indicate the value of the volumes when the mixer is on the middle position.

To loop a video, press the loop in key to get initial time, loop out to take final time and start the loop, exit to finish the loop, reloop to retrigger the same loop. The loop won't start if final time is lower than start time.

CUE: click "Pause" to pause the video, then seek to the desired point usign youtube timeline, click "Hear" to hear the audio in the seeked position, when you found the right position click "Set" to set the cue, then you can hold "Cue" or click "C-Play" to play the track from Cue position, the difference is that "Cue" will stop the track when you stop hold.

Hide the video pressing "h" key.

Now you can use the search to find videos and loading them on the selected player by clicking on the result box. To select the player click on the player number. In order to use this function you need a youtube api v3 key, otherwise youtube server will return 403 (Forbidden), but DON'T BE AFRAID, you can try the feature if you use the player that i hosted on github (link below).

You can try the player on https://michelesr.github.io/ytdj/ytdj.html

Enjoy!

Credits: michelesr, rikynd (that gave me the idea)
