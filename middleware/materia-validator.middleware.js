
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

module.exports = { validateInputMateria }
