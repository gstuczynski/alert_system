var google = require('googleapis');
var gapi = google.gmail('v1');
function listMessages(auth, userId, query) {
    return new Promise((resolve, reject) => {
        var idsMsgs = [];
        var getPageOfMessages = function (reqParams) {
            gapi.users.messages.list(reqParams, function (err, response) {
                if (err) {
                    reject('The API returned an error: ' + err);
                    return;
                }
                response.messages.map(msg => {
                    console.log(msg)
                    idsMsgs.push(msg.id)
                });
                if (response.nextPageToken) {
                    getPageOfMessages({
                        auth: auth,
                        'userId': userId,
                        'pageToken': response.nextPageToken,
                        'q': query
                    });
                } else {
                    resolve(idsMsgs);
                }
            });
        };
        getPageOfMessages({
            auth: auth,
            'userId': userId,
            'q': query
        });
    });
}
module.exports = listMessages;