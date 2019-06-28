const express = require('express')
const router = express.Router()
const fs = require('fs')

let wines = require('./data/wines')

router
    .route('/all')
    .get(function (req, res, next) {
        try {
            return res.status(200).json(wines)    
        }
        catch(err) {
            return next(new Error(err))
        }
    })

router
    .route('/store')
    .post(function (req, res, next) {
        try {
            let id
            const minId = 0
            let lastId = wines.reduce((max, wine) => {
                if (wine.id > minId) {
                    max = wine.id
                }

                return max
            })

            let obj = { ...req.body }
            obj.id = lastId + 1
            obj.notes = ''
            obj.visible = true

            wines.push(obj)

            const file = './app/data/wines.json'
            fs.writeFile(
                file, 
                JSON.stringify(wines),
                function(err) {
                if (err) {
                    return next(new Error(err)) 
                }
            })

            return res.status(200)    
        }
        catch(err) {
            return next(new Error(err))
        }
    })

module.exports = router