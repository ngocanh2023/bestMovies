const Movie = require('../models/movie');

exports.getMovie = (req, res, next) => {
    Movie.fetchAll(movies => {
        res.render('api/movies/search', {
            prods: movies, 
            pageTitle: 'Movies',
            path: '/api/movies/search'
        })
    })
}
exports.postMovieId = (req, res, next) => {
    const prodId = req.body.productId;
    Movie.findById(prodId, product => {
        
    })
}