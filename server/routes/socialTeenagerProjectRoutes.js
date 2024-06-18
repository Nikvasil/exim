const express = require('express');
const router = express.Router();
const {
    getSocialTeenagerProjects,
    getSocialTeenagerProjectById
} = require('../controllers/socialTeenagerProjectController');


router.get('/', getSocialTeenagerProjects);
router.get('/:id', getSocialTeenagerProjectById);


module.exports = router;
