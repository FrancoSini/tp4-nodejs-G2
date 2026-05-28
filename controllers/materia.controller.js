const fs = require('fs').promises

const getMateriaAll = async (req, res) => {
  try {
    const data = await fs.readFile('./data/extras/sys-materias.json', 'utf8')
    const materias = JSON.parse(data)
    return res.status(200).json(materias)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: 'No se pudieron obtener los datos de las materias'
    })
  }
}

const getMateriaById = async (req, res) => {
  try {
    const data = await fs.readFile('./data/extras/sys-materias.json', 'utf8')
    const materias = JSON.parse(data)

    const { id } = req.params
    const materiaID = materias.find(m => m.idMateria === String(id))

    if (!materiaID) {
      return res.status(404).json({ msg: `No existe la materia con el id ${id}` })
    }

    return res.status(200).json(materiaID)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: `No se pudo obtener el detalle de la materia con id n° ${req.params.id}`
    })
  }
}

const postNewMateria = async (req, res) => {
  try {
    const { idMateria, nombre, cuatrimestre } = req.body

    const data = await fs.readFile('./data/extras/sys-materias.json', 'utf8')
    const materias = JSON.parse(data)

    // validar que no exista
    const existe = materias.some(m => m.idMateria === idMateria)
    if (existe) {
      return res.status(400).json({ error: `La materia ${idMateria} ya existe` })
    }

    const nuevaMateria = { idMateria, nombre, cuatrimestre }
    materias.push(nuevaMateria)

    await fs.writeFile('./data/extras/sys-materias.json', JSON.stringify(materias, null, 2))
    return res.status(201).json({ msg: 'Materia creada exitosamente', nuevaMateria })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'No se pudo crear la materia' })
  }
}

const putMateriaById = async (req, res) => {
  try {
    const { id } = req.params
    const { nombre, cuatrimestre } = req.body

    const data = await fs.readFile('./data/extras/sys-materias.json', 'utf8')
    const materias = JSON.parse(data)

    const index = materias.findIndex(m => m.idMateria === id)
    if (index === -1) {
      return res.status(404).json({ error: `No existe la materia con id ${id}` })
    }

    if (nombre) materias[index].nombre = nombre
    if (cuatrimestre) materias[index].cuatrimestre = cuatrimestre
    materias[index].modificacion = new Date().toISOString().split('T')[0]

    await fs.writeFile('./data/extras/sys-materias.json', JSON.stringify(materias, null, 2))
    return res.status(200).json({ msg: 'Materia modificada', materia: materias[index] })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'No se pudo modificar la materia' })
  }
}

const deleteMateriaById = async (req, res) => {
  try {
    const { id } = req.params

    const data = await fs.readFile('./data/extras/sys-materias.json', 'utf8')
    const materias = JSON.parse(data)

    const index = materias.findIndex(m => m.idMateria === id)
    if (index === -1) {
      return res.status(404).json({ error: `No existe la materia con id ${id}` })
    }

    const materiaEliminada = materias[index]
    materias.splice(index, 1)

    await fs.writeFile('./data/extras/sys-materias.json', JSON.stringify(materias, null, 2))
    return res.status(200).json({ msg: 'Materia eliminada', materia: materiaEliminada })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'No se pudo eliminar la materia' })
  }
}

module.exports = {
  getMateriaAll,
  getMateriaById,
  postNewMateria,
  putMateriaById,
  deleteMateriaById
}
