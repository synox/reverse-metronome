# Simple reverse metronome

You tap, tap, tap and the metronome will continue with the same temp. 

# Tech Background

It is realized using a setInterval() and [howler.js](https://www.npmjs.com/package/howler). 


# TODO

 - The native JS Timer is not gread and can run out of sync. There are different ways to improve this: 
   * https://www.html5rocks.com/en/tutorials/audio/scheduling/
   * https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
   * https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame can help.
