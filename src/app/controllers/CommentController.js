const Post = require('../models/Post')

module.exports = {
  async store (req, res) {
    const { post_id: _id, tumb, comment, name, verified } = req.body

    const post = await Post.findOne({ _id })

    post.comments.push({ tumb, name, verified, comment })

    await post.save()

    res.status(200).send(post)
  }
}
