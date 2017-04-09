var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var taskSchema = new Schema({
    userEmail : String,
    task : String,
    completed : Boolean,
    startDate : Date,
    endDate : Date
    
    
});

var Task =mongoose.model('Task',taskSchema);

module.exports = Task;