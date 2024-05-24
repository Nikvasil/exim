const SocialChildProject = require('../models/SocialChildProject');


const getSocialChildProjects = async (req, res) => {
    const socialChildProjects = await SocialChildProject.find({});
    res.json(socialChildProjects);
};


const getSocialChildProjectById = async (req, res) => {
    const socialChildProject = await SocialChildProject.findById(req.params.id);
    if (socialChildProject) {
        res.json(socialChildProject);
    } else {
        res.status(404).json({ message: 'Social child project not found' });
    }
};


module.exports = { getSocialChildProjects, getSocialChildProjectById };
