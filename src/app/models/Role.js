const mongoose = require('mongoose')

const RoleSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true
  }
})

const Role = new mongoose.model('Role', RoleSchema)

module.exports = Role
