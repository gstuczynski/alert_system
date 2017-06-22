var google = require('googleapis');
var gapi = google.gmail('v1');
var fs = require('fs');
const util = require('util')

function shouldMessageBeAnswered(auth, userId, threadId) {
    return new Promise((resolve, reject) => {
        gapi.users.threads.get({
                auth: auth,
                'userId': userId,
                'id': threadId
            },
            function (err, response) {
                if (err) {
                    reject('The API returned an error: ' + err);
                    return;
                }
                var lastMail = response.messages.find((msg) => {
                    return response.historyId === msg.historyId
                })
                if (lastMail.labelIds.includes('SENT')) {
                    console.log(`Thread number:${threadId} has been answered`);
                    resolve(false);
                } else {
                    console.log(`Thread number:${threadId} needs to be answered`);
                    resolve(true);
                }
            });
    })
}
function getMessage(auth, userId, messageId) {
    return new Promise((resolve, reject) => {
        var request = gapi.users.messages.get({
            auth: auth,
            'userId': userId,
            'id': messageId,
            'format': "full"
        }, function (err, response) {
            if (err) {
                reject('The API returned an error: ' + err);
                return;
            }
            shouldMessageBeAnswered(auth, userId, response.threadId)
                .then(should_answer => {
                    if (should_answer) {
                        var result = [];
                        response.payload.headers.map(header => {
                            if (header.name == "From") {
                                result.push(header.value);
                            }

                            fs.appendFile("./resp2", util.inspect(response, false, null))
                        })
                        result.push(response.snippet)
                        resolve(result);
                    } else {
                        resolve();
                    }
                })
        });
    });
}

module.exports = getMessage;