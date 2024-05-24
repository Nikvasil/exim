const express = require('express');
const router = express.Router();
const { getSchools, getSchoolById } = require('../controllers/schoolController');


router.get('/', getSchools);
router.get('/:id', getSchoolById);


module.exports = router;
