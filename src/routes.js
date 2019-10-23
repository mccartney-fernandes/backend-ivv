const routes = require('express').Router()

const validator = require('express-joi-validation').createValidator({})
const { postSchema, userSchema, SessionSchema, commentSchema } = require('./app/validators/validators')

const auth = require('./app/middleware/auth')

const PostController = require('./app/controllers/PostController')
const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const CommentController = require('./app/controllers/CommentController')

routes.post('/post', auth, validator.body(postSchema), PostController.store)
routes.post('/user', auth, validator.body(userSchema), UserController.store)
routes.post('/session', validator.body(SessionSchema), SessionController.authenticate)
routes.post('/comment', auth, validator.body(commentSchema), CommentController.store)

module.exports = routes
