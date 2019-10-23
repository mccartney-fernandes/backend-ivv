require('../../config/database')

const UserSeeder = require('./UserSeeder')
const RoleSeeder = require('./RoleSeeder')

async function createSeeder () {
  const roles = await RoleSeeder()
  await UserSeeder(roles)

  console.log('Todas as Seeders contruidas')
  process.exit()
}

createSeeder()
