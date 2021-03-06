const express = require('express');
const router = express.Router();

const index = require('../controllers/index');
const privacy = require('../controllers/privacy');
const terms = require('../controllers/terms');
const legal = require('../controllers/legal');
const contribute = require('../controllers/contribute');
const thanks = require('../controllers/thanks');

router.get('/(:page([0-9]+))?', index);
router.get('/privacy', privacy);
router.get('/terms', terms);
router.get('/legal', legal);
router.get('/contribute', contribute);
router.get('/thanks', thanks);

module.exports = router;
