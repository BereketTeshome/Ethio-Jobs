const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    salary:{
        type: String,
        required: true
    },
    jobType:{
        type: String,
        required: true
    },
    jobDuration:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true,
        enum:['frontend', 'backend', 'fullstack']
    }
},{
    timestamps: true
}
)

JobSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model("Jobs", JobSchema)