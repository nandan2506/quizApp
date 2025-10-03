const express = require('express')
const { allQuestions, checkAnswers } = require('../controllers/question.controllers')
const questionroutes = express.Router()


questionroutes.get('/allQuestions', allQuestions)
questionroutes.post('/submit', checkAnswers)

module.exports = questionroutes