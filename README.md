
## TRABAJO PRÁCTICO N°4: Consumo de APIs, Arquitectura MVC, deploys y Docker

## API Sistema de Alumnos (TP4)
Este proyecto es una API REST desarrollada para gestionar el sistema de un centro educativo, permitiendo administrar alumnos, profesores, materias y notas. La aplicación se encarga de realizar operaciones de alta, baja, modificación y consulta (CRUD) procesando los datos de manera segura y guardándolos localmente en archivos independientes en formato JSON. El backend está preparado con validaciones de datos estructuradas en TypeScript y configurado con Docker para correr de igual manera tanto en entornos locales como en la nube

## GRUPO N°2:
- Franco Sinigaglia
- Joaquin Pignotti
- Lucia Aguero
- Mateo Benjamin Barrera
- Ricardo Herbas
- Ignacio Painenahuel Luna

## Tecnologías utilizadas: Node.js, Express, TypeScript, Docker, Render, Postman

## Estructura del proyecto
```
/proyecto
│
├── .dockerignore
├── Dockerfile
├── README.md
├── app.js            # Archivo inicial de ejecución de Node.js
│
├── /controllers     # Lógica de negocio y manejo de peticiones asíncronas
│   ├── alumno.controller.js
│   └── /extras
│       ├── materia.controller.js
│       ├── nota.controller.js
│       └── profesor.controller.js
│
├── /core
│   └── server.js     # Configuración de la clase Server y ruteo global
│
├── /data            # Persistencia local mediante archivos JSON independientes
│   ├── alumnos.json
│   └── /extras
│       ├── sys-materias.json
│       ├── sys-notas.json
│       └── sys-profesores.json
│
├── /middleware      # Validaciones previas de estructuras y tipos de datos
│   ├── alumno-validator.middleware.js
│   ├── materia-validator.middleware.js
│   ├── nota-validator.middleware.js
│   └── profesor-validator.middleware.js
│
└── /routes          # Definición y mapeo de rutas/endpoints HTTP
    ├── alumno.routes.js
    └── /extras
        ├── materia.routes.js
        ├── nota.routes.js
        └── profesor.routes.js
```

## Lógica principal

El servidor se inicializa en `app.js` ejecutando una instancia de la clase `Server` estructurada en `./core/server.js`. La aplicación implementa el Modelo-Vista-Controladorpara desacoplar las responsabilidades. 

Las peticiones HTTP entrantes son interceptadas por las rutas express en `/routes`, evaluadas mediante las validaciones de datos en `/middleware` y delegadas a las funciones asíncronas de los controladores en `/controllers`. Estos controladores leen y escriben datos directamente sobre el sistema de archivos utilizando el módulo de promesas de Node.js (`fs.promises`), garantizando la persistencia mediante estructuras basadas en bloques `try/catch`.


## Metodología de Trabajo con Git y GitHub

Trabajamos con una metodologia basada en git flow. Se protegió la rama `main` para código de producción a la entrega final. 

Cada integrante desarrolló de forma aislada en sus respectivas ramas de desarrollo locales y remotas (`dev` y ramas específicas de características). 

## Información General del Despliegue (Deploy)

* **Link del Deploy Front-End:** https://barreramateo.github.io/tp4-g2-front/
* **Link del Deploy Back-End:** https://tp4-nodejs-g2.onrender.com/alumnos

## Dockerización del Entorno
Para garantizar la paridad entre desarrollo y producción se utilizó un contenedor Docker basado en la siguiente especificación real:
```dockerfile
FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## Estructura de cada Archivo JSON Utilizado

## 1. Alumnos (`./data/alumnos.json`)
```json
[
  {
    "legajo": 10001,
    "nombre": "Mora",
    "apellido": "García",
    "email": "m.garcia@facultad.edu.ar",
    "fechaAlta": "2026-03-02",
    "modificacion": "2026-03-02",
    "isActive": true
  }
]
```

## 2. Materias (./data/extras/sys-materias.json)
```json
[
  {
    "idMateria": "MAT101",
    "nombre": "Matemática I",
    "cuatrimestre": 1
  }
]
```

## 3. Notas (./data/extras/sys-notas.json)
```json
[
  {
    "id": 1,
    "legajo": 10001,
    "idMateria": "MAT101",
    "nota": 9,
    "fecha": "03-04-24"
  }
]
```

## 4. Profesores (./data/extras/sys-profesores.json)
```json
[
  {
    "legajo": 20001,
    "nombre": "Ana",
    "apellido": "Fernández",
    "email": "a.fernandez@facultad.edu.ar",
    "especialidad": "Matemática",
    "fechaAlta": "2026-03-02",
    "modificacion": "2026-03-02",
    "isActive": true
  }
]
```
##  Mapa de Endpoints (Lista de Rutas)
Módulo de Alumnos

🟢 GET /alumnos: Recupera la lista completa de alumnos del sistema. Estado exitoso: 200 OK.

🔵 GET /alumnos/:legajo: Busca un alumno específico mediante su número de legajo. Estado exitoso: 200 OK.

🟡 POST /alumnos: Da de alta un nuevo alumno en el archivo JSON. Estado exitoso: 201 Created.

🟠 PUT /alumnos/:legajo: Modifica los datos existentes de un alumno según su legajo. Estado exitoso: 200 OK.

🔴 DELETE /alumnos/:legajo: Elimina de forma física a un estudiante del sistema. Estado exitoso: 200 OK.

Módulo de Profesores

🟢 GET /profesores: Recupera la lista completa de profesores del sistema. Estado exitoso: 200 OK.

🔵 GET /profesores/:legajo: Busca un profesor específico mediante su número de legajo. Estado exitoso: 200 OK.

🟡 POST /profesores: Da de alta un nuevo profesor en el archivo JSON. Estado exitoso: 200 OK.

🟠 PUT /profesores/:legajo: Modifica los datos existentes de un profesor según su legajo. Estado exitoso: 200 OK.

🔴 DELETE /profesores/:legajo: Elimina de forma física a un profesor del sistema. Estado exitoso: 200 OK.

## Funcionalidades de los Controladores 

### Módulo de Alumnos (`alumno.controller.js`)

```getAlumnoAll(req, res)```
* **Descripción:** Lee el archivo JSON de alumnos y devuelve la lista completa.
```javascript
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

```
Parámetros: req (petición), res (respuesta).

Valor de retorno: Array con todos los alumnos en formato JSON.

Lógica: Abre el archivo ./data/alumnos.json con fs.readFile. Convierte el texto plano a un array de objetos con JSON.parse() y lo envía con un estado 200 OK. Si hay un fallo de lectura, el catch lo detecta y devuelve un estado 500.


```getAlumnoById(req, res) ```

Descripción: Busca y devuelve los datos de un único alumno usando su número de legajo enviado por la URL.


```JavaScript
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

```
Parámetros: req.params.legajo (número de legajo enviado en la ruta).

Valor de retorno: Objeto con los datos del alumno o un mensaje de error.

Lógica: Extrae el legajo de la URL, lo convierte a número con Number() y lo busca en el array con .find(). Si no lo encuentra, corta el flujo devolviendo un estado 404 Not Found. Si existe, lo muestra con un 200 OK.


```postNewAlumno(req, res)```

Descripción: Registra un nuevo alumno en el sistema generando su legajo de manera automática.


```JavaScript
const postNewAlumno = async (req, res) => {
  try {
    const { nombre, apellido, email } = req.body
    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)

    const legajos = alumnos.map((alumno) => alumno.legajo)
    const nuevoLegajo = Math.max(...legajos) + 1

    const nuevoAlumno = new AlumnoModel(nombre, apellido, email, nuevoLegajo)
    const alumnoNuevo = nuevoAlumno.getAllAttributes()

    alumnos.push(alumnoNuevo)

    await fs.writeFile(
      './data/alumnos.json',
      JSON.stringify(alumnos, null, 2),
      'utf8'
    )

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

```
Parámetros: req.body (objeto JSON con nombre, apellido y email).

Valor de retorno: Mensaje de confirmación y el objeto del alumno creado.

Lógica: Recibe los datos del formulario. Arma una lista con todos los legajos usando .map() y calcula el número más alto con Math.max(), sumándole 1 para crear el nuevo legajo. Crea la entidad con AlumnoModel, la añade al array con .push() y guarda los cambios en el archivo plano usando fs.writeFile.


```putAlumnoBylegajo(req, res)```

Descripción: Modifica las propiedades de un alumno existente sin permitir cambiar su número de legajo.


```JavaScript
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
    if (typeof isActive === 'boolean') {
      alumnos[index].isActive = isActive
    }

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

```
Parámetros: req.params.legajo e información a actualizar en el req.body.

Valor de retorno: Mensaje de éxito y el objeto modificado.

Lógica: Busca la posición del alumno en el array usando .findIndex(). Si da -1 devuelve un estado 404. Si lo encuentra, verifica qué datos vinieron en el cuerpo de la petición y los reemplaza. Actualiza automáticamente la propiedad modificacion con la fecha del día actual y guarda el archivo.


```deleteAlumnoByLegajo(req, res)```

Descripción: Elimina de forma física y definitiva a un estudiante del archivo JSON.


```JavaScript
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

    const alumnoEncontrada = alumnos[index]

    alumnos.splice(index, 1)

    await fs.writeFile(
      './data/alumnos.json',
      JSON.stringify(alumnos, null, 2),
      'utf8'
    )

    return res.status(200).json({
      msg: `Se eliminó correctamente el alumno con el legajo n° ${alumnoEncontrada.legajo}`,
      alumno: alumnoEncontrada
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      error: 'No se pudo eliminar el alumno del sistema'
    })
  }
}
```
Parámetros: req.params.legajo.

Valor de retorno: Objeto del alumno que fue eliminado del sistema.

Lógica: Encuentra la posición del estudiante por legajo. Al comprobar que existe, usa el método mutador .splice(index, 1) para quitarlo por completo del array de datos. Guarda la colección actualizada con fs.writeFile.

## Módulo Extra de Materias
``` getMateriaAll(req, res) ```

Descripción: Recupera y devuelve la lista completa de todas las materias.


```JavaScript
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

```
Parámetros: req, res.

Valor de retorno: Array completo de materias registradas.

Lógica: Abre de forma asíncrona ./data/extras/sys-materias.json, parsea el archivo de texto y lo devuelve con un estado HTTP 200 OK.


```getMateriaById(req, res) ``` 

Descripción: Busca una materia en particular utilizando su código de identificación string.


``` JavaScript
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

```
Parámetros: req.params.id.

Valor de retorno: Objeto de la materia encontrada.

Lógica: Usa el método .find() para evaluar si el código coincide con la propiedad idMateria. Si no se localiza la asignatura, responde un código 404 Not Found.


```postNewMateria(req, res) ```

Descripción: Registra una nueva materia en el almacenamiento controlando que el ID no se repita.


```JavaScript
const postNewMateria = async (req, res) => {
  try {
    const { idMateria, nombre, cuatrimestre } = req.body

    const data = await fs.readFile('./data/extras/sys-materias.json', 'utf8')
    const materias = JSON.parse(data)

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
```
Parámetros: req.body (código idMateria, nombre y cuatrimestre).

Valor de retorno: Mensaje de éxito y objeto de la materia creada.

Lógica: Aplica el método .some() sobre el array para verificar duplicados. Si el código ya existe, rebota la operación con un estado 400 Bad Request. Si está disponible, añade el objeto con .push() y guarda el archivo con un estado 201 Created.

```putMateriaById(req, res) ```

Descripción: Actualiza los datos de una materia guardando la fecha exacta del cambio.

```JavaScript
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
```
Parámetros: req.params.id y variables en el req.body.

Valor de retorno: Objeto modificado con su correspondiente estampa de tiempo.

Lógica: Localiza la posición de la materia en el array. Si da -1 devuelve un error 404. Reemplaza las propiedades que se hayan enviado, introduce de forma automática la fecha actual formateada y escribe en el almacenamiento plano.

```deleteMateriaById(req, res)```

Descripción: Remueve una materia específica de los registros persistentes.

```JavaScript
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
```
Parámetros: req.params.id.

Valor de retorno: Datos de la materia removida del sistema.

Lógica: Busca la posición de la asignatura. Si existe, clona el objeto, borra el elemento original de la colección usando .splice(index, 1) y guarda los cambios físicos en disco.

## Módulo Extra de Notas 
(nota.controller.js)
getAllNotas(req, res)

Descripción: Retorna el listado globalizado de todas las calificaciones registradas.

```JavaScript
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
```
Parámetros: req, res.

Valor de retorno: Array completo con todas las notas en formato JSON.

Lógica: Ejecuta de forma asíncrona la lectura del archivo plano de notas, convierte el string resultante y lo despacha al cliente con un estado HTTP 200 OK.

```getNotaById(req, res) ```

Descripción: Busca una calificación específica según su número de identificación indexado.

```JavaScript
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
```
Parámetros: req.params.id.

Valor de retorno: Objeto de la nota localizada.

Lógica: Convierte la cadena del parámetro dinámico a entero aplicando Number(). Si .find() no localiza correspondencia exacta, corta el flujo devolviendo un error 404 Not Found.

```postNewNota(req, res) ```

Descripción: Registra una nueva nota vinculando un legajo con un código de materia.

```JavaScript
const postNewNota = async (req, res) => {
  try {
    const { legajo, idMateria, nota } = req.body

    const data = await fs.readFile('./data/extras/sys-notas.json', 'utf8')
    const notas = JSON.parse(data)
    const idnotas = notas.map((n) => n.id)
    const nuevoID = Math.max(...idnotas) + 1

    const nuevaNota = new NotaModel(nuevoID, legajo, idMateria, nota)
    const notaNueva = nuevaNota.getAllNotaAttributes()

    notas.push(notaNueva)
    await fs.writeFile('./data/extras/sys-notas.json', JSON.stringify(notas, null, 2), 'utf8')

    return res.status(201).json({
      msg: 'Se creó correctamente la nueva nota',
      nota: notaNueva
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: 'No se pudieron crear los datos de la nueva nota'
    })
  }
}
```
Parámetros: req.body (legajo, idMateria y nota numérico).

Valor de retorno: Confirmación e inyección del objeto persistido con un estado 201 Created.

Lógica: Extrae las variables del cuerpo. Deriva la próxima clave primaria mapeando los IDs existentes y sumándole 1 al valor máximo hallado con Math.max(). Instancia NotaModel de TypeScript, extrae sus atributos con .getAllNotaAttributes(), empuja el elemento al array y lo guarda en disco de forma segura.

```putNotaById(req, res) ```

Descripción: Actualiza los valores o reasigna campos de una nota localizándola por su ID numérico.

```JavaScript
const putNotaById = async (req, res) => {
  const { id } = req.params
  try {
    const { nota, idMateria } = req.body
    const data = await fs.readFile('./data/extras/sys-notas.json', 'utf8')
    const notas = JSON.parse(data)
    const notaIndex = notas.findIndex((n) => n.id === Number(id))
    if (notaIndex === -1) {
      return res.status(404).json({ error: 'Nota no encontrada' })
    }

    if (nota) notas[notaIndex].nota = nota
    if (idMateria) notas[notaIndex].idMateria = idMateria

    notas[notaIndex].modificacion = new Date().toISOString().split('T')[0]

    await fs.writeFile('./data/extras/sys-notas.json', JSON.stringify(notas, null, 2), 'utf8')

    return res.status(200).json({
      msg: `Se modificó correctamente la nota del id n° ${id}`,
      notaModificada: notas[notaIndex]
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: `No se pudieron modificar los datos del nota del id n° ${id}`
    })
  }
}
```
Parámetros: req.params.id y datos actualizados en el cuerpo.

Valor de retorno: Objeto modificado junto a la estampa de auditoría.

Lógica: Ejecuta un .findIndex() casteando la entrada a número. Si da de baja la existencia con un índice -1 interrumpe devolviendo un estado 404. Sobrescribe de forma selectiva los campos alterados, inyecta el marcador temporal y escribe en disco.

``` deleteNotaById(req, res) ```

Descripción: Elimina físicamente una nota del array local indexado.

```JavaScript
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
    await fs.writeFile('./data/extras/sys-notas.json', JSON.stringify(notas, null, 2), 'utf8')

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
}
```
Parámetros: req.params.id.

Valor de retorno: Objeto plano con la nota eliminada de la persistencia.

Lógica: Valida la presencia de la nota mediante su índice. Si es correcto, remueve la tupla alterando el vector original con .splice(index, 1) y guarda la nueva colección reducida en el almacenamiento plano.

## Módulo Extra de Profesores 
(profesor.controller.js)
getProfesorAll(req, res)

Descripción: Accede a la base de datos simulada y lista todos los docentes.

```JavaScript
const getProfesorAll = async (req, res) => {
  try {
    const data = await fs.readFile('./data/extras/sys-profesores.json', 'utf8')
    const profesores = JSON.parse(data)

    return res.status(200).json(profesores)
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      error: 'No se pudieron obtener los datos de los profesores'
    })
  }
}
```
Parámetros: req, res.

Valor de retorno: Colección total de profesores en formato JSON.

Lógica: Abre una tubería de lectura asíncrona hacia ./data/extras/sys-profesores.json, convierte el buffer plano de texto a JSON y lo devuelve aplicando un código 200 OK.

``` getProfesorById(req, res) ```

Descripción: Recupera la ficha completa de un docente buscando por su legajo.

```JavaScript
const getProfesorById = async (req, res) => {
  try {
    const data = await fs.readFile('./data/extras/sys-profesores.json', 'utf8')
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
```
Parámetros: req.params.legajo.

Valor de retorno: objeto del profesor mapeado o un mensaje explícito de error.

Lógica: Aplica Number() al legajo de la URL para realizar una búsqueda estricta con el método .find(). Si la consulta arroja una referencia nula, corta devolviendo un estado HTTP 404.

```postNewProfesor(req, res)```

Descripción: Registra un nuevo profesor calculando su clave única secuencial.

```JavaScript
const postNewProfesor = async (req, res) => {
  try {
    const { nombre, apellido, email, especialidad } = req.body

    const data = await fs.readFile('./data/extras/sys-profesores.json', 'utf8')
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
      './data/extras/sys-profesores.json',
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
```
Parámetros: Datos estructurados enviados en el req.body.

Valor de retorno: Mensaje confirmando el alta junto al objeto del profesor indexado.

Lógica: Mapea los legajos cargados y suma una unidad al valor máximo devuelto por Math.max() para asegurar un legajo único. Instancia la clase abstracta ProfesorModel, obtiene los atributos procesados e introduce el nuevo objeto al almacenamiento.

```putProfesorByLegajo(req, res) ```

Descripción: Modifica los campos de un profesor existente guardando auditorías temporales.

```JavaScript
const putProfesorByLegajo = async (req, res) => {
  const { legajo } = req.params

  try {
    const { nombre, apellido, email, especialidad, isActive } = req.body

    const data = await fs.readFile('./data/extras/sys-profesores.json', 'utf8')
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
      './data/extras/sys-profesores.json',
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
```
Parámetros: req.params.legajo y variables opcionales de edición en el cuerpo.

Valor de retorno: Objeto actualizado de forma parcial o total.

Lógica: Ubica el índice correspondiente mediante .findIndex(). Reemplaza las variables que viajan en el cuerpo mediante condicionales if. Valida de forma estricta que la baja lógica sea de tipo booleano (typeof === 'boolean'), guarda la fecha actual en la propiedad modificacion y escribe sobre el archivo físico de profesores.

```deleteProfesorByLegajo(req, res)```

Descripción: Elimina definitivamente la ficha de un docente del padrón.

```JavaScript
const deleteProfesorByLegajo = async (req, res) => {
  try {
    const { legajo } = req.params

    const data = await fs.readFile('./data/extras/sys-profesores.json', 'utf8')
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
      './data/extras/sys-profesores.json',
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
```
Parámetros: req.params.legajo.

Valor de retorno: Objeto del profesor removido de la base de datos plana.

Lógica: Valida la posición indexada. Si no se encuentra, interrumpe arrojando un error de estado 404. Caso contrario, reduce las dimensiones del vector usando .splice(index, 1) y escribe concurrentemente en disco con fs.writeFile.

## Documentación con Postman de todos los Métodos
* **Enlace de la Colección Compartida en Postman:** https://mateobenjamintoto08-8666976.postman.co/workspace/Mateo-Benjamin-Barrera's-Worksp~cacc08c6-5109-452f-86ad-73def2b54fae/collection/49826409-71d2cce5-9ef2-401b-ba23-29c2116ed418?action=share&creator=49826409