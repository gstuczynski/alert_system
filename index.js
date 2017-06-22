var fs = require('fs');
var listMessages = require('./listMessages');
var sendSms = require('./sms-twilio');
var getMessage = require('./getMessage');
var _ = require('underscore');
var getOnCall = require('./getOnCall');
var authorize = require('./authorize')

fs.readFile('client_secret.json', function processClientSecrets(err, content) {
    if (err) {
        console.log('Error loading client secret file: ' + err);
        return;
    }
    var oncallNumber;
    authorize(JSON.parse(content), function (auth) {
        listMessages(auth, 'me', 'from:wpkonto@wp.pl')
            .then(msgs => Promise.all(
                msgs.map(msg => getMessage(auth, 'me', msg))
            ))
            .then(_.compact)
            .then(msgs => {
                getOnCall(auth).then(ev => {
                    console.log(ev)
                })
            });
    });
});