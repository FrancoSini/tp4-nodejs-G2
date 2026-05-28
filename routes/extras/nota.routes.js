const { Router } = require('express')
const {
  validateInputNota
} = require('../../middleware/nota-validator.middleware')
const {
  getAllNotas,
  getNotaById,
  postNewNota,
  putNotaById,
  deleteNotaById
} = require('../../controllers/nota.controller')

const rutas = Router()
rutas.get('/', getAllNotas)
rutas.get('/:id', getNotaById)
rutas.post('/', postNewNota)
rutas.put('/:id', putNotaById)
rutas.delete('/:id', deleteNotaById)

module.exports = rutas
