const express = require('express')
const router = express.Router()
const data = require('./data.json')
const fs = require("fs")

router.get('/:id', (req, res) => {
  const foundFood = data.restaurants.find(restaurant => req.params.id == restaurant.id)
  res.render('view', foundFood)
})

router.post('/comments/:id', (req, res) => {
  const foodIndex = data.restaurants.findIndex(restaurant => req.params.id == restaurant.id)
  data.restaurants[foodIndex].push({})
  fs.writeFile('./data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error(err)
      return
    };
  })
  res.redirect(`/${req.params.id}`)
})
