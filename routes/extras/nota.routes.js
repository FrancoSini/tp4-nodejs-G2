const { Router } = Require('express')
const { validateInputNota } = require('../middleware/nota-validator.middleware')
const {
  getAllNotas,
  getNotaById,
  postNewNota,
  putNotaByLegajo,
  deleteNotaByLegajo
} = require('../controllers/nota.controller')

const rutas = Router()
rutas.get('/', getAllNotas)
rutas.get('/:legajo', getNotaById)
rutas.post('/', postNewNota)
rutas.put('/:legajo', validateInputNota, putNotaByLegajo)
rutas.delete('/:legajo', deleteNotaByLegajo)

module.exports = rutas
