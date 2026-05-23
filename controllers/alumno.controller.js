const fs = require('fs').promises
const { AlumnoModel } = require('../models/alumno.model')

const getAlumnoAll = async (req, res) => {
  try {
    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)

    return res.status(200).json(alumnos)
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      error: 'No se pudieron obtener los datos de los alumnos'
    })
  }
}

const getAlumnoById = async (req, res) => {
  try {
    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)

    const { legajo } = req.params

    const alumno = alumnos.find((a) => a.legajo === Number(legajo))

    if (!alumno) {
      return res.status(404).json({
        msg: `No existe el alumno con el legajo ${legajo}`
      })
    }

    return res.status(200).json(alumno)
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      error: `No se pudo obtener el detalle del alumno con legajo n° ${req.params.legajo}`
    })
  }
}

const postNewAlumno = async (req, res) => {
  try {
    // Datos enviados desde Postman
    const { nombre, apellido, email } = req.body

    // Leer archivo JSON
    const data = await fs.readFile('./data/alumnos.json', 'utf8')

    // Convertir a array
    const alumnos = JSON.parse(data)

    console.log('Se parseó la información a "alumnos"')

    // Obtener legajos
    const legajos = alumnos.map((alumno) => alumno.legajo)

    // Generar nuevo legajo
    const nuevoLegajo = Math.max(...legajos) + 1

    console.log(`Nuevo legajo generado: ${nuevoLegajo}`)

    // Crear nuevo alumno
    const nuevoAlumno = new AlumnoModel(nombre, apellido, email, nuevoLegajo)

    console.log(nuevoAlumno)

    // Obtener atributos
    const alumnoNuevo = nuevoAlumno.getAllAttributes()

    // Agregar al array
    alumnos.push(alumnoNuevo)

    // Guardar archivo actualizado
    await fs.writeFile(
      './data/alumnos.json',
      JSON.stringify(alumnos, null, 2),
      'utf8'
    )

    // Respuesta exitosa
    return res.status(200).json({
      msg: `Se agregó al sistema el alumno nuevo con el legajo n° ${nuevoLegajo}`,
      alumnoNuevo
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      error: 'No se pudo dar de alta el alumno'
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

    // Modificaciones
    if (nombre) alumnos[index].nombre = nombre
    if (apellido) alumnos[index].apellido = apellido
    if (email) alumnos[index].email = email
    if (typeof isActive === 'boolean') {
      alumnos[index].isActive = isActive
    }

    // Fecha modificación
    alumnos[index].modificacion = new Date().toISOString().split('T')[0]

    // Guardar cambios
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

const deleteAlumnoByLegajo = async (req, res) => {
  try {
    const { legajo } = req.params

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

    const alumnoEncontrado = alumnos[index]

    alumnos.splice(index, 1)

    await fs.writeFile(
      './data/alumnos.json',
      JSON.stringify(alumnos, null, 2),
      'utf8'
    )

    return res.status(200).json({
      msg: `Se eliminó correctamente el alumno con el legajo n° ${alumnoEncontrado.legajo}`,
      alumno: alumnoEncontrado
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      error: 'No se pudo eliminar el alumno del sistema'
    })
  }
}

module.exports = {
  getAlumnoAll,
  getAlumnoById,
  postNewAlumno,
  putAlumnoBylegajo,
  deleteAlumnoByLegajo
}
