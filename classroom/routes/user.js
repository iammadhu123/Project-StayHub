const express = require('express');
const { route } = require('../../routes/listing');
const router = express.Router();

//Index - users
router.get('/', (req, res) => {
    res.send("GET for users")
})
//show - users
router.get('/:id', (req, res) => {
    res.send("GET for show user id")
})
//POST - users
router.post('/', (req, res) => {
    res.send("POST for show users")
})
//DELETE - users
router.delete('/:id', (req, res) => {
    res.send("DELETE for user id")
}) 


module.exports = router;