var azure = require('azure-sb');

var notificationHubService = azure.createNotificationHubService('RevedAINotification','Endpoint=sb://revedainotification.servicebus.windows.net/;SharedAccessKeyName=DefaultFullSharedAccessSignature;SharedAccessKey=ImPrqLEcBv9emvc32nM3+t7uuZiTeVnLUa2aCI+w9zs=');

notificationHubService.listRegistrations(function(err, registrations) {
    console.log((registrations));
  });

