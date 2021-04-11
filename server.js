
var schedule = require('node-schedule');
var azure = require('azure-sb');
const {MongoClient} = require('mongodb');

var notificationHubService = azure.createNotificationHubService('RevedAINotification','Endpoint=sb://revedainotification.servicebus.windows.net/;SharedAccessKeyName=DefaultFullSharedAccessSignature;SharedAccessKey=ImPrqLEcBv9emvc32nM3+t7uuZiTeVnLUa2aCI+w9zs=');


  var j = schedule.scheduleJob('04 * * * *', function(){
    var payload = {
      data: {
        message: 'Hello! sudip you have a milestone due today for you Math Asignment'
      }
    };
    notificationHubService.fcm.send("username:sudip", payload, function(error){
      if(!error){
        console.log("Notification sent");
      }
    });
    
  });
async function main(){
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
  const uri = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false";


  const client = new MongoClient(uri);

  try {
      // Connect to the MongoDB cluster
      await client.connect();

      // Make the appropriate DB calls
      await  listDatabases(client);

  } catch (e) {
      console.error(e);
  } finally {
      await client.close();
  }
}

main().catch(console.error);

async function listDatabases(client){
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
