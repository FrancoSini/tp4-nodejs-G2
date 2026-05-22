const fs = require('fs').promises

const getAlumnoAll = async (req, res) => {
  try {
    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)

    return res.status(200).json(alumnos)
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ error: 'No se puedieron obtener los datos de los alumnos' })
  }
}

const getAlumnoById = async (req, res) => {
  try {
    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)

    const { legajo } = req.params

    const legajoId = alumnos.find(
      (a) => a.legajo /* .toString() */ === Number(legajo)
    )

    if (!legajoId) {
      return res
        .status(404)
        .json({ msg: `No existe el alumno con el legajo ${legajo}` })
    }

    return res.status(200).json(legajoId)
  } catch (error) {
    console.log(error)
    return res.status(500).JSON({
      error: 'No se pudo obtener el datalle del alumno con legajo n° {legajo}'
    })
  }
}

const putAlumnoBylegajo = async (req, res) => {
  const { legajo } = req.params
  try {
    const { nombre, apellido, email, isActive } = req.body

    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)

    const index = alumnos.findIndex(
      (alumno) => alumno.legajo === Number(legajo)
    )

    if (index === -1) {
      return res.status(404).json({
        msg: `No se encontró el alumno con el legajo n° ${legajo}`
      })
    }

    if (nombre) alumnos[index].nombre = nombre
    if (apellido) alumnos[index].apellido = apellido
    if (email) alumnos[index].email = email
    if (typeof isActive === 'boolean') alumnos[index].isActive = isActive

    // Actualizar fecha de modificación
    alumnos[index].modificacion = new Date().toISOString().split('T')[0]

    await fs.writeFile(
      './data/alumnos.json',
      JSON.stringify(alumnos, null, 2),
      'utf8'
    )

    return res.status(200).json({
      msg: `Se modificó correctamente el alumno con legajo n° ${legajo}`,
      alumnoModificado: alumnos[index]
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      error: `No se pudieron modificar los datos del alumno con legajo n° ${legajo}`
    })
  }
}

module.exports = { getAlumnoAll, getAlumnoById, putAlumnoBylegajo }
