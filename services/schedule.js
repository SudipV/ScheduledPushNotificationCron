const _ = require("lodash");

const scheduleLib = require("node-schedule");
const notificationHub = require("./notificationHub");
const User = require("../models/User");
const ScheduledNotification = require("../models/ScheduledNotification");
//const notificationHub = require("./notificationHub");
const schedule = {};

schedule.getJobs = function () {
  return scheduleLib.scheduledJobs;
};

schedule.createSchedule = async function (data) {
  try {
    const scheduledNotification = new ScheduledNotification({
      activityname: data.activityname,
      time: data.time,
      days: data.days,
      notification: {
        title: data.title,
        body: data.body,
      },
    });

    await scheduledNotification.save();

    const dayOfWeek = data.days.join(",");
    const timeToSent = data.time.split(":");
    const hours = timeToSent[0];
    const minutes = timeToSent[1];

    const scheduleId = scheduledNotification._id.toString();
    const scheduleTimeout = `${minutes} ${hours} * * ${dayOfWeek}`;

    scheduleLib.scheduleJob(scheduleId, scheduleTimeout, async () => {
      const users = await User.find({});

      const chunks = _.chunk(users, 500);

      const promises = chunks.map((u) => {
        const tags = [];

        u.forEach((item) => {
          if (item.tag) {
            tags.push(item.tag);
          }
        });

        const payload = {
          tags,
          title: data.title,
          body: data.body,
        };

        return notificationHub.createNotification(payload);
        //return firebaseAdmin.sendMulticastNotification(payload);
      });

      await Promise.all(promises);
    });
  } catch (e) {
    throw e;
  }
};

schedule.reSchedule = async function () {
  try {
    const scheduledNotifications = await ScheduledNotification.find({});

    scheduledNotifications.forEach((scheduledNotification) => {
      const dayOfWeek = scheduledNotification.days.join(",");
      const timeToSent = scheduledNotification.time.split(":");
      const hours = timeToSent[0];
      const minutes = timeToSent[1];

      const scheduleId = scheduledNotification._id.toString();
      const scheduleTimeout = `${minutes} ${hours} * * ${dayOfWeek}`;

      scheduleLib.scheduleJob(scheduleId, scheduleTimeout, async () => {
        const users = await User.find({});

        const chunks = _.chunk(users, 500);

        const promises = chunks.map((u) => {
          const tags = [];

          u.forEach((item) => {
            if (item.tag) {
              tags.push(item.tag);
            }
          });

          const payload = {
            tags,
            title: scheduledNotification.notification.title,
            body: scheduledNotification.notification.body,
          };

          return notificationHub.createNotification(payload);
          //return firebaseAdmin.sendMulticastNotification(payload);
        });

        await Promise.all(promises);
      });
    });
  } catch (e) {
    throw e;
  }
};

module.exports = schedule;