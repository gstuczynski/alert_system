var fs = require('fs');
var listMessages = require('./listMessages');
var sendSms = require('./sms-twilio');
var getMessage = require('./getMessage');
var _ = require('underscore');
var getOnCall = require('./getOnCall');
var authorize = require('./authorize')
var openDutyAlert = require('./openDutyAlert')

fs.readFile('client_secret.json', function processClientSecrets(err, content) {
    if (err) {
        console.log('Error loading client secret file: ' + err);
        return;
    }
    authorize(JSON.parse(content), function (auth) {
        listMessages(auth, 'me', 'from:wpkonto@wp.pl')
            .then((msgs) => {
                msgs.forEach(msg => {
                    getMessage(auth, 'me', msg)
                        .then((content) => {
                            openDutyAlert(content);
                        })
                })
            })
    });
});