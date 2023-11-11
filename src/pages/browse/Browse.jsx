//import React, { useState, useEffect } from "react";
import React from "react";

import requests from "../../requests";
import Nav from "./components/Nav";
import Banner from "./components/Banner";
import Row from "./components/Row";

import "./Browse.css";

function Browse() {
  return (
    <div className="Browse">
      <Nav />
      <Banner />
      <Row
        title="Originals"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />

      <Row title="Xu Hướng" fetchUrl={requests.fetchTrending} />
      <Row title="Xếp Hạng Cao" fetchUrl={requests.fetchTopRated} />
      <Row title="Phim Hành Động" fetchUrl={requests.fetchActionMovies} />
      <Row title="Phim Hài" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Phim Kinh Dị" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Phim Lãng Mạn" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Phim Tài Liệu" fetchUrl={requests.fetchDocumentaries} />
    </div>
  );
}

export default Browse;
