const User = require('../../app/models/User')

async function UserSeeder (roles) {
  console.log('Iniciando contrução do UserSeeder')

  const user = await User.create({
    role_id: roles[0]._id,
    email: 'admin@admin.com',
    password: '123456',
    profile: {
      name: 'admin',
      avata: 'https://cdn2.vectorstock.com/i/1000x1000/23/81/default-avatar-profile-icon-vector-18942381.jpg'
    }
  })

  console.log('UserSeeder Construida')
  return user
}

module.exports = UserSeeder
