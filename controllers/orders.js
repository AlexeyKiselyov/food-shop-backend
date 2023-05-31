const { Order } = require('../models/order');

const { ctrlWrapper } = require('../helpers');

const addOrder = async (req, res) => {
  const result = await Order.create({
    ...req.body,
  });
  res.status(201).json({ ...result._doc });
};

module.exports = {
  addOrder: ctrlWrapper(addOrder),
};
