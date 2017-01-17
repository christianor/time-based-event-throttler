const Stopwatch = require('statman-stopwatch');

const TimeBasedEventThrottler = function(emitter, emittedEventName, callback, timePeriod) {
    if (!(emitter instanceof require("events").EventEmitter)) {
        throw new Error("first parameter has to be of type EventEmitter");
    }

    this.emitter = emitter;
    this.emittedEventName = emittedEventName;
    this.callback = callback;
    this.timePeriod = timePeriod;

    this.stopwatch = new Stopwatch();

    emitter.on(emittedEventName, () => { this.interceptor() } );
    this.stopwatch.start();
}

TimeBasedEventThrottler.prototype.interceptor = function() {
    if (this.stopwatch.read() > this.timePeriod) {
        this.callback();
        this.stopwatch.reset();
        this.stopwatch.start();
    }
}

module.exports = TimeBasedEventThrottler;
