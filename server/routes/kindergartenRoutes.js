const express = require('express');
const router = express.Router();
const { getKindergartens, getKindergartenById } = require('../controllers/kindergartenController');


router.get('/', getKindergartens);
router.get('/:id', getKindergartenById);


module.exports = router;
