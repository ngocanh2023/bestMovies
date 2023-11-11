const movieLists = require('../data/movieList.json')

//Sắp xếp giảm dần
module.exports = function(sortItem) {
    return movieLists.sort((a, b) => b.sortItem - a.sortItem)
}