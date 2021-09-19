## System Status

It is important to show the user the trading status. For example: system is running OK, system upgrade or maintenance in progress etc.

It is also important to stop some or all of the user request if the system is not operating. For example, stop deposits if system is being upgraded.

### System Status websocket

The UI already connects to the server and subscribes for deposit messages. The system status is available to subscribe in the same way using `/system/status`

```javascript
const subscription = stompClient.subscribe(`/system/status`, () => {});
```

### Returned Subscription data

```json
{
  "deposit": true, // boolean user can deposit
  "sendFiat": true, // boolean user can send fiat
  "releaseFund": true // boolean user can release fund
}
```

- When the deposit status is false, we need to disable deposit button on the tradelist page.
- When sendFiat is false we need to disable sendFiat button
- When releaseFund is false we need to disable releaseFund button

## System Messages

We also use `/system/message` subscription to display system wide messages to the user - in the UI header.

### Returned Subscription data

```json
{
  "msgid": 1, // msg id
  "msg": "System is being upgraded" // message string to display in the header UI
}
```

We use the msgid to indicate a new message if the last msgid is different or a message update if the last msgid and this msgis is the same. This is useful to display a visual flash or attention UI effect upon a new message.

# Testing on dev.tinance.io

The system status messages are working on `dev.tinance.io` for test purposes. System status and system message updates are sent every 10 seconds. (This is for test only, in production the updates will be each minute)
The messages change every 100 seconds from a working system to fail - for testing.
