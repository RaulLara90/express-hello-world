'use strict'

var express = require('express')
var bodyParser = require('body-parser')
var app = express()

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(adminLog)

app.get('/user', (request, response, next) => {
  const users = [{ id: 1, name: 'Raul' }, { id: 2, name: 'Lucas' }]
  response.send(users)
})

app.get('/welcome-page', (request, response, next) => {
  response.send('<h1>WELCOME TO THIS PAGE</h1><h2>Support this</h2>')
})

app.get('/company', (request, response, next) => {
  response.send('<h3>AMARIS</h3><h3>CONSULTING</h3>')
})

app.get('/', (request, response, next) => {
  response.send('<h1>WELCOME TO THIS PAGE</h1>')
})

app.get('/user/:username', (request, response, next) => {
  response.send(request.params)
})

app.get('/search', (request, response, next) => {
  response.send(request.query)
})

app.post('/login', (request, response) => {
  const users = [
    {
      username: 'admin',
      password: 'admin'
    }, {
      username: 'admin2',
      password: 'admin2'
    }
  ]
  if (users.find(s => s.username === request.body.email && s.password === request.body.password)) {
    return response.send(`Email: ${request.body.email}, Password: ${request.body.password}`)
  }
  return response.status(401).send('No estas autorizado')
})

function adminLog (req, _, next) {
  console.log(req)
  if (req.body.email.includes('admin')) {
    console.log('>The user is an admin<')
  }
  next()
}

app.listen(3000, () => {
  console.log('Init service')
})
