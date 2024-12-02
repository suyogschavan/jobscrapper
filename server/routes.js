const express = require('express');
const router = express.Router();
const controller = require('./controller');

// Define routes
router.get('/jobs', controller.getJobs); // to get jobs
router.post('/jobs', controller.createJob); // to insert jobs
// router.put('/jobs/:id', controller.updateJob);  // to update a job
// router.delete('/jobs/:id', controller.deleteJob);  // to delete a job

module.exports = router;
