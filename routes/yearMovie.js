const path = require("path");
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const auth = require("../middleware/auth");

const movieLists = require("../data/movieList.json");

const cors = require("cors");
router.use(cors());

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get("/api/movies/year", (req, res) => {
  try {
    let yearArray = [];
    let page = parseInt(req.query.page);
    let year = parseInt(req.query.yearMovie);

    console.log("req.queryid", req.query);

    let n = movieLists.length;
    for (let i = 0; i < n; i++) {
      let d = movieLists[i].release_date;
      let t = movieLists[i].first_air_date;

      let date = new Date(d);
      let date1 = new Date(t);
      let fullYear, fullYear1;
      fullYear = date.getFullYear();
      fullYear1 = date1.getFullYear();
      if (fullYear === year || fullYear1 === year) {
        yearArray.push(movieLists[i]);
      }
    }

    // console.log("yearArray", yearArray);

    const count = Object.keys(yearArray).length;
    const perPage = 10;
    const pageCount = Math.ceil(count / perPage);
    const results = yearArray.slice((page - 1) * perPage, page * perPage);

    res.json({
      results: results,
      page: page,
      total_pages: pageCount,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ err: true, message: "Not found keyword parram" });
  }
});

module.exports = router;
