const path = require('path');
const express = require("express");
const router = express.Router();
// const page = param.page || 1;
const paginate = require('../models/movieModel')
const sortItems = require('../models/sortItem')
const movieLists = require('../data/movieList.json')
const auth = require('../middleware/auth')
//Sắp xếp giảm dần(tăng dần a.name-b.name)
const popularityData = sortItems(movieLists.popularity)
const poData = JSON.stringify(popularityData)

const count= Object.keys(popularityData).length;
const perPage = 20;
const pageCount = Math.ceil(count / perPage);

router.get('/api/movies/trending', (req,res) => {
  let page = parseInt(req.query.page);
  if(page < 1) page = 1;
  if(page > pageCount) page = pageCount;

  const from = (page -1)*perPage; 
  let to = page*perPage; 
  if(to < 0) to = 0;

  const results = Object.fromEntries(
    Object.entries(popularityData).slice(from,to)
)
  res.json({
    results: results,
    page: page,
    total_pages: pageCount
  });
})

module.exports = router;