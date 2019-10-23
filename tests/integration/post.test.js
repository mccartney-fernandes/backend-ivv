const mongoose = require('mongoose')

const app = require('../../src/app')
const request = require('supertest')

const { PostData, UserData } = require('../data/ObjectData')

const User = require('../../src/app/models/User')

describe('Posts', () => {
  beforeEach(async () => {
    if (await mongoose.connection.db) {
      await mongoose.connection.db.dropDatabase()
    }
  })

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase()
    await mongoose.connection.close()
  })

  it('create new post', async () => {
    const user = await User.create({
      ...UserData
    })

    const response = await request(app)
      .post('/post')
      .set('Autorization', `Bearer ${user.generateToken()}`)
      .send({
        ...PostData,
        user_id: user._id
      })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('title')
    expect(response.body).toHaveProperty('comments')
  })

  it('create post with empty attributes', async () => {
    const user = await User.create({
      ...UserData
    })

    const response = await request(app)
      .post('/post')
      .set('Autorization', `Bearer ${user.generateToken()}`)
      .send({ ...PostData, content: '' })

    expect(response.status).toBe(400)
  })

  it('create post with not token', async () => {
    const response = await request(app)
      .post('/comment')
      .send({ ...PostData })

    expect(response.status).toBe(401)
    expect(response.body.msg).toBe('Token not provided')
  })

  it('create post with invalid token', async () => {
    const response = await request(app)
      .post('/user')
      .set('Autorization', 'Bearer 123454657987979')
      .send({ ...PostData })

    expect(response.status).toBe(401)
    expect(response.body.msg).toBe('Token invalid')
  })
})
