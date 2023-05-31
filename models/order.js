const { Schema, model } = require('mongoose');

const Joi = require('joi');

const {
  handleMongooseError,
  constants: { PHONE_REG_EXP },
} = require('../helpers');

// --------mongoose shema--------
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
});

const schemas = {
  addShema,
};

const Order = model('order', orderShema);

module.exports = { Order, schemas };
