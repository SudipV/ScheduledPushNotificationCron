const xml2js = require('xml2js')
var crypto = require('crypto');
var utf8 = require('utf8');
var axios = require("axios");
const { result } = require('lodash');
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

var uri = "https://revedainotification.servicebus.windows.net/RevedAINotification";
var getSelfSignedToken = createSharedAccessToken(uri, saName, saKey);

function createSharedAccessToken(uri, saName, saKey) {
    if (!uri || !saName || !saKey) {
        throw "Missing required parameter";
    }
    var encoded = encodeURIComponent(uri);
    var now = new Date();
    var week = 60 * 60 * 24 * 7;
    var ttl = Math.round(now.getTime() / 1000) + week;
    var signature = encoded + '\n' + ttl;
    var signatureUTF8 = utf8.encode(signature);
    var hash = crypto.createHmac('sha256', saKey).update(signatureUTF8).digest('base64');
    return 'SharedAccessSignature sr=' + encoded + '&sig=' +
        encodeURIComponent(hash) + '&se=' + ttl + '&skn=' + saName;
}



function getRegistrations() {
    return axios.get('https://revedainotification.servicebus.windows.net/RevedAINotification/registrations?api-version=2015-01', {
        headers: {
            'x-ms-version': '2015-01',
            'Authorization': getSelfSignedToken

        }
    })
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error);
            return Promise.reject(error);
        });
}

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const readAllregistrations = async () => {
    const registrations = await getRegistrations();
    xml2js.parseString(registrations,(err,result)=>{
        if(err){
            throw err;
        }
    var json=JSON.stringify(result,null,4);
    console.log(json);
    var pasedJson=JSON.parse(json);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("notificationhub");
        //var myobj = { name: "Company Inc", address: "Highway 37" };
        dbo.collection("DeviceToken").insert(pasedJson, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
      });
});
   //console.log("This the xml response" + '\n' + registrations);
};

readAllregistrations();









