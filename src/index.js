/**
 * Considerar guardar los contanidos estaticos 
 * (imagenes propias y las cargadas por los usuarios) 
 * en Serverless como:
 * Amazon S3
 * Google Cloud 
 * Cloudinary
 * */

const express = require('express')
const path = require('path')
const morgan = require('morgan')
const multer = require('multer')
const uuid = require('uuid/v4')
const { format } = require('timeago.js')

// Inicialización
const app = express()
require('./database')

// Configuraciones
app.set('port', process.env.PORT || 3000)
/* Sin requerirlo (require), express trabaja con ejs como motor de las vistas*/
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Middlewares
app.use(morgan('dev'))
/* Entender desde el servidor los datos que se envía por un formulario */
app.use(express.urlencoded({extended: false}))
/* Para subir imagenes. [MiImagen] es el name de la etiqueta input que sube la imagen desde html. Fazt */
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename: (req, file, callback, filename) =>{
        callback(null, uuid()+ path.extname(file.originalname))
    }
})
app.use(multer({ storage : storage}).single('MiImagen'))

// Variables globales
/* Defino el formtato de fechas y tiempos según como los de timeago.js */
app.use((req, res, next) =>{
    app.locals.format = format
    next()
})

// Rutas
app.use(require('./routes/index'))

// Archivos estáticos
// La carpeta public podrá ser accedida desde el navegador
app.use(express.static(path.join(__dirname, 'public')))

// Iniciar el servidor
app.listen(3000, ()=>{
    console.log(`Server on port ${app.get('port')}`)
})