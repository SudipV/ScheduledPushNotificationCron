var mongoose = require ('mongoose')

var timeOptions = {
    timeStamps: {createAt: 'Activity Started', updatedAt: 'Activity Updated'},
};
var activitySchema = new mongoose.Schema({
    ActivityName: String,
    ActivityDuration: String,
    ActivityTime: String,
    ActivityDay: String,
    ActivityIsConfirmed: Boolean,
    timeOptions
})

const Activity = mongoose.model('Acitivity', activitySchema);
module.exports = Activity;

