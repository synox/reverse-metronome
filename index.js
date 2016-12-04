var app = angular.module('app', []);


var snd = new Audio("click-short.wav");

app.controller('MainCtrl', ["$interval", "$timeout", function ($interval, $timeout) {
    var self = this;


    self.onReset = function () {
        self.mode = "init";
        self.lastPress = null;
        self.interval = null;
        self.timeToNextBeat = null;
        $interval.cancel(self.beatTimer);
        self.beatTimer = null;
        self.timeSinceLastPress = null;
    };

    self.updateUiVariables = function () {
        if (self.lastPress) {
            self.timeSinceLastPress = new Date().getTime() - self.lastPress
        }
        if (self.interval) {
            self.timeToNextBeat = self.nextBeatTime - new Date().getTime();
            // self.progressPercent = 100.0 / self.interval * (self.interval- self.timeToNextBeat);
            self.progressPercent = 100.0 - 100.0 / self.interval * self.timeToNextBeat;
        } else {
            self.timeToNextBeat = null;
            self.progressPercent = null;
        }
    }

    self.getTimeToNextBeat = function () {
        console.log("getTimeToNextBeat");
        return;
    };

    self.onStart = function () {
        var now = new Date().getTime();
        self.mode = "measure";
        self.lastPress = now;

        self.onBeat();
    };

    self.onMeasure = function () {

        var now = new Date().getTime();
        self.mode = "play";
        self.interval = now - self.lastPress;
        self.lastPress = now;

        self.onBeat();

        if (self.beatTimer) {
            $interval.cancel(self.beatTimer);
        }
        if (self.interval) {
            self.beatTimer = $interval(function () {
                self.onBeat();
            }, self.interval);

        }

    };

    self.onBeat = function () {
        snd.play();
        self.nextBeatTime = new Date().getTime() + self.interval;
    };


    self.intervalPromise = $interval(function () {
        self.updateUiVariables();
    }, 33);


    self.onReset();


}])
;
