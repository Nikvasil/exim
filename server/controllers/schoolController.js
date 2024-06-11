const School = require('../models/School');


const getSchools = async (req, res) => {
    const schools = await School.find({});
    res.json(schools);
};


const getSchoolById = async (req, res) => {
    const school = await School.findById(req.params.id);
    if (school) {
        res.json(school);
    } else {
        res.status(404).json({ message: 'School not found' });
    }
};


module.exports = { getSchools, getSchoolById };