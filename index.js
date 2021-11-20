const express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  http = require('http'),
  cors = require('cors'),
  { routes } = require('./src/route'),
  path = require('path')

//Подключение к бд
mongoose.connect(
  'mongodb://localhost:27017/baker',
  {
    useNewUrlParser: true
  }, err => {
    if (err) throw err;
    console.log('База данных подключена')
  }
)

const app = express()
app.use(cors())
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb',
  parameterLimit:50000
}))

routes.forEach(item => {
  app.use(`/v1/${item}`, require(`./src/route/${item}`))
})

app.use('/v1/images', express.static(path.join(__dirname, 'uploads')))

const port = 3000
http.createServer({}, app).listen(port)
console.log('Сервер запущен на порту ' + port)
