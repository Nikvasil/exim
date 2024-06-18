const Kindergarten = require('../models/Kindergarten');


const getKindergartens = async (req, res) => {
    const kindergartens = await Kindergarten.find({});
    res.json(kindergartens);
};


const getKindergartenById = async (req, res) => {
    const kindergarten = await Kindergarten.findById(req.params.id);
    if (kindergarten) {
        res.json(kindergarten);
    } else {
        res.status(404).json({message: 'Kindergarten not found'});
    }
};


module.exports = {getKindergartens, getKindergartenById};