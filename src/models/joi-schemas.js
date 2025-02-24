import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserSpec = Joi.object()
  .keys({
    firstName: Joi.string().example("Homer").required(),
    lastName: Joi.string().example("Simpson").required(),
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
    _id: IdSpec,
    __v: Joi.number(),
  })
  .label("UserDetails");

export const UserArray = Joi.array().items(UserSpec).label("UserArray");


export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const PoiSpec = Joi.object()
.keys({
  name: Joi.string().example("Castle").required(),
  description: Joi.string().example("Big rock building").required(),
  location: Joi.number().example("Cork").allow("").optional(),
  image: Joi.string().allow("").optional(),
  _id: IdSpec,
  __v: Joi.number(),
})
.label("PoiDetails");


export const CategorySpec = Joi.object()
.keys({
  title: Joi.string().example("CategoryName").required(),
  _id: IdSpec,
  __v: Joi.number(),
})
.label("CategoryDetails");