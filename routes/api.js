const express = require('express');
const router = express.Router();
const Entity = require('../models/entity');

router.get('/entities', (req, res, next) => {
    // This will return all the data
    Entity.find({})
        .then((data) => res.json(data))
        .catch(next)
})

router.get('/entities/:num/:query', async (req, res, next) => {
    // This will return data for specific id and query
    Entity.find({num: req.params.num}, `${req.params.query}`)
        .then((data) => res.json(data))
        .catch(next);
})

router.post('/entities', (req, res, next) => {
    if (req.body.name && req.body.hours && req.body.menu && req.body.num) {
        Entity.create(req.body)
            .then((data) => res.json(data))
            .catch(next)
    } else {
        res.json({
            error: "Fields are missing, remember to add them!",
        })
    }
})

router.post('/entities/info/:name', (req, res, next) => {
    if (req.body.hours) {
        Entity.findOneAndUpdate(({name: req.params.name}, {hours: req.body.hours}))
            .then((data) => res.json(data))
            .catch(next)
    }
    if (req.body.menu) {
        Entity.findOneAndUpdate(({name: req.params.name}, {menu: req.body.menu}))
            .then((data) => res.json(data))
            .catch(next)
    }
})

router.delete('/entities/:id', (req, res, next) => {
    Entity.findOneAndDelete({_id: req.params.id })
        .then((data) => res.json(data))
        .catch(next)
})

module.exports = router
