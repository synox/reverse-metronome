# Simple reverse metronome

You tap, tap, tap and the metronome will continue with the same temp. 

# Tech Background

It is realized using a setInterval() and Audio(). See https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement

# TODO

 - The native JS Timer is bad and the metronome can run out of sync. With "Web Audio API" this could be improved. 
   * https://www.html5rocks.com/en/tutorials/audio/scheduling/
   * https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
   * https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame can help.

 - It doesn't work well on Desktop Safari.  
