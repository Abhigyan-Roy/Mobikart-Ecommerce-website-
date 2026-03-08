const Joi = require('joi');

const optionalText = Joi.string().trim().max(500).allow('');
const optionalLongText = Joi.string().trim().max(5000).allow('');
const optionalUrlText = Joi.string().trim().max(2000).allow('');

const signupSchema = Joi.object({
  name: Joi.string().trim().min(2).max(80).required(),
  email: Joi.string().trim().lowercase().email().required(),
  password: Joi.string().min(6).max(128).required(),
  confirm_password: Joi.string().valid(Joi.ref('password')).required()
});

const signinSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required(),
  password: Joi.string().min(6).max(128).required()
});

const productCreateSchema = Joi.object({
  imagePath: optionalUrlText,
  bigImg: optionalUrlText,
  frontcam: optionalText,
  rearcam: optionalText,
  Android: optionalText,
  seller: optionalText,
  battery: optionalText,
  processor: optionalText,
  brand: Joi.string().trim().min(1).max(80).required(),
  color: optionalText,
  storage: optionalText,
  ram: optionalText,
  desc: Joi.string().trim().min(1).max(300).required(),
  longdesc: optionalLongText,
  mrp: Joi.number().min(0).required(),
  price: Joi.number().min(0).required(),
  binkies: optionalText
});

const productUpdateSchema = Joi.object({
  imagePath: optionalUrlText,
  bigImg: optionalUrlText,
  frontcam: optionalText,
  rearcam: optionalText,
  Android: optionalText,
  seller: optionalText,
  battery: optionalText,
  processor: optionalText,
  brand: Joi.string().trim().min(1).max(80).required(),
  color: optionalText,
  storage: optionalText,
  ram: optionalText,
  desc: Joi.string().trim().min(1).max(300).required(),
  longdesc: optionalLongText,
  mrp: Joi.number().min(0).required(),
  price: Joi.number().min(0).required(),
  binkies: optionalText
});

module.exports = {
  signupSchema,
  signinSchema,
  productCreateSchema,
  productUpdateSchema
};
