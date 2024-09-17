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

router.get("/api/movies/discover", (req, res) => {
  try {
    let movieGenreArray = [];
    let page = parseInt(req.query.page);
    let dataId = parseInt(req.query.id);

    // console.log('req.queryid', req.query)

    let n = movieLists.length;
    for (let i = 0; i < n; i++) {
    let m = movieLists[i].genre_ids.length;
    for (let j = 0; j < m; j++) {
      if (movieLists[i].genre_ids[j] === dataId) {
        movieGenreArray.push(movieLists[i]);
      }
    }
  }  
  // console.log('movieGenreArray', movieGenreArray)

  const count = Object.keys(movieGenreArray).length;
  const perPage = 10;
  const pageCount = Math.ceil(count / perPage);
  const results = movieGenreArray.slice((page - 1) * perPage, page * perPage);

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
