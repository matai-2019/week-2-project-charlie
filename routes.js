const router = require('express').Router()
const fs = ('fs')
const data = require('../data.json')

router.get('/', (req, res) => {
  res.send('/')
})