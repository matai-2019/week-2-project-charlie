const formidable = require('formidable')
const fs = require('fs')
const path = require('path')

const data = require('./data.json')

const formProcessor = (req, res) => {
  let id = 4

  if (req.url === '/edit/new') {
    id = (data.restaurants.length + 1).toString()
    data.restaurants.push({
      id: id
    })
  } else {
    id = req.url[req.url.length - 1]
  }

  new formidable.IncomingForm()
    .parse(req)
    .on('field', (name, field) => {
      if (name === 'id') {
        data.restaurants[id - 1][name] = parseInt(field)
      } else {
        data.restaurants[id - 1][name] = field
      }
    })
    .on('fileBegin', (name, file) => {
      file.path = path.join(__dirname, '/public/images/', file.name)
    })
    .on('file', (name, file) => {
      data.restaurants[id - 1].image = `/images/${file.name}`
    })
    .on('aborted', () => {
      console.error('Request aborted by the user')
    })
    .on('error', err => {
      console.error('Error', err)
    })
    .on('end', () => {
      fs.writeFile('./data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) {
          // eslint-disable-next-line no-console
          console.error(err)
          // eslint-disable-next-line no-useless-return
          return
        }
        res.redirect(`/${req.params.id}`)
      })
    })
}

module.exports = formProcessor
