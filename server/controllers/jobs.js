const Job = require("../models/Job");

const createJob = async (req, res) => {
    try {
        const job = await Job.create(req.body)
        res.status(200).json({job})
    } catch (error) {
        res.status(500).json({error: error})
    }
}

const getJobs = async (req, res) => {
    try {
        const job = await Job.find({})
        res.status(200).json({count:job.length, job})
    } catch (error) {
        res.status(500).json({error: error})
    }
}

const getJobByCategory = async (req, res) => {
    const {category} = req.query
    try {
        const job = await Job.find({category})
        res.status(200).json({count:job.length, job})
    } catch (error) {
        res.status(500).json({error: error})
    }
}

const getJobByLocation = async (req, res) => {
    const {location, category} = req.query
    if (category) {
        try {
            const job = await Job.find({location, category})
            res.status(200).json({count:job.length, job})
        } catch (error) {
            res.status(500).json({error: error})
        }
    }else{
        try {
            const job = await Job.find({location})
            res.status(200).json({count:job.length, job})
        } catch (error) {
            res.status(500).json({error: error})
        }
    }
}

const getJobBySearch = async (req, res) => {
    let searchTerm = req.query.searchTerm
        try {
            const job = await Job.find({ $text: {$search: searchTerm, $diacriticSensitive: true } })
            res.status(200).json({count:job.length, job})
        } catch (error) {
            res.status(500).json({error: error})
        }
}

const getSingleJob = async (req, res) => {
    const {id} =  req.params
    try {
        const job = await Job.findById({_id: id})
        res.status(200).json({job})
    } catch (error) {
        res.status(500).json({error: error})
    }
}

const updateJob = async (req, res) => {
    const {id} =  req.params
    try {
        const job = await Job.findByIdAndUpdate({_id: id}, req.body, {new:true})
        res.status(200).json({job})
    } catch (error) {
        res.status(500).json({error: error})
    }
}
    
const deleteJob = async (req, res) => {
    const {id} =  req.params
    try {
        const job = await Job.findByIdAndDelete({_id: id})
        res.status(200).json({job})
    } catch (error) {
        res.status(500).json({error: error})
    }
}
    

module.exports = {createJob, getJobs, getJobByCategory, getJobByLocation, getJobBySearch, getSingleJob, updateJob, deleteJob}