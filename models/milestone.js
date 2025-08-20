const mongoose  = require('mongoose');

const milestoneSchema = new mongoose.Schema({
    milestoneId: {type: String,required:true,unique:true},
    title:{type:String,required:true},
    project:{type:String,required:true},
    description: {type:String},
    dueDate:{type:Date,required:true},
    owner:{
        name:{type:String,required:true},
        email:{type:String}
    },
    status:{type:String,enum:['pending','In progress','Submitted','Completed'],default:'pending'},
    payment:{
        amount:{type:Number,default:0},
        percentage:{type:Number,default:0},
        status:{type:String,enum:['Not Due','Due','Invoiced','Paid'],default:'Not Due'}
    },
    attachments:[{type:String}]
}, {timestamps:true});

module.exports = mongoose.model('Milestone', milestoneSchema);
