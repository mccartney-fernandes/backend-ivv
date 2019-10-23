const mongoose = require('mongoose')

const app = require('../../src/app')
const request = require('supertest')

const User = require('../../src/app/models/User')

const { UserData, RoleData } = require('../data/ObjectData')

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

  it('create new role', async () => {
    const user = await User.create({
      ...UserData
    })

    const response = await request(app)
      .post('/role')
      .set('Autorization', `Bearer ${user.generateToken()}`)
      .send(RoleData)

    expect(response.status).toBe(200)
  })
})
