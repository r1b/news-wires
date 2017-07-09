const express = require('express');
const router = express.Router();

const index = require('../controllers/index');
const privacy = require('../controllers/privacy');
const terms = require('../controllers/terms');
const legal = require('../controllers/legal');
const contribute = require('../controllers/contribute');
const thanks = require('../controllers/thanks');

router.get('/(:page([0-9]+))?', index);
router.get('/privacidad', privacy);
router.get('/términos', terms);
router.get('/t%C3%A9rminos', terms); // FIXME
router.get('/legal', legal);
router.get('/contribuir', contribute);
router.get('/gracias', thanks);

module.exports = router;
