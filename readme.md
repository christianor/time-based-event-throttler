# TimeBasedEventThrottler

Throttles the events sent by an EventEmitter (.emit() => .on()) so that only one passes after a period of time. After this
the throttler will wait again for that period of time and relay the next event that happens after it and so on.
Use case might be IOT devices that tend to send many messages and u want to easily relay only one message (e.g. by mail) 
every 15 minutes to the client.

## Installation

Install via npm
`npm install time-based-event-throttler --save`

## Usage

```
const EventThrottler = require('time-based-event-throttler');
// immediately after creation via new starts listening to emitted events
new EventThrottler(eventEmitter, eventName, callback, timeInterval)
```
The default configurtion will emit the first event that happens after the configured (timeInterval) period
of time has passed. If u add "true" as last parameter the first event that gets catched by the throttler, 
even if it is before the time period has passed will get relayed.