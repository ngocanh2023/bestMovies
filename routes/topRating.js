const path = require('path');
const express = require("express");
const router = express.Router();
const sortItem = require('../models/sortItem')
const movieLists = require('../data/movieList.json')
const paginate = require('../models/movieModel')

const highRatingData = sortItem(movieLists.vote_average)
const rateData = JSON.stringify(highRatingData)

const count= Object.keys(highRatingData).length;
const perPage = 20;
const pageCount = Math.ceil(count / perPage);

router.get('/api/movies/topRate', (req,res) => {
        const page = parseInt(req.query.page);
        if(page < 1) page = 1;
        if(page > pageCount) page = pageCount;
      
        const from = (page -1)*perPage; 
        let to = page*perPage; 
        if(to < 0) to = 0;
      
        const results = Object.fromEntries(
          Object.entries(highRatingData).slice(from,to)
      )
        res.json({
          results: results,
          page: page,
          total_pages: pageCount
        });
})

module.exports = router;