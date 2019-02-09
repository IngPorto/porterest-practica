const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/porterest',{
    useNewUrlParser: true
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.log('Error :c ---> '+err))