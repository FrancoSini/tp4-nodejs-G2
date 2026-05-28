const fs = require('fs').promises

const getMateriaAll = async (req, res) => {
  try {
    const data = await fs.readFile('./data/extras/sys-materias.json', 'utf8')
    const materias = JSON.parse(data)

    return res.status(200).json(materias)
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ error: 'No se pudieron obtener los datos de las materias' })
  }
}

const getMateriaById = async (req, res) => {
  try {
    const data = await fs.readFile('./data/extras/sys-materias.json', 'utf8')
    const materias = JSON.parse(data)

    const { materia } = req.params

    const materiaID = materias.find(
      (m) => m.idMateria /* .toString() */ === String(materia)
    )

    if (!materiaID) {
      return res
        .status(404)
        .json({ msg: `No existe la materia con el id ${materia}` })
    }

    return res.status(200).json(materiaID)
  } catch (error) {
    console.log(error)
    return res.status(500).JSON({
      error: 'No se pudo obtener el datalle de la materia con id n° {materia}',
    })
  }
}

module.exports = { getMateriaAll, getMateriaById }
