
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

// const movieLists = require("../data/movieList.json");
const genreLists = require('../data/genreList.json')
const mediaTypeLists = require('../data/mediaTypeList.json')

const auth = require("../middleware/auth");

const cors = require("cors");
router.use(cors());

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
// console.log('genreLists', genreLists)


router.get("/genre",(req, res) => {
    const genre = {
        'Genre': genreLists
    }
    const mediaType = {
        'mediaType': mediaTypeLists
    }
    res.send({genre, mediaType})
})

module.exports = router;
