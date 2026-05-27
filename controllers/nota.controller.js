const fs = require('fs').promises
const { NotaModel } = require('../models/nota.model')

const getAllNotas = async (req, res) => {
  try {
    const data = await fs.readFile('./data/notas.json', 'utf8')
    const notas = JSON.parse(data)
    return res.status(200).json(notas)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: 'No se pudieron obtener los datos de las notas'
    })
  }
}
const getNotaById = async (req, res) => {
  try {
    const data = await fs.readFile('./data/notas.json', 'utf8')
    const notas = JSON.parse(data)
    const { legajo } = req.params
    const nota = notas.find((n) => n.legajo === Number(legajo))
    if (!nota) {
      return res.status(404).json({ error: 'Nota no encontrada' })
    }
    return res.status(200).json(nota)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: 'No se pudieron obtener los datos de la nota'
    })
  }
}
const postNewNota = async (req, res) => {
  try {
    const { id, legajo, nota, Materia, fecha } = req.body
    const data = await fs.readFile('./data/notas.json', 'utf8')
    const notas = JSON.parse(data)
    console.log('Se parseó la información a "notas"')
    const legajos = notas.map((n) => n.legajo)
    const nuevoLegajo = Math.max(...legajos) + 1
    const newNota = new NotaModel(id, legajo, nota, Materia, fecha)
    const notaNueva = newNota.getAllNotas()
    notas.push(notaNueva)
    await fs.writeFile('./data/notas.json', JSON.stringify(notas, null, 2))
    return res.status(200).json({
      msg: 'Nota creada exitosamente',
      notaNueva
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'No se pudo crear la nota' })
  }
}
const putNotaByLegajo = async (req, res) => {
  const { legajo } = req.params
  try {
    const { id, nota, Materia, fecha } = req.body
    const data = await fs.readFile('./data/notas.json', 'utf8')
    const notas = JSON.parse(data)
    const notaIndex = notas.findIndex((n) => n.legajo === Number(legajo))
    if (notaIndex === -1) {
      return res.status(404).json({ error: 'Nota no encontrada' })
    }
    // modificaciones
    if (id) notas[notaIndex].id = id
    if (nota) notas[notaIndex].nota = nota
    if (Materia) notas[notaIndex].Materia = Materia
    if (fecha) notas[notaIndex].fecha = fecha

    notas[notaIndex].modificacion = new Date().toISOString().split('T')[0]
    await fs.writeFile(
      './data/notas.json',
      JSON.stringify(notas, null, 2),
      'utf8'
    )

    return res.status(200).json({
      msg: `Se modificó correctamente la nota del legajo n° ${legajo}`,
      notaModificada: notas[notaIndex]
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: `No se pudieron modificar los datos de la nota del legajo n° ${legajo}`
    })
  }
}

const deleteNotaByLegajo = async (req, res) => {
  try {
    const { legajo } = req.params

    const data = await fs.readFile('./data/notas.json', 'utf8')
    const notas = JSON.parse(data)
    const index = notas.findIndex((nota) => nota.legajo === Number(legajo))
    if (index === -1) {
      return res.status(404).json({
        msg: `No se encontró la nota con el legajo n° ${legajo}`
      })
    }
    const notaEncontrada = notas[index]
    notas.splice(index, 1)
    await fs.writeFile(
      './data/notas.json',
      JSON.stringify(notas, null, 2),
      'utf8'
    )
    return res.status(200).json({
      msg: `Se eliminó correctamente la nota del legajo n° ${notaEncontrada.legajo}`,
      nota: notaEncontrada
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: `No se pudieron eliminar los datos de la nota del legajo n° ${legajo}`
    })
  }

  module.exports = {
    getAllNotas,
    getNotaById,
    postNewNota,
    putNotaByLegajo,
    deleteNotaByLegajo
  }
}
