var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var calendar = google.calendar('v3');
var moment = require('moment');

function getOnCall(auth) {
  var events = []
  return new Promise((resolve, reject) => {
    var getEvents = function (auth) {
      calendar.events.list({
        auth: auth,
        calendarId: 'primary',
        timeMin: moment().format("YYYY-MM-DDT00:00:00.000Z"),
        timeMin: moment().format("YYYY-MM-DDT23:59:00.000Z"),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime'
      }, function (err, response) {
        if (err) {
          console.log('The API returned an error: ' + err);
          reject()
        }
        response.items.forEach((item) => {
          events.push(item.summary)
        })
        resolve(events)
      })
    }
    getEvents(auth)
  });
}
module.exports = getOnCall;