const express = require("express");
const router = express.Router();


router.get('/', function (req, res) {
    console.log("GET:/");
    res.send("using GET:/");
})

router.post('/', function (req, res) {
    console.log("POST:/");
    res.send("using POST:/");
})

module.exports = router;