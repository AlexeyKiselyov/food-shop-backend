const { Dish } = require('../models/dish');

const { ctrlWrapper } = require('../helpers');

const sortObj = {
  priceUp: { price: 1 },
  priceDown: { price: -1 },
  aZ: { title: 1 },
};

const getAll = async (req, res) => {
  const { page = 1, limit = 4, qwery = '', sort = 'priceUp' } = req.query;
  const sortParamsObj = sortObj[sort];
  const skip = (page - 1) * limit;

  const { category } = req.params;
  const queryObj = { category };

  if (category === 'all') {
    delete queryObj.category;
  }
  if (qwery) {
    queryObj.title = { $regex: qwery, $options: 'i' };
  }

  const dataCount = await Dish.countDocuments({ ...queryObj });
  const data = await Dish.find({ ...queryObj })
    .sort(sortParamsObj)
    .skip(skip)
    .limit(limit);

  res.json({
    total: dataCount,
    page: +page,
    limit: +limit,
    totalPages: Math.ceil(dataCount / limit),
    dishes: data,
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
};
