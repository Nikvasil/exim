const SocialTeenagerProject = require('../models/SocialTeenagerProject');


const getSocialTeenagerProjects = async (req, res) => {
    const socialTeenagerProjects = await SocialTeenagerProject.find({});
    res.json(socialTeenagerProjects);
};


const getSocialTeenagerProjectById = async (req, res) => {
    const socialTeenagerProject = await SocialTeenagerProject.findById(req.params.id);
    if (socialTeenagerProject) {
        res.json(socialTeenagerProject);
    } else {
        res.status(404).json({ message: 'Social teenager project not found' });
    }
};


module.exports = { getSocialTeenagerProjects, getSocialTeenagerProjectById };
