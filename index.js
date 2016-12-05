var app = angular.module('app', []);

var snd = new Audio("click-short.wav");
var MAX_SAMPLES = 6;

app.controller('MainCtrl', ["$interval", function ($interval) {
    var self = this;

    self.onReset = function () {
        self.diffs = [];
        self.interval = null;
        self.lastBeat = null;
        self.lastPressedBeat = null;
        $interval.cancel(self.beatTimer);
        self.progressPercent = 0;
    };

    self.onBeat = function () {
        snd.play();
        self.lastBeat = new Date().getTime()
    };

    self.onMeasure = function () {
        var now = new Date().getTime();
        if (self.lastBeat) {
            var diff = now - self.lastPressedBeat;
            // if we missed more than 1 beat, measure since last beat
            if ( diff > self.interval * 2){
                diff = now - self.lastBeat;
                // if the difference is small, measure since previous beat
                // if we hit just after the beat, we have to increase the interval (instead of setting a very short one)
                if ( diff < self.interval / 3) {
                    diff += self.interval;
                }
            }
            self.diffs.push(diff);

            // remove oldest samples:
            if (self.diffs.length > MAX_SAMPLES){
                self.diffs.splice(0, self.diffs.length - MAX_SAMPLES);
            }

            var sumOfDiffs = self.diffs.reduce(function (v1, v2) {
                return v1 + v2;
            }, 0);

            // average:
            self.interval = sumOfDiffs / self.diffs.length;

            self.onBeat();
            $interval.cancel(self.beatTimer);
            self.beatTimer = $interval(function () {
                self.onBeat();
            }, self.interval);
        }

        self.lastBeat = now;
        self.lastPressedBeat = now;
    };

    // Update UI with 25fps (1000 / 25 = 40)
    self.intervalPromise = $interval(function () {
        var timeSinceLastBeat = new Date().getTime() - self.lastBeat ;
        self.progressPercent = 100.0 / self.interval * timeSinceLastBeat;
    }, 40);

    self.onReset();

}]);
