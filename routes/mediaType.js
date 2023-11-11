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

router.get("/api/movies/mediaType", (req, res) => {
  try {
    let page = parseInt(req.query.page);
    let mediaType = req.query.media_type.toLowerCase();
    let mediaTypeArray = [];

    // console.log("req.queryType", req.query);
    // console.log("type", typeof mediaType);

    let n = movieLists.length;
    if (movieLists !== undefined && movieLists !== null) {
      movieLists.map((item) =>
        item.media_type.toLowerCase() === mediaType
          ? mediaTypeArray.push(item)
          : false
      );
    }

    // console.log("mediaTypeArray", typeof mediaTypeArray, mediaTypeArray);
    let count, perPage, pageCount;
    let results = [];
    const renderData = (array) => {
      count = Object.keys(array).length;
      perPage = 10;
      pageCount = Math.ceil(count / perPage);
      results = array.slice((page - 1) * perPage, page * perPage);
    }
    
    if (mediaType !== "all") {
      renderData(mediaTypeArray)
      res.json({
        results: results,
        page: page,
        total_pages: pageCount,
      });
    }else {
      renderData(movieLists)
      res.json({
        results: results,
        page: page,
        total_pages: pageCount,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ err: true, message: "Not found keyword parram" });
  }
});

module.exports = router;
