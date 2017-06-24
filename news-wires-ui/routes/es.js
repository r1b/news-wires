const express = require('express');
const router = express.Router();

const index = require('../controllers/index');
const privacy = require('../controllers/privacy');
const terms = require('../controllers/terms');

router.get('/(:page([0-9]+))?', index);
router.get('/privacidad', privacy);
router.get('/términos', terms);
router.get('/t%C3%A9rminos', terms); // FIXME

module.exports = router;
