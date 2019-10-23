const mongoose = require('mongoose')

const app = require('../../src/app')
const request = require('supertest')

const User = require('../../src/app/models/User')

const { UserData } = require('../data/ObjectData')

describe('User', () => {
  beforeEach(async () => {
    if (await mongoose.connection.db) {
      await mongoose.connection.db.dropDatabase()
    }
  })

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase()
    await mongoose.connection.close()
  })

  it('create new user', async () => {
    const user = await User.create({
      ...UserData
    })

    const response = await request(app)
      .post('/user')
      .set('Autorization', `Bearer ${user.generateToken()}`)
      .send(UserData)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('email')
  })

  it('create user with empty attributes', async () => {
    const user = await User.create({
      ...UserData
    })

    const response = await request(app)
      .post('/user')
      .set('Autorization', `Bearer ${user.generateToken()}`)
      .send({ ...UserData, name: '' })

    expect(response.status).toBe(400)
  })

  it('create user with not token', async () => {
    const response = await request(app)
      .post('/user')
      .send({ ...UserData })

    expect(response.status).toBe(401)
    expect(response.body.msg).toBe('Token not provided')
  })

  it('create user with invalid token', async () => {
    const response = await request(app)
      .post('/user')
      .set('Autorization', 'Bearer 123454657987979')
      .send({ ...UserData })

    expect(response.status).toBe(401)
    expect(response.body.msg).toBe('Token invalid')
  })
})
