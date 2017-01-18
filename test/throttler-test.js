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

    it('blocks events and lets pass only 1 after an minimum of 1 second', function() {
        let spy = sinon.spy();
        let emitter = new EventEmitter();
        let stopwatch = new Stopwatch();
        const TIME_PERIOD = 1000;

        let throttler = new TimeBasedEventThrottler(emitter, 'newData', spy, TIME_PERIOD);
        stopwatch.start();

        while (true) {
            // plus buffer to make sure the call got through
            if (stopwatch.read() >= TIME_PERIOD + 100) {
                stopwatch.stop();
                break;
            }
            emitter.emit('newData');
        }

        assert.ok(spy.calledOnce);
    });

    it('blocks events and lets pass 2 after an minimum of 1 second and throttleAfterFirstEvent true', function() {
        let spy = sinon.spy();
        let emitter = new EventEmitter();
        let stopwatch = new Stopwatch();
        const TIME_PERIOD = 1000;

        let throttler = new TimeBasedEventThrottler(emitter, 'newData', spy, TIME_PERIOD, true);
        stopwatch.start();

        while (true) {
            if (stopwatch.read() >= TIME_PERIOD + 100) {
                stopwatch.stop();
                break;
            }
            emitter.emit('newData');
        }
        console.log(spy.callCount);
        assert.ok(spy.calledTwice);
    });

    it('passes arguments to the destination callback', function(done) {
        let emitter = new EventEmitter();
        let throttler = new TimeBasedEventThrottler(emitter, 'newData', 
            (data) => {
                assert.notEqual(undefined, data);
                assert.equal(5, data.x);
                done(); 
            }, 0);


        emitter.emit('newData', { "x": 5 });
    });
});