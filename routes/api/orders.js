const ctrl = require('../../controllers/orders');

const { validateBody } = require('../../middlewares');

const express = require('express');
const { schemas } = require('../../models/order');
const router = express.Router();

router.post('/', validateBody(schemas.addShema), ctrl.addOrder);

module.exports = router;
