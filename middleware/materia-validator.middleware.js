
const validateInputMateria = (req, res, next) => {
  const { idMateria, nombre, profesor, isActive } = req.body
  const error = []

  if (!idMateria || typeof idMateria !== 'string') {
    error.push('El campo idMateria debe ser un texto válido y obligatorio.')
  }

  if (nombre && typeof nombre !== 'string') {
    error.push('El nombre de la materia debe ser un texto válido.')
  }

  if (profesor && typeof profesor !== 'string') {
    error.push('El profesor debe ser un texto válido.')
  }

  if (isActive !== undefined && typeof isActive !== 'boolean') {
    error.push('El campo isActive debe ser un booleano (true/false).')
  }

  if (error.length > 0) {
    return res.status(400).json({ error })
  }

  next()
}
const fs = require('fs').promises
const validaMateriaExiste = async (req, res, next) => {
  try {
    const { idMateria } = req.body
    const data = await fs.readFile('./data/extras/sys-materias.json', 'utf8')
    const materias = JSON.parse(data)

    const materiaExiste = materias.some(m => m.idMateria === idMateria)
    if (!materiaExiste) {
      return res.status(400).json({ error: `La materia ${idMateria} no existe en el sistema` })
    }

    next()
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Error al validar materia' })
  }
}

module.exports = { validateInputMateria, validaMateriaExiste }
