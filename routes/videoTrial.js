const path = require('path');
const express = require("express");
const router = express.Router();

const videoTrial = require('../data/videoList.json')

//361743
router.post('/api/movies/video', (req,res) => {
    let trialArray = [] ;
    let checkResult = [];
    let maxDate;
    let dateArray = [];
    const videoArray = function(id){
    videoTrial.map(item => item.id === id?trialArray.push(item.videos):false)
}
    const checkVideo = function(){
        if(!trialArray[0]){console.log("Not found film_id parram")} else {
            trialArray[0].map(item => {
            dateArray.push(new Date(item.published_at))
            maxDate = new Date(Math.max(... dateArray));
            item.official === true && item.site==="YouTube" && item.type === "Trailer" || item.type === "Teaser"
            Number(new Date(item.published_at) - maxDate) === 0? checkResult.push(item):false 
        });
        // console.log('checkResult', checkResult)
    }
}
    try {
        const id = parseInt(req.query.id);
        if(!id){
            res.status(400).json({err: true, message: '(400) Not found gerne parram!'})
            console.log('(400)Not found gerne parram')
          }
        videoArray(id);
        checkVideo();

        let resultVideo = {};
        resultVideo = {
            id: id,
            results: checkResult,
            message: '(200) Data Successed!'
        }
        res.json(resultVideo);
        
    }
    catch(err){
        console.log(err)
        res.status(500).json({err: true, message: 'Internet Error!'})
    }
})

module.exports = router;