const fs = require('fs').promises
const { NotaModel } = require('../models/extras/nota.model')

const getAllNotas = async (req, res) => {
  try {
    const data = await fs.readFile('./data/extras/sys-notas.json', 'utf8')
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
    const data = await fs.readFile('./data/extras/sys-notas.json', 'utf8')
    const notas = JSON.parse(data)
    const { id } = req.params
    const notaID = notas.find((n) => n.id === Number(id))
    if (!notaID) {
      return res.status(404).json({ error: 'Nota no encontrada' })
    }
    return res.status(200).json(notaID)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: 'No se pudieron obtener los datos de la nota'
    })
  }
}
const postNewNota = async (req, res) => {
  try {
    const { id, legajo, idMateria, nota, fecha } = req.body

    const data = await fs.readFile('./data/extras/sys-notas.json', 'utf8')
    const notas = JSON.parse(data)

    console.log('Se parseó la información a "notas"')
    const existe = notas.some((n) => n.id === Number(id))

    if (existe) {
      return res.status(400).json({ error: `La nota ${id} ya existe` })
    }

    const nuevaNota = { id, legajo, idMateria, nota, fecha }
    notas.push(nuevaNota)

    await fs.writeFile(
      './data/extras/sys-notas.json',
      JSON.stringify(notas, null, 2)
    )
    return res.status(201).json({ msg: 'Nota creada exitosamente', nuevaNota })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: 'No se pudieron guardar los datos de la nueva nota'
    })
  }
  const putNotaById = async (req, res) => {
    const { id } = req.params
    try {
      const { nota, idMateria, fecha } = req.body
      const data = await fs.readFile('./data/extras/sys-notas.json', 'utf8')
      const notas = JSON.parse(data)
      const notaIndex = notas.findIndex((n) => n.id === Number(id))
      if (notaIndex === -1) {
        return res.status(404).json({ error: 'Nota no encontrada' })
      }
      // modificaciones
      if (id) notas[notaIndex].id = id
      if (nota) notas[notaIndex].nota = nota
      if (idMateria) notas[notaIndex].idMateria = idMateria
      if (fecha) notas[notaIndex].fecha = fecha

      notas[notaIndex].modificacion = new Date().toISOString().split('T')[0]
      await fs.writeFile(
        './data/extras/sys-notas.json',
        JSON.stringify(notas, null, 2),
        'utf8'
      )

      return res.status(200).json({
        msg: `Se modificó correctamente la nota del id n° ${id}`,
        notaModificada: notas[notaIndex]
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        error: `No se pudieron modificar los datos de la nota del id n° ${id}`
      })
    }
  }

  const deleteNotaById = async (req, res) => {
    try {
      const { id } = req.params

      const data = await fs.readFile('./data/extras/sys-notas.json', 'utf8')
      const notas = JSON.parse(data)
      const index = notas.findIndex((nota) => nota.id === Number(id))
      if (index === -1) {
        return res.status(404).json({
          msg: `No se encontró la nota con el id n° ${id}`
        })
      }
      const notaEncontrada = notas[index]
      notas.splice(index, 1)
      await fs.writeFile(
        './data/extras/sys-notas.json',
        JSON.stringify(notas, null, 2),
        'utf8'
      )
      return res.status(200).json({
        msg: `Se eliminó correctamente la nota del id n° ${notaEncontrada.id}`,
        nota: notaEncontrada
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        error: `No se pudieron eliminar los datos de la nota del id n° ${id}`
      })
    }

    module.exports = {
      getAllNotas,
      getNotaById,
      postNewNota,
      putNotaById,
      deleteNotaById
    }
  }
}
