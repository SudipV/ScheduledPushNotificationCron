const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  activityname:{type: String},
  time: {
    type: String,
  },
  days: {
    type: [],
  },
  notification: {},
});

const ScheduledNotification = mongoose.model("scheduledNotification", schema);

module.exports = ScheduledNotification