const { Schema, model } = require('mongoose');

const Joi = require('joi');

const {
  handleMongooseError,
  constants: { PHONE_REG_EXP },
} = require('../helpers');

// -------total subshema --------
const totalSubSchema = new Schema({
  count: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

// -------new order subshema --------
const newOrderSubSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  descr: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  priceTotal: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

// --------mongoose shema------------
const orderShema = new Schema(
  {
    name: { type: String, minlength: 4, maxlength: 32, required: true },
    number: {
      type: String,
      match: [PHONE_REG_EXP, 'Будь ласка, введіть валідний телефон'],
      required: true,
    },
    street: { type: String, required: true },
    house: {
      type: Number,
      min: [1],
      max: [1000],
      required: true,
    },
    apartment: {
      type: Number,
      min: [0],
      max: [1000],
    },
    order: { type: [newOrderSubSchema], required: true },
    total: { type: totalSubSchema, required: true },
  },
  { versionKey: false, timestamps: true }
);

orderShema.post('save', handleMongooseError);

// --------Joi shemas--------
const addShema = Joi.object({
  name: Joi.string().min(4).max(32).required("Ім'я є обов'язковим"),
  number: Joi.string()
    .pattern(PHONE_REG_EXP, 'Будь ласка, введіть валідний телефон')
    .required("Телефон є обов'язковим"),
  street: Joi.string().required("Вулиця є обов'язковою"),
  house: Joi.number().min(1).max(1000).required("Номер дому є обов'язковим"),
  apartment: Joi.number().min(0).max(1000),
  order: Joi.array().items(Joi.object()).required("Замовлення є обов'язковим"),
  total: Joi.object().required("Загальна сумма замовлення є обов'язковою"),
});

const schemas = {
  addShema,
};

const Order = model('order', orderShema);

module.exports = { Order, schemas };
