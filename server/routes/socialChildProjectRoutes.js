const express = require('express');
const router = express.Router();
const {getSocialChildProjects, getSocialChildProjectById} = require('../controllers/socialChildProjectController');


router.get('/', getSocialChildProjects);
router.get('/:id', getSocialChildProjectById);


module.exports = router;
