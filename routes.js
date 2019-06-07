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

router.post('/edit/:id', (req, res) => {
  const foodIndex = data.restaurants.findIndex(restaurant => req.params.id == restaurant.id)
  data.restaurants[foodIndex].name = req.body.name
  data.restaurants[foodIndex].image = req.body.image
  data.restaurants[foodIndex].rating = req.body.rating
  data.restaurants[foodIndex].price = req.body.price
  data.restaurants[foodIndex].url = req.body.url
  data.restaurants[foodIndex].keywords = req.body.keywords

  fs.writeFile('./data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error(err)
    }
  })
  res.redirect(`/${req.params.id}`)
})

router.get('/', (req, res) => {
  res.render('home', data)
})

module.exports = router
