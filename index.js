var sound = new Howl({
    src: ['click-short.wav']
});

var MAX_SAMPLES = 6;

var metronome = null;
var beatTimer = null;

var onReset = function () {
    metronome = {
        diffs: [],
        interval: null,
        lastBeat: null,
        lastPressedBeat: null,
        progressPercent: 0
    };

    clearInterval(beatTimer);
    document.getElementById("playDetails").style.visibility = 'hidden';
    document.getElementById("pressAgain").style.visibility = 'hidden';
};

var updateUi = function () {
    var timeSinceLastBeat = new Date().getTime() - metronome.lastBeat;
    var progressPercent = 100.0 / metronome.interval * timeSinceLastBeat;
    document.getElementById("progress-bar").style.width = progressPercent + "%";
}

var onBeat = function () {
    document.getElementById("progress-bar").style.width = "100%";
    sound.play();
    metronome.lastBeat = new Date().getTime()

};

document.getElementById("measureButton").onclick = function () {
    var now = new Date().getTime();
    if (metronome.lastBeat) {
        var diff = now - metronome.lastPressedBeat;
        // if we missed more than 1 beat, measure since last beat
        if (diff > metronome.interval * 2) {
            diff = now - metronome.lastBeat;
            // if the difference is small, measure since previous beat
            // if we hit just after the beat, we have to increase the interval (instead of setting a very short one)
            if (diff < metronome.interval / 3) {
                diff += metronome.interval;
            }
        }
        metronome.diffs.push(diff);

        // remove oldest samples:
        if (metronome.diffs.length > MAX_SAMPLES) {
            metronome.diffs.splice(0, metronome.diffs.length - MAX_SAMPLES);
        }

        var sumOfDiffs = metronome.diffs.reduce(function (v1, v2) {
            return v1 + v2;
        }, 0);

        // average:
        metronome.interval = sumOfDiffs / metronome.diffs.length;

        document.getElementById("playDetails").style.visibility = 'visible';

        var miliseconds = metronome.interval / 1000
        document.getElementById("interval").textContent = Math.round(miliseconds * 100) / 100 + "s";

        onBeat();
        clearInterval(beatTimer);
        beatTimer = setInterval(function () {
            onBeat();
        }, metronome.interval);
        document.getElementById("pressAgain").style.visibility = 'hidden';
    } else {
        document.getElementById("pressAgain").style.visibility = 'visible';
    }

    metronome.lastBeat = now;
    metronome.lastPressedBeat = now;
};

document.getElementById("stopButton").onclick = onReset;

// Update UI with 25fps
var uiUpdateTimer = setInterval(updateUi, 1000 / 25);

onReset();



