const ctrl = require('../../controllers/dishes');

const express = require('express');
const router = express.Router();

router.get('/:category', ctrl.getAll);

module.exports = router;
