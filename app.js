const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const expressLayouts = require('express-ejs-layouts');
//Routing
const movieRoute = require('./routes/movieTrending');
const topRating = require('./routes/topRating')
const genreName = require('./routes/genreName')
const videoTrial = require('./routes/videoTrial')
const searchKeyword = require('./routes/searchKeyword')
const menuSearch = require('./routes/menuSearch')
const mediaType = require('./routes/mediaType')
const language = require("./routes/language")
const yearMovie = require('./routes/yearMovie')

const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(cors())
app.use(urlencodedParser)
app.use(jsonParser)
//Lấy các phim trending
app.use(movieRoute)
app.use(topRating)
app.use(genreName)
app.use(videoTrial)
app.use(searchKeyword)
app.use(menuSearch)
app.use(mediaType)
app.use(language)
app.use(yearMovie)

// Ejs
app.use(expressLayouts);
app.set('views engine', 'jade');

app.use(express.json())

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => { 
  res.status(404).send( 
      "<h1>Page not found on the server</h1>") 
}) 

app.listen(PORT, function () {
    console.log(`server listening on port ${PORT}`)
  })

