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
    let that = this;

    emitter.on(emittedEventName, function() { that.interceptor.apply(that, arguments) } );
    this.stopwatch.start();
}

TimeBasedEventThrottler.prototype.interceptor = function() {
    if (this.stopwatch.read() > this.timePeriod) {
        this.callback.apply(this, arguments);
        this.stopwatch.reset();
        this.stopwatch.start();
    }
}

module.exports = TimeBasedEventThrottler;
