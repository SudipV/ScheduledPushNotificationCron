var xml2js = require('xml2js');
var crypto = require('crypto');
var utf8 = require('utf8');
var axios = require("axios");
var CryptoJS=require("crypto-js");
const { response } = require('express');
var connectionString = "Endpoint=sb://revedainotification.servicebus.windows.net/;SharedAccessKeyName=DefaultFullSharedAccessSignature;SharedAccessKey=ImPrqLEcBv9emvc32nM3+t7uuZiTeVnLUa2aCI+w9zs="
var parts = connectionString.split(';');
if (parts.length != 3)
    throw "Error parsing connection string";

parts.forEach(function (part) {
    if (part.indexOf('Endpoint') == 0) {
        endpoint = 'https' + part.substring(11);
    } else if (part.indexOf('SharedAccessKeyName') == 0) {
        saName = part.substring(20);
    } else if (part.indexOf('SharedAccessKey') == 0) {
        saKey = part.substring(16);
    }
});

console.log(endpoint);
console.log(saName);
console.log(saKey);
var uri="https://revedainotification.servicebus.windows.net/RevedAINotification";
var getSelfSignedToken= createSharedAccessToken(uri,saName,saKey);

function createSharedAccessToken(uri, saName, saKey) { 
    if (!uri || !saName || !saKey) { 
            throw "Missing required parameter"; 
        } 
    var encoded = encodeURIComponent(uri); 
    var now = new Date(); 
    var week = 60*60*24*7;
    var ttl = Math.round(now.getTime() / 1000) + week;
    var signature = encoded + '\n' + ttl; 
    var signatureUTF8 = utf8.encode(signature); 
    var hash = crypto.createHmac('sha256', saKey).update(signatureUTF8).digest('base64'); 
    return 'SharedAccessSignature sr=' + encoded + '&sig=' +  
        encodeURIComponent(hash) + '&se=' + ttl + '&skn=' + saName; 
}

const instance = axios.create({
    baseURL: uri,
    timeout: 100000,
    headers: {
        'x-ms-version':'2015-01',
        'Content-type':'application/json; charset=utf-8',
        'Authorization': getSelfSignedToken}
  });

instance.get('/registrations?api-version=2015-01')
  .then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    // handle error
    //console.log(error);
  });