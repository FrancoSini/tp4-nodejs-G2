const { Router } = require('express')
const {
  getAllNotas,
  getNotaById,
  postNewNota,
  putNotaById,
  deleteNotaById
} = require('../../controllers/nota.controller')

const { validateInputNota } = require('../../middleware/nota-validator.middleware')
const { validaAlumnoExiste } = require('../../middleware/alumno-validator.middleware.js')
const { validaMateriaExiste } = require('../../middleware/materia-validator.middleware.js')

const rutas = Router()
rutas.get('/', getAllNotas)
rutas.get('/:id', getNotaById)
rutas.post('/', validateInputNota, validaAlumnoExiste, validaMateriaExiste, postNewNota)
rutas.put('/:id', validateInputNota, validaMateriaExiste, putNotaById)
rutas.delete('/:id', deleteNotaById)

module.exports = rutas
