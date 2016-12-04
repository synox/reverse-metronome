var app = angular.module('app', ["ngSanitize"]);


var snd = new Audio("Tick-DeepFrozenApps-397275646.mp3"); // buffers automatically when created

app.controller('MainCtrl', ["$scope", "$interval", "$timeout", "$log", function ($scope, $interval, $timeout, $log) {
    var self = this;


    self.onReset = function () {
        self.lastPress = null;
        self.interval = null;
        self.timeToNextBeat = null;
        $interval.cancel(self.beatTimer);
        self.beatTimer = null;
    };

    self.getTimeToNextBeat = function () {
        return self.nextBeatTime - new Date().getTime();
    };

    self.onPress = function () {
        var now = new Date().getTime();
        if (self.lastPress) {
            self.interval = now - self.lastPress;
        }
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

    self.getNextBeatTime = function () {
        /*
         * Sample:
         * now: 450
         * diff: 100
         * lastPress: 200
         *
         * result: 500
         */
        var now = new Date().getTime();
        var milisSinceLastPress = now - self.lastPress;
        var milisSinceLastBeat = milisSinceLastPress % self.interval; // 50
        var lastBeat = now - milisSinceLastBeat;
        return lastBeat + self.interval;
    };


    // self.intervalPromise = $interval(function () {
    //     if (self.interval) {
    //         self.timeToNextBeat = self.getNextBeatTime() - new Date().getTime();
    //     } else {
    //         self.timeToNextBeat = null;
    //     }
    // }, 10);


    self.onReset();


}]);
