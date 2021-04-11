
var azure = require('azure-sb');

var notificationHubService = azure.createNotificationHubService
('RevedAINotification','Endpoint=sb://revedainotification.servicebus.windows.net/;SharedAccessKeyName=DefaultFullSharedAccessSignature;SharedAccessKey=ImPrqLEcBv9emvc32nM3+t7uuZiTeVnLUa2aCI+w9zs=');

var notificationHub={};
notificationHub.createNotification = function (payload) {
const message = {
    notification: {
        title: payload.title,
        body: payload.body
    }
};
notificationHubService.gcm.send(payload.tag, message, function(error){
    if(!error){
      console.log("Notification sent");
    }
});
};

module.exports =notificationHub;


