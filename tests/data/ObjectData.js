const faker = require('faker/locale/pt_BR')

const PostData = {
  user_id: faker.random.number(),
  title: faker.lorem.words(),
  content: faker.lorem.paragraph(),
  tumb: faker.image.city(),
  tags: faker.lorem.word()
}

const CommentData = {
  tumb: faker.image.avatar(),
  comment: faker.lorem.words(),
  name: faker.name.findName()
}

const UserData = {
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  email: faker.internet.email(),
  password: faker.internet.password()
}

const RoleData = [
  { role: 'supervisor' },
  { role: 'editor' },
  { role: 'reader' }
]

module.exports = {
  PostData,
  CommentData,
  UserData,
  RoleData
}
