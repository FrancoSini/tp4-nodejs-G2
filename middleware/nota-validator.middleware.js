const validateInputNota = (req, res, next) => {
  const { id, legajo, idMateria, nota, fecha } = req.body
  const error = []

  if (id && typeof id !== 'number') {
    error.push('El ID debe ser un número válido.')
  }
  if (nota && typeof nota !== 'number') {
    error.push('La nota debe ser un número válido.')
  }
  if (fecha && typeof fecha !== 'string') {
    error.push('La fecha debe ser un texto válido.')
  }
  if (error.length > 0) {
    return res.status(400).json({ error })
  }
  next()
}
module.exports = { validateInputNota }
