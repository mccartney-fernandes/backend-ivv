const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  tumb: String,
  soundCloudURL: String,
  tags: String,
  data: {
    type: Date,
    default: Date.now
  },
  verifiedPost: {
    type: Boolean,
    default: false
  },
  comments: [
    {
      tumb: String,
      comment: String,
      name: String,
      data: {
        type: Date,
        default: Date.now
      },
      verifiedComment: {
        type: Boolean,
        default: false
      }
    }
  ]
})

const Post = new mongoose.model('Post', PostSchema)

module.exports = Post
