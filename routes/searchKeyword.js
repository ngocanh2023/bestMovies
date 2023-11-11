
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

const movieLists = require("../data/movieList.json");

const auth = require("../middleware/auth");

const cors = require("cors");
router.use(cors());

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.post("/api/movies/search", auth, (req, res) => {
  try {
    let page = req.query.page;
    let search = req.body.search;

    const searchArr = [];
    for (let i = 0; i < movieLists.length; i++) {
      // Dau hoi de may kiem tra neu ko co thi bo qua luon chu ko bao loi
      if (
        movieLists[i].title?.includes(search) ||
        movieLists[i].overview?.includes(search)
      ) {
        searchArr.push(movieLists[i]);
      }
    }

    // console.log("req.query11", req.query);
    // console.log("req.body11", req.body);

    const perPage = 10;
    const pageCount = Math.ceil(searchArr.length / perPage);
    const result = searchArr.slice((page - 1) * perPage, page * perPage);

    res.json({
      results: result,
      page: page,
      total_pages: pageCount,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: true, message: "Not found keyword parram" });
  }
});

module.exports = router;
