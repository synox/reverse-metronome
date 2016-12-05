var app = angular.module('app', []);


var snd = new Audio("click-short.wav");

app.controller('MainCtrl', ["$interval", function ($interval) {
    var self = this;

    self.onReset = function () {
        self.times = [];
        self.average = null;
        self.lastBeat= null;
        $interval.cancel(self.beatTimer);
        self.beatTimer = null;
        self.timeSinceLastPress = null;
        self.progressPercent = 0;
    };

    self.updateUiVariables = function () {
            // self.timeSinceLastPress = new Date().getTime() - self.lastPress
            // var timeToNextBeat = self.nextBeatTime - new Date().getTime();
            // self.progressPercent = 100.0 - 100.0 / self.average * timeToNextBeat;
    }

    self.onBeat = function () {
        snd.play();
        self.lastBeat = new Date().getTime()
    };

    self.onMeasure = function () {
        self.times.push(new Date().getTime())
        var diffs = [];
        var sumOfDiffs = 0;
        for (var i = 0; i < self.times.length - 1; i++) {
            var diff = self.times[i + 1] - self.times[i];
            diffs.push(diff);
            sumOfDiffs += diff;
        }
        self.average = sumOfDiffs / diffs.length;

        self.lastBeat = new Date().getTime()

        if (diffs.length) {
            self.onBeat();
            $interval.cancel(self.beatTimer);
            self.beatTimer = $interval(function () {
                self.onBeat();
            }, self.average);
        }
    };

    self.intervalPromise = $interval(function () {
        self.updateUiVariables();
    }, 100);


    self.onReset();

}]);
