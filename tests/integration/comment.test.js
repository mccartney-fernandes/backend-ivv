const mongoose = require('mongoose')

const app = require('../../src/app')
const request = require('supertest')

const { PostData, UserData, CommentData } = require('../data/ObjectData')

const User = require('../../src/app/models/User')
const Post = require('../../src/app/models/Post')

describe('Comments', () => {
  beforeEach(async () => {
    if (await mongoose.connection.db) {
      await mongoose.connection.db.dropDatabase()
    }
  })

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase()
    await mongoose.connection.close()
  })

  it('create new comment', async () => {
    // create new user
    const user = await User.create({
      ...UserData
    })

    // create new post end comment
    const post = await Post.create({
      ...PostData,
      user_id: user._id
    })

    // create comment in post
    const response = await request(app)
      .post('/comment')
      .set('Autorization', `Bearer ${user.generateToken()}`)
      .send({
        ...CommentData,
        post_id: post._id
      })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('comments')
  })

  it('create comment without a post id', async () => {
    // create new user
    const user = await User.create({
      ...UserData
    })

    // create new post end comment
    await Post.create({
      ...PostData,
      user_id: user._id
    })

    // create comment in post
    const response = await request(app)
      .post('/comment')
      .set('Autorization', `Bearer ${user.generateToken()}`)
      .send({
        ...CommentData
      })

    expect(response.status).toBe(400)
  })

  it('create comment with empty attributes', async () => {
    const user = await User.create({
      ...UserData
    })

    // create new post end comment
    await Post.create({
      ...PostData,
      user_id: user._id
    })

    const response = await request(app)
      .post('/comment')
      .set('Autorization', `Bearer ${user.generateToken()}`)
      .send({
        ...CommentData,
        comment: ''
      })

    expect(response.status).toBe(400)
  })

  it('create comment with not token', async () => {
    const response = await request(app)
      .post('/comment')
      .send({ ...CommentData })

    expect(response.status).toBe(401)
    expect(response.body.msg).toBe('Token not provided')
  })

  it('create comment with invalid token', async () => {
    const response = await request(app)
      .post('/user')
      .set('Autorization', 'Bearer 123454657987979')
      .send({ ...CommentData })

    expect(response.status).toBe(401)
    expect(response.body.msg).toBe('Token invalid')
  })
})
