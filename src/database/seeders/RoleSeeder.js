const Role = require('../../app/models/Role')

async function RoleSeeder () {
  console.log('Iniciando contrução do RoleSeeder')
  const roles = await Role.create([
    { role: 'supervisor' },
    { role: 'editor' },
    { role: 'autor' },
    { role: 'reader' }
  ])
  console.log('RoleSeeder construida')
  return roles
}

module.exports = RoleSeeder
