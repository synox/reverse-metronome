var app = angular.module('app', []);


var snd = new Audio("click-short.wav");

app.controller('MainCtrl', ["$interval", function ($interval) {
    var self = this;

    self.onReset = function () {
        self.mode = "init";
        self.lastPress = null;
        self.interval = null;
        $interval.cancel(self.beatTimer);
        self.beatTimer = null;
        self.timeSinceLastPress = null;
        self.progressPercent = 0;
    };

    self.updateUiVariables = function () {
        if (self.mode == "init") {
            return;
        } else if (self.mode == "measure") {
            self.timeSinceLastPress = new Date().getTime() - self.lastPress

        } else if (self.mode == "play") {
            var timeToNextBeat = self.nextBeatTime - new Date().getTime();
            self.progressPercent = 100.0 - 100.0 / self.interval * timeToNextBeat;
        }
    }

    self.onBeat = function () {
        snd.play();
        self.nextBeatTime = new Date().getTime() + self.interval;
    };

    self.onStart = function () {
        var now = new Date().getTime();
        self.lastPress = now;

        self.onBeat();
        self.mode = "measure";
    };

    self.onMeasure = function () {
        var now = new Date().getTime();
        self.interval = now - self.lastPress;
        self.lastPress = now;

        $interval.cancel(self.beatTimer);
        self.beatTimer = $interval(function () {
            self.onBeat();
        }, self.interval);

        self.onBeat();
        self.mode = "play";

    };

    self.intervalPromise = $interval(function () {
        self.updateUiVariables();
    }, 100);


    self.onReset();

}]);
