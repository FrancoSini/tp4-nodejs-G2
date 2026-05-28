const { Router } = require('express')
const {
  getMateriaAll,
  getMateriaById,
  postNewMateria,
  putMateriaById,
  deleteMateriaById
} = require('../../controllers/materia.controller')

const { validateInputMateria } = require('../../middleware/materia-validator.middleware')

const rutas = Router()

rutas.get('/', getMateriaAll)
rutas.get('/:id', getMateriaById)
rutas.post('/', validateInputMateria, postNewMateria)
rutas.put('/:id', validateInputMateria, putMateriaById)
rutas.delete('/:id', deleteMateriaById)

module.exports = rutas
