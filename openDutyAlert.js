var request = require('request');

var settings = 
{
    "event_type": "trigger",
    "title": "The server is on fire.",
    "service_key": "17528f2a51a44b7806c9ca8d61c469e7f72b8b41",
    "incident_key": "test647",
    "description": "Server on fire!",
    "details": "test",
    "occurred_at": "2017-06-21 20:20"
}

request.post(
    'http://localhost:8000/api/create_event',
    { json: settings },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        }
    }
);