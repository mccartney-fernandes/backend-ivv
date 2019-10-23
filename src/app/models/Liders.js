const mongoose = require('mongoose')

const LiderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  img: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  cargo: String,
  cargoDepartament: String,
  face: String,
  insta: String,
  twit: String,
  yout: String,
  cpastor: Boolean,
  level: Number,
  diretoria: Boolean,
  departament: Boolean
})

const Lider = new mongoose.model('Lider', LiderSchema)

module.exports = Lider
