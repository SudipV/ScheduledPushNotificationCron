
var azure = require('azure-sb');
var notificationHubService = azure.createNotificationHubService('RevedAINotification','Endpoint=sb://revedainotification.servicebus.windows.net/;SharedAccessKeyName=DefaultFullSharedAccessSignature;SharedAccessKey=ImPrqLEcBv9emvc32nM3+t7uuZiTeVnLUa2aCI+w9zs=');
var GCM_REGISTRATION_ID ="dxNNjoL1QHKPB4ktcC-bUw:APA91bF2ywANJKTpsTdrYXn99trwsjvbTo9xbt-COWHVBd7MKahThg689ziXHBLrlp1aOJQw-E1cYLDPQqp3d2g4b_x_IMcc5y7QsWG4duucRlV5sKNN6O9vm9b1DcxZchYgZrIAq-g6";

// notificationHubService.listRegistrations(function(err, registrations) {
//     console.log((registrations));
//   });



// notificationHubService.deleteRegistration("2288605904291218525-3410176014697876534-2", function(err, response){
//   if(err){
//     console.log("Error in registration deletion", err)
//   }
//   console.log("Registration deletion successful", response);
// })

// notificationHubService.createRegistrationId(function(err, response){
//   if(err){
//     console.log(err);
//   }
//   console.log("Registration created successfully", response)
// })


// var registration={
//   RegistrationId: "7318144153066374204-7358704925967777053-1",
//   GcmRegistrationId: "sudip12345",
//   Tags: "username:sudip"
// };



// var payload = {
//   notification: {
//     title: "General Health Well-Being",
//     body: "You have a running schedule",
//     image: "./logo.png"
//   }
// };


var payload = {
  data: {
    message: 'Hello!'
  }
};
var temp="sudip"
// var payload ={
//   "message": {
//       "notification": {
//         "body": "YOUR MESSAGE BODY HERE",
//         "title": "YOUR MESSAGE TITLE HERE"
//       }
//   }
// };
var GCM_MESSAGE = {
	// "notification":{
	// 	"title": "Notification Hub Test Notification",
	// 	"body": "Hello"+temp+  "This is a sample notification delivered by Azure Notification Hubs.",
  //   "image": "./logo.png"
	// },
	"data":{
    "title": "Notification Hub Test Notification",
		"body": "Hello"+temp+  "This is a sample notification delivered by Azure Notification Hubs.",
		"property1": "sudip",
		"property2": 42
	},
  "android":{
    "icon":"string",
    "color":"#rrggbb"
  }
};
notificationHubService.gcm.send("lenovo", payload, function(error){
  if(!error){
    console.log("Notification sent");
  }
});




//var jsonPayload = "{\"data\" : { \"message\" : \"" + message + "\", \"badge\" : " + badge + ", \"sound\" : \"default\" }, \"acme1\" : \"bar\", \"acme2\" : 42 }";
// notificationHubService.gcm.createOrUpdateNativeRegistration("2941846765792511255-2624453970709233815-1","creckzXHMAw:APA91bFUXCoSaxJ0ctN8yNpXKVuqs9O5QstIelFNzmb__Rg4XXmrfan0bSchU_KKLvJUhlPhNpC6El_MQqa9mEQr7UiqPnkAKgaIQ384VR1hcxqCs2o1hKUj-BO6rN4eufm7ssrylcRx","anjan@123",function(err, response){
//   if(err){
//     console.log(err);
//   }
//   console.log("Registration created successfully", response)
// 

// var installation={
//   installationId: "1",
//   userID:"sudip_viper",
//   platform:"gcm",
//   pushChannel:"eS0SfBgK2ZQ:APA91bGPIxSWHAzbi6PJReNi6LsIVisUTj_NkLppoz2qJHT6fIZg3B4bL-KkJvyMJBTR3VstDN8HFXNzda49XG2FuRK4ksXTAvOzFt_kUmFhfR1LMXuEautAClAk9e5JhcUVi_CW_LL4",
//   tags: ["foo", "bar"]
// }

// notificationHubService.createOrUpdateInstallation(installation,function(err, response){
//   if(err){
//     console.log(err);

//   }

// console.log("Installation created successfully", response)
// });

///Registration using native approach

// var GCM_MESSAGE = {
// 	"notification":{
// 		"title": "Notification Hub Test Notification",
// 		"body": "Hello "+$(property1)+"This is a sample notification delivered by Azure Notification Hubs."
// 	},
// 	"data":{
// 		"property1": "sudip",
// 		"property2": 42
// 	}
// };

// if (GCM_REGISTRATION_ID) {
//   notificationHubService.gcm.createNativeRegistration(GCM_REGISTRATION_ID, "msi", (err, response) => {
//     if (err) {
//       console.log(err);
//       return;
//     }

//     console.log('Registration success');
//     console.log(JSON.stringify(response));

//     notificationHubService.gcm.send("msi", GCM_MESSAGE, (error, res) => {
//       if (error) {
//         console.log(error);
//         return;
//       }

//       console.log('Message sent');
//       console.log(JSON.stringify(res));
//     });
//   });
// }


///using template registration
