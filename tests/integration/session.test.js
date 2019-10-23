const mongoose = require('mongoose')
require('../../src/config/database')

const app = require('../../src/app')
const request = require('supertest')

const { UserData } = require('../data/ObjectData')

const User = require('../../src/app/models/User')

describe('Sessions', () => {
  beforeEach(async () => {
    if (await mongoose.connection.db) {
      await mongoose.connection.db.dropDatabase()
    }
  })

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase()
    await mongoose.connection.close()
  })
  it('authenticate user with valid email and password', async () => {
    const user = await User.create({
      ...UserData
    })

    const response = await request(app)
      .post('/session')
      .send({
        email: user.email,
        password: UserData.password
      })

    expect(response.status).toBe(200)
    expect(user.name).toBe(UserData.name)
    expect(response.body).toHaveProperty('token')
  })

  it('user authentication without valid email', async () => {
    const user = await User.create({
      ...UserData
    })

    const response = await request(app)
      .post('/session')
      .send({
        email: 'mccartney@gmail.com',
        password: user.password
      })

    expect(response.status).toBe(401)
    expect(response.body.msg).toBe('email invalid')
  })

  it('user authentication without valid password', async () => {
    const user = await User.create({
      ...UserData
    })

    const response = await request(app)
      .post('/session')
      .send({
        email: user.email,
        password: 'user.password'
      })

    expect(response.status).toBe(401)
    expect(response.body.msg).toBe('password invalid ')
  })

  it('authentication with empty fields', async () => {
    const user = await User.create({
      ...UserData
    })

    const response = await request(app)
      .post('/session')
      .send({
        email: user.email,
        password: ''
      })

    expect(response.status).toBe(400)
  })
})
