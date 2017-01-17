/*jslint node: true */
"use strict";

const TimeBasedEventThrottler = require('../lib/TimeBasedEventThrottler.js');
const assert = require('assert');
const sinon = require('sinon');
const EventEmitter = require('events').EventEmitter;
const Stopwatch = require('statman-stopwatch');

describe('TimeBasedEventThrottler', function() {
    it('it throws an error if the first parameter is not of type EventEmitter', function() {
        assert.throws(function() { new TimeBasedEventThrottler("notAnEmitter"); }, Error, 
            "first parameter has to be of type EventEmitter");
    });

    it('blocks events and lets pass only one after an minimum of 5 seconds', function() {
        this.timeout(15000);
        let spy = sinon.spy();
        let emitter = new EventEmitter();
        let stopwatch = new Stopwatch();

        let throttler = new TimeBasedEventThrottler(emitter, 'newData', spy, 5000);
        stopwatch.start();

        while (true) {
            if (stopwatch.read() >= 5000) {
                stopwatch.stop();
                break;
            }
            emitter.emit('newData');
        }

        assert.ok(spy.calledOnce);
    });
});