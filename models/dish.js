const { Schema, model } = require('mongoose');

const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

// --------mongoose shema--------
const dishShema = new Schema(
  {
    category: { type: String },
    title: { type: String },
    descr: { type: String },
    weight: { type: Number },
    price: {
      type: Number,
    },
    image: { type: String },
  },
  { versionKey: false, timestamps: true }
);

dishShema.post('save', handleMongooseError);

// --------Joi shemas--------
const addShema = Joi.object({
  category: Joi.string(),
  title: Joi.string(),
  descr: Joi.string(),
  weight: Joi.number(),
  price: Joi.number(),
  image: Joi.string(),
});

const schemas = {
  addShema,
};

const Dish = model('dish', dishShema);

module.exports = { Dish, schemas };
