import React, { useState } from "react";

import "./Movie.css";

import axios from "../../axios";
import YouTube from "react-youtube";

export default function Movie({ movie, isLargeRow }) {
  const [trailerUrl, setTrailerUrl] = useState("");

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  //Onclick large row
  const handleClick = async (movie, isLargeRow) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else if (!isLargeRow) {
      let trailerurl = await axios.get(
        `/movie/${movie.id}/videos?api_key=1526c72205e4f8d0f1f7cc3e6eaf8386`
      );
      setTrailerUrl(trailerurl.data.results[0]?.key);
    }
  };
  return (
    <div className="card" key={movie.id}>
      <img
        src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
        alt={movie.title + " poster"}
        onClick={() => handleClick(movie, isLargeRow)}
        className={`row__poster ${isLargeRow && "row__posterLarge"}`}
      />
      <div className="viewDetail">
        <div>
          <h2 className="titleReview">{trailerUrl && movie.title}</h2>

          <div className="realeseDate">
            {trailerUrl && `Release Date:  ${movie.release_date}`}
          </div>
          <div className="voteCount">
            {trailerUrl && `Vote: ${movie.vote_count}/${movie.vote_average}`}
          </div>
          <div className="viewContent">{trailerUrl && movie.overview}</div>
        </div>
      </div>
      <div className="youtube">
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </div>
  );
}
