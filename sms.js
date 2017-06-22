var SMSAPI = require('smsapi'),
    smsapi = new SMSAPI();

function sendSms(content) {
    smsapi.authentication
        .login('wpkonto@wp.pl', '12345')
        .then(sendMessage)
        .then(displayResult)
        .catch(displayError);

    function sendMessage() {
        msg = `Mail from ${content[0]} is recived: "${content[1]}"`;
        if(msg.length > 120){
            msg = msg.substring(0,120) + "...'";
        }
        msg = msg + " Please answer ASAP!"

        return smsapi.message
            .sms()
            .from('Info')
            .to('513433894')
            .message(msg)
            .execute(); 
    }

    function displayResult(result) {
        console.log(result);
    }

    function displayError(err) {
        console.error(err);
    }
}
module.exports = sendSms;