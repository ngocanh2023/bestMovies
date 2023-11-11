import React, { useState, useEffect } from "react";

import "./Row.css";

import axios from "../../../axios";
import YouTube from "react-youtube";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  //overview
  const [movie, setMovie] = useState([]);

  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      //overview
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }

    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  // Overview
  // function truncate(str, n) {
  //   return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  // }

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
    <div className="row">
      <h2>{title}</h2>

      <div>
        <div className="row__posters">
          {movies.map(
            (movie) =>
              movie.backdrop_path !== null && (
                <img
                  onClick={() => handleClick(movie, isLargeRow)}
                  key={movie.id}
                  className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                  src={`${base_url}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt={movie.name}
                />
              )
          )}
        </div>

        <div className="viewDetail">
          <div>
            <h2 className="titleReview">{trailerUrl && movie.title}</h2>
            {/* <div className="line">{trailerUrl && ___}</div> */}
            <div className="realeseDate">
              {trailerUrl && `Release Date:  ${movie.release_date}`}
            </div>
            <div className="voteCount">
              {trailerUrl && `Vote: ${movie.vote_count}/${movie.vote_average}`}
            </div>
            <div className="viewContent">{trailerUrl && movie.overview}</div>
          </div>
          <div className="youtube">
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Row;
