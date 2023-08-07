const express = require('express');
const { createJob, getJobs, getJobByCategory, getJobByLocation, getJobBySearch,getSingleJob, updateJob, deleteJob } = require('../controllers/jobs');
const router = express.Router()


router.post('/create', createJob)
router.get('/get', getJobs)
router.get('/getJob', getJobByCategory)
router.post('/search', getJobBySearch)
router.get('/', getJobByLocation)
router.get('/get/:id', getSingleJob)
router.put('/edit/:id', updateJob)
router.delete('/delete/:id', deleteJob)

module.exports = router