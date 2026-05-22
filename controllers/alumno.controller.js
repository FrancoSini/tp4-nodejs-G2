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
const postNewAlumno = async (req, res) => {
  try {
    // Obtengo los datos enviados desde el body
    const { nombre, apellido, email } = req.body

    // Leo el archivo JSON donde están guardados los alumnos
    const data = await fs.readFile('./data/alumnos.json', 'utf8')

    // Convierto la información a un array de objetos
    const alumnos = JSON.parse(data)

    console.log('Se parseó la información a "alumnos"')

    // Obtengo todos los legajos existentes
    const legajos = alumnos.map((alumno) => alumno.legajo)

    // Genero un nuevo legajo automático
    // tomando el mayor legajo y sumándole 1
    const nuevoLegajo = Math.max(...legajos) + 1

    console.log(`Nuevo legajo generado: ${nuevoLegajo}`)

    // Creo una nueva instancia del alumno
    const nuevoAlumno = new AlumnoModel(nombre, apellido, email, nuevoLegajo)

    console.log(nuevoAlumno)

    // Obtengo todos los atributos del alumno
    const alumnoNuevo = nuevoAlumno.getAllAttributes()

    // Agrego el nuevo alumno al array
    alumnos.push(alumnoNuevo)

    console.log(nuevoAlumno.getAllAttributes())

    // Sobrescribo el archivo JSON
    // guardando el array actualizado
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
    // Manejo de errores
    return res.status(500).json({
      error: 'No se pudo dar de alta el alumno'
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
    return res.status(500).json({
      err: console.log(error),
      error: 'No se puedo eliminar el alumno del sistema'
    })
  }
}

module.exports = { getAlumnoAll, getAlumnoById }
