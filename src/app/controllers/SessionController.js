const User = require('../models/User')

module.exports = {
  async authenticate (req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).send({ msg: 'email invalid' })
    }
    const userAuth = await user.comparePassword(password)

    if (!userAuth) {
      return res.status(401).send({ msg: 'password invalid ' })
    }

    const token = await user.generateToken()

    return res.status(200).json({ token })
  }
}
