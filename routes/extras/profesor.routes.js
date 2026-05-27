const { Router } = require('express')
const {
  validateInputProfesor
} = require('../../middleware/profesor-validator.middleware')
const {
  getProfesorAll,
  getProfesorById,
  postNewProfesor,
  putProfesorByLegajo,
  deleteProfesorByLegajo
} = require('../controllers/profesor.controller')

const rutas = Router()

rutas.get('/', getProfesorAll)
rutas.get('/:legajo', getProfesorById)
rutas.post('/', postNewProfesor)
rutas.put('/:legajo', validateInputProfesor, putProfesorByLegajo)
rutas.delete('/:legajo', deleteProfesorByLegajo)

module.exports = rutas
