const Job = require('./models/job');

// To get all jobs
exports.getJobs = async (req, res) => {
    try{
        const jobs = await Job.find();
        res.json(jobs);
    }catch(err) {
        res.status(500).json({message:err.message});
    }
};

// To create new job
exports.createJob = async (req, res) =>{
    const job = new Job({
        title:req.body.title,
        company: req.body.company,
        location: req.body.location,
        link: req.body.link,
    });

    try {
        const newJob = await job.save();
        res.status(201).json(newJob);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
