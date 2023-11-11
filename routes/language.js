const path = require("path");
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const auth = require('../middleware/auth')

const movieLists = require("../data/movieList.json");

const cors = require("cors");
router.use(cors());

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get("/api/movies/language", (req, res) => {
  try {
    let languageArray = [];
    let page = parseInt(req.query.page);
    let language = (req.query.language).toLowerCase();

    // console.log('req.queryid', req.query)

    let n = movieLists.length;
    for (let i = 0; i < n; i++) {
      if (movieLists[i].original_language === language) {
        languageArray.push(movieLists[i]);
      }
  }  
//   console.log('languageArray', languageArray)

  const count = Object.keys(languageArray).length;
  const perPage = 10;
  const pageCount = Math.ceil(count / perPage);
  const results = languageArray.slice((page - 1) * perPage, page * perPage);

  res.json({
    results: results,
    page: page,
    total_pages: pageCount
  })
} catch(e){
  console.log(e);
  res.status(400).json({ err: true, message: "Not found keyword parram" });
}
});

module.exports = router;
