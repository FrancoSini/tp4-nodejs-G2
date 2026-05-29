const validateInputAlumno = (req, res, next) => {
  const { nombre, apellido, email, isActive } = req.body
  const error = []

  if (nombre && typeof nombre !== 'string') {
    error.push('El nombre debe ser un texto válido.')
  }

  if (apellido && typeof apellido !== 'string') {
    error.push('El apellido debe ser un texto válido.')
  }

  if (email && typeof email !== 'string') {
    error.push('El email debe ser un formato de texto válido.')
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
const validaAlumnoExiste = async (req, res, next) => {
  try {
    const { legajo } = req.body
    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)

    const alumnoExiste = alumnos.some(a => a.legajo === Number(legajo))
    if (!alumnoExiste) {
      return res.status(400).json({ error: `El legajo ${legajo} no existe en el sistema` })
    }

    next()
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Error al validar alumno' })
  }
}

module.exports = { validateInputAlumno, validaAlumnoExiste }
