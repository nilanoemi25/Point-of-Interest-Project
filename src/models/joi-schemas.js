import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object() 
.keys({
  email: Joi.string().email().example("homer@simpson.com").required(),
  password: Joi.string().example("secret").required(),
})
.label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
    firstName: Joi.string().example("Homer").required(),
    lastName: Joi.string().example("Simpson").required(),
    status: Joi.string().example("active").optional(),
  })
  .label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const PoiSpec = Joi.object()
.keys({
  name: Joi.string().example("Castle").required(),
  description: Joi.string().example("Big rock building").required(),
  latitude: Joi.number().example("50.22").allow("").optional(),
  longitude: Joi.number().example("7.89").allow("").optional(),
  categoryid: IdSpec, 
})
.label("PoiDetails");

export const PoiSpecPlus = PoiSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("PoiPlus");

export const PoiArraySpec = Joi.array().items(PoiSpecPlus).label("PoiArray");

export const CategorySpec = Joi.object()
  .keys({
    name: Joi.string().required().example("Hotels"),
    userid: IdSpec,
    pois: PoiArraySpec,
  })
  .label("Category");

export const CategorySpecPlus = CategorySpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("CategoryPlus");

export const CategoryArraySpec = Joi.array().items(CategorySpecPlus).label("CategoryArray");

export const CommentSpec = Joi.object()
  .keys({
    comment: Joi.string().required().example("I liked this"),
    userid: IdSpec,
  })
  .label("Comment");

export const CommentSpecPlus = CommentSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("CommentPlus");

export const CommentArraySpec = Joi.array().items(CommentSpecPlus).label("CommentArray");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");