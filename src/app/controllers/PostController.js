const Post = require('../models/Post')

module.exports = {
  async store (req, res) {
    const post = await Post.create(req.body)

    return res.status(200).send(post)
  }
}
