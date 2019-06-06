const express = require('express')
const router = express.Router()
const data = require('./data.json')
const fs = require('fs')

router.get('/:id', (req, res) => {
  const foundFood = data.restaurants.find(restaurant => req.params.id == restaurant.id)
  res.render('view', foundFood)
})

router.post('/comments/:id', (req, res) => {
  const foodIndex = data.restaurants.findIndex(restaurant => req.params.id == restaurant.id)
  data.restaurants[foodIndex].comments.push({

    name: req.body.name,
    comment: req.body.comment
  })
  fs.writeFile('./data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error(err)
      // eslint-disable-next-line no-useless-return
      return
    }
  })
  res.redirect(`/${req.params.id}`)
})

router.get('/', (req, res) => {
  res.render('home', data)
})

module.exports = router
