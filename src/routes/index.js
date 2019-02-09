/**
 * Aquí defino todas mis rutas
 */

// uso el router de express
const { Router } = require ('express')
const router = Router()

const Image = require('../models/image')

const { unlink } = require('fs-extra')
const path = require('path')

router.get('/', async (req, res)=>{
    //res.send('Index page')
    const images = await Image.find()
    res.render('index', {images: images})
})

router.get('/upload', (req, res)=>{
    res.render('upload')
})

router.post('/upload', async (req, res)=>{
    // si se hizo bien la configuración de multer, los proceso de guardar imagenes devuelven un mensaje que se pude manipular así:
    // console.log(req.file)
    const image = new Image()
    image.title = req.body.title
    image.description = req.body.description
    image.filename = req.file.filename
    image.path = '/img/uploads/' + req.file.filename
    image.originalname = req.file.originalname
    image.mimetype = req.file.mimetype
    image.size = req.file.size

    await image.save()

    console.log(image)
    //res.send('uploaded')
    res.redirect('/')
})

router.get('/image/:id', async (req, res)=>{
    //res.send('Profile image')
    const image = await Image.findById(req.params.id)
    res.render('profile', {image: image})
})

router.get('/image/:id/delete/', async (req, res)=>{
    // elimino de la base de datos
    const image = await Image.findByIdAndDelete(req.params.id)
    // elimino del directorio
    // path.resolve nos ubica en la raiz del proyecto
    await unlink(path.resolve('./src/public' + image.path))
    //res.send('image deleted')
    res.redirect('/')
})

module.exports = router;