const Joi = require('@hapi/joi')

const postSchema = Joi.object({
  user_id: Joi.string(),
  title: Joi.string().required(),
  content: Joi.string().required(),
  tumb: Joi.string().required(),
  tags: Joi.string().required()
})

const commentSchema = Joi.object({
  post_id: Joi.string().required(),
  tumb: Joi.string().required(),
  comment: Joi.string().required(),
  name: Joi.string().required()
})

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required()
})

const SessionSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required()
})

module.exports = {
  postSchema,
  commentSchema,
  userSchema,
  SessionSchema
}
