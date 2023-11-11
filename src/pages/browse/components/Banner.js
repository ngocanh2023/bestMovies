import React, { useState, useEffect } from "react";

import axios from "../../../axios";
import requests from "../../../requests";

import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);

      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);
  // useEffect(() => {
  //   const fetchData = () => {
  //     var myHeaders = new Headers();
  //     myHeaders.append("token", "8qlOkxz4wq");

  //     var requestOptions = {
  //       method: "GET",
  //       headers: myHeaders,
  //       redirect: "follow",
  //     };

  //     fetch("http://localhost:5000/api/movies/trending?page=1", requestOptions)
  //       .then((response) => response.text())
  //       .then((result) => {
  //         // console.log(result);
  //       setMovie(JSON.parse(result))
  //       })
  //       .catch((error) => console.log("error", error));
  //   };
  //   fetchData()
  // }, []);
  // Overview
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  const url = "https://image.tmdb.org/t/p/original/"

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <button className="banner__button">Play</button>
        <button className="banner__button">My List</button>
        {/* Overview */}
        <h1 className="banner__description">
          {truncate(movie?.overview, 200)}
        </h1>
      </div>
      <div className="banner__fadeBottom"></div>
    </header>
  );
}

export default Banner;
