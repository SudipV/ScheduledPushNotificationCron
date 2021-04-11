
var axios = require("axios");
var CryptoJS=require("crypto-js")
var connectionString = "Endpoint=sb://revedainotification.servicebus.windows.net/;SharedAccessKeyName=DefaultFullSharedAccessSignature;SharedAccessKey=ImPrqLEcBv9emvc32nM3+t7uuZiTeVnLUa2aCI+w9zs="
var parts = connectionString.split(';');
if (parts.length != 3)
    throw "Error parsing connection string";

parts.forEach(function (part) {
    if (part.indexOf('Endpoint') == 0) {
        endpoint = 'https' + part.substring(11);
    } else if (part.indexOf('SharedAccessKeyName') == 0) {
        sasKeyName = part.substring(20);
    } else if (part.indexOf('SharedAccessKey') == 0) {
        sasKeyValue = part.substring(16);
    }
});

console.log(endpoint);
console.log(sasKeyName);
console.log(sasKeyValue);





var getSelfSignedToken = function(targetUri, sharedKey, ruleId,
    expiresInMins) {
    targetUri = encodeURIComponent(targetUri.toLowerCase()).toLowerCase();
    
    // Set expiration in seconds
    var expireOnDate = new Date();
    expireOnDate.setMinutes(expireOnDate.getMinutes() + expiresInMins);
    var expires = Date.UTC(expireOnDate.getUTCFullYear(), expireOnDate
    .getUTCMonth(), expireOnDate.getUTCDate(), expireOnDate
    .getUTCHours(), expireOnDate.getUTCMinutes(), expireOnDate
    .getUTCSeconds()) / 1000;
    var tosign = targetUri + '\n' + expires;
    
    // using CryptoJS
    var signature = CryptoJS.HmacSHA256(tosign, sharedKey);
    var base64signature = signature.toString(CryptoJS.enc.Base64);
    var base64UriEncoded = encodeURIComponent(base64signature);
    
    // construct autorization string
    var token = "SharedAccessSignature sr=" + targetUri + "&sig="
    + base64UriEncoded + "&se=" + expires + "&skn=" + ruleId;
    //console.log("signature:" + token);
    return token;
    };

    var targetUri="https://revedainotification.servicebus.windows.net/RevedAINotification";
    var sharedKey=sasKeyName;
    var ruleId=sasKeyValue;
    var expiresInMins=10;
var token =getSelfSignedToken(targetUri,sharedKey,ruleId,expiresInMins);
//console.log(getSelfSignedToken(targetUri,sharedKey,ruleId,expiresInMins));

const instance = axios.create({
    baseURL: targetUri,
    timeout: 100000,
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        //'x-ms-date': 'wns/raw',
        'ServiceBusNotification-Format' : 'gcm',
        'ServiceBusNotification-Tags' : 'username:sudip',
        'ServiceBusNotification-ScheduleTime': '2021-02-02T22:34',
        'Authorization': token}
  });

  var payload = {
    data: {
      message: 'Hello! This is the tag expression with two tags and two gcm id with invalid'
    }
  };


instance.post('/schedulednotifications?api-version=2016-07', payload)
  .then(function (response) {
    console.log(response);
  }).catch(function (error) {
    // handle error
    console.log(error);
  });
