var accountSid = 'AC96d0ac3ffec1358d1e5418718eb0cbf7'; 
var authToken = 'dc2fb3da2b21469fabb95cc976ee5ed1';

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);
function sendSms(content, number) {
  content = "Unanswered mails from PU: "+ content.toString()
  return client.api.messages
    .create({
      body: content,
      to: number,
      from: '+48732483644',
    }).then(function(data) {
      console.log('Administrator notified');
    }).catch(function(err) {
      console.error('Could not notify administrator');
      console.error(err);
    });
}
module.exports = sendSms;

