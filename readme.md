# TimeBasedEventThrottler

Throttles the events sent by an EventEmitter (.emit() => .on()) so that only one in a defined period of time passes.
Use case might be IOT devices that tend to send many messages and relaying only one message (e.g. by mail) to the client.

## Installation

Install via npm
`npm install time-based-event-throttler --save`

## Usage

```
const EventThrottler = require('time-based-event-throttler');
// immediately after create via new starts listening to emitted events
new EventThrottler(eventEmitter, eventName, callback, timeInterval)
```
The default configurtion will emit the first event that happens after the configured (timeInterval) period
of time has passed. If u add "true" as last parameter the first event that gets catched by the throttler, even it is before the
time period has passed will get relayed.