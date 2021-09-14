## Inviting Traders with offers

When a user creates an offer, he may invite his trading friends to look at the offer and trade with them.
Once an offer is created, the user will click a button on the offer card 'invite'. The invite button will pop up a small text box allowing the user to enter an email or tinance username and 'add' that person.

### Adding an invite to an offer

calling the new api call<br/>
`/v1/invitetrade.json?offerid=<offer-id>&emailuser=<email or username>`

will add the invited person and send an email with the offer.

A real example might be:
`/v1/invitetrade.json?offerid=17bc1d0f5b5-1279459973&emailuser=billyblogs@yahoo.co.uk`

### Listing the invited people

When an offer is displayed you can see which users have been invited.
`/v1/getmyoffers.json` data will now contains an extra field `invited` which contains a list of invited people. These people may be existing users or new users to sign up.

```json
...,
"invited":[{"id":10000000,"orderId":"17bc1d0f5b5-1279459973","email":"billyblogs@yahoo.co.uk",
"cid":0,
"emailSent":"2021-06-01 15:03:55.012"}
],
...

```

Each invited entry has the following fields:

`email` - this will be an email address if `cid` is zero (0) or a Tinance username, if `cid` is non zero.<br/>
`id` - The database identifier. (Not useful to UI)<br/>
`orderId` - The offer id will the same as the offer container (not useful to UI)<br/>
`emailSent` if not empty, indicates an email has been sent to the user.

## UI Todo for new user interaction

The email is sent to the new user as a hyperlink and includes an order-id. The link will be:

`tinance.io/markets/{order-id}`

The UI calls `v1/public/getoffers.json` as before, except we have added `wildcardId` to the webfilterobject :

```json
{
  "buy": true,
  "fromamt": 0,
  "fromccyid": 0,
  "payTypes": [],
  "sell": true,
  "status": [],
  "toccyid": 0,
  "wildcardId": "<the order-id from url>"
}
```

The UI must set the wildcardId using the {order-id} in the url.
A simple way to test this function would be to use an existing order-id from the markets or offers page browse the url `tinance.io/markets/{order-id}`
