var request = require('request');

function opedDutyAlert(content) {

    var settings = {
        "event_type": "trigger",
        "title": "Premium member Alert",
        "service_key": "17528f2a51a44b7806c9ca8d61c469e7f72b8b41",
        "incident_key": "test",
        "description": content,
        "details": "test",
        "occurred_at": Date.now()
    }

    request.post(
        'http://localhost:8000/api/create_event', {
            json: settings
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body)
            }
        }
    );
}
module.exports = opedDutyAlert;