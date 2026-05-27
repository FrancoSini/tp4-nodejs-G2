const fs = require('fs').promises
const { ProfesorModel } = require('../models/profesor.model')

const getProfesorAll = async (req, res) => {
  try {
    const data = await fs.readFile('./data/profesores.json', 'utf8')
    const profesores = JSON.parse(data)

    return res.status(200).json(profesores)
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      error: 'No se pudieron obtener los datos de los profesores'
    })
  }
}

const getProfesorById = async (req, res) => {
  try {
    const data = await fs.readFile('./data/profesores.json', 'utf8')
    const profesores = JSON.parse(data)

    const { legajo } = req.params
    const profesor = profesores.find((p) => p.legajo === Number(legajo))

    if (!profesor) {
      return res.status(404).json({
        msg: `No existe el profesor con el legajo ${legajo}`
      })
    }

    return res.status(200).json(profesor)
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      error: `No se pudo obtener el detalle del profesor con legajo n° ${req.params.legajo}`
    })
  }
}

const postNewProfesor = async (req, res) => {
  try {
    const { nombre, apellido, email, especialidad } = req.body

    const data = await fs.readFile('./data/profesores.json', 'utf8')
    const profesores = JSON.parse(data)

    const legajos = profesores.map((profesor) => profesor.legajo)
    const nuevoLegajo = Math.max(...legajos) + 1

    const nuevoProfesor = new ProfesorModel(
      nombre,
      apellido,
      email,
      nuevoLegajo,
      especialidad
    )

    const profesorNuevo = nuevoProfesor.getAllAttributes()
    profesores.push(profesorNuevo)

    await fs.writeFile(
      './data/profesores.json',
      JSON.stringify(profesores, null, 2),
      'utf8'
    )

    return res.status(200).json({
      msg: `Se agregó al sistema el profesor nuevo con el legajo n° ${nuevoLegajo}`,
      profesorNuevo
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      error: 'No se pudo dar de alta el profesor'
    })
  }
}

const putProfesorByLegajo = async (req, res) => {
  const { legajo } = req.params

  try {
    const { nombre, apellido, email, especialidad, isActive } = req.body

    const data = await fs.readFile('./data/profesores.json', 'utf8')
    const profesores = JSON.parse(data)

    const index = profesores.findIndex(
      (profesor) => profesor.legajo === Number(legajo)
    )

    if (index === -1) {
      return res.status(404).json({
        msg: `No se encontró el profesor con el legajo n° ${legajo}`
      })
    }

    if (nombre) profesores[index].nombre = nombre
    if (apellido) profesores[index].apellido = apellido
    if (email) profesores[index].email = email
    if (especialidad) profesores[index].especialidad = especialidad
    if (typeof isActive === 'boolean') {
      profesores[index].isActive = isActive
    }

    profesores[index].modificacion = new Date().toISOString().split('T')[0]

    await fs.writeFile(
      './data/profesores.json',
      JSON.stringify(profesores, null, 2),
      'utf8'
    )

    return res.status(200).json({
      msg: `Se modificó correctamente el profesor con legajo n° ${legajo}`,
      profesorModificado: profesores[index]
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      error: `No se pudieron modificar los datos del profesor con legajo n° ${legajo}`
    })
  }
}

const deleteProfesorByLegajo = async (req, res) => {
  try {
    const { legajo } = req.params

    const data = await fs.readFile('./data/profesores.json', 'utf8')
    const profesores = JSON.parse(data)

    const index = profesores.findIndex(
      (profesor) => profesor.legajo === Number(legajo)
    )

    if (index === -1) {
      return res.status(404).json({
        msg: `No se encontró el profesor con el legajo n° ${legajo}`
      })
    }

    const profesorEncontrado = profesores[index]
    profesores.splice(index, 1)

    await fs.writeFile(
      './data/profesores.json',
      JSON.stringify(profesores, null, 2),
      'utf8'
    )

    return res.status(200).json({
      msg: `Se eliminó correctamente el profesor con el legajo n° ${profesorEncontrado.legajo}`,
      profesor: profesorEncontrado
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      error: 'No se pudo eliminar el profesor del sistema'
    })
  }
}

module.exports = {
  getProfesorAll,
  getProfesorById,
  postNewProfesor,
  putProfesorByLegajo,
  deleteProfesorByLegajo
}
