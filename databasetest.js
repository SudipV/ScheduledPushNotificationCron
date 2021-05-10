const { MongoClient } = require("mongodb");
const moment = require("moment");

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb://localhost:27017/";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();

    const database = client.db('schedule_notification');
    const notifications = database.collection('schedulednotifications');

    // Query for a movie that has the title 'Back to the Future'
    //const timequery = { time: '18:55' };
    //const dayquery={days: ["6"]};
    const filterParams={time:'18:55', days: 5}
    //const notificationDetail = await notifications.findOne(timequery);
    const notificationDetail = await notifications.findOne(filterParams);

    console.log(notificationDetail);
    console.log(moment());
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);