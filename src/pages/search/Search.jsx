import React, { useEffect, useState } from "react";

// import Genre from "./components/Genre";
import Nav from "../browse/components/Nav";

import "./components/Movie.css";
import "../browse/components/Row.css";

export default function Search() {
  const [search, setSearch] = useState("");
  const [datas, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState([]);
  const [dataId, setDataId] = useState();
  const [media, setMedia] = useState('');
  const [language, setLanguage] = useState('en');
  const [yearMovie, setYear] = useState()

  let total_pages = datas?.total_pages;
  let genreArray = [];
  let dataArray = [];
  let mediaType = [];

  // const token = '8qlOkxz4wq'
  // console.log('queryGET', search)
  // console.log('dataId1', dataId)
  // console.log('genre', genre)
  // console.log('media', media)
  // console.log('language', language)
  console.log('year', yearMovie)

  const base_url = 'https://www.themoviedb.org/t/p/original'

  useEffect(() => {
    let requestOption = {
      method: 'GET',
      redirect: 'follow'
    }
    fetch("http://localhost:5000/genre", requestOption)
      .then(response => response.text())
      .then(result => setGenre(JSON.parse(result)))
      .catch(error => console.log('error', error))
  }, [])

  genreArray = genre?.genre?.Genre;
  mediaType = genre?.mediaType;
  // console.log('genreArray', genreArray)
  // console.log('mediaType', mediaType)

  const submit = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer 8qlOkxz4wq");

    var raw;
    var requestOptions;
    if (search) {
      console.log('submit1');
      raw = JSON.stringify({
        "search": search,
        "page": page
      });

      requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch(`http://localhost:5000/api/movies/search?page=${page}&token=8qlOkxz4wq`,
        requestOptions
      )
        .then(response => response.text())
        .then(result => {
          setData(JSON.parse(result));
          console.log('datas1', datas)
        })
        .catch(error => console.log('error', error));

    } else if (dataId) {
      console.log('submiteeeeed2');
      requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch(`http://localhost:5000/api/movies/discover?page=${page}&id=${dataId}`, requestOptions)
        .then(response => response.text())
        .then(result => {
          setData(JSON.parse(result));
          console.log('datas2', datas)
        })
        .catch(error => console.log('error', error));
    } else if (media) {
      console.log('submit3!')
      requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch(`http://localhost:5000/api/movies/mediaType?page=${page}&media_type=${media}`, requestOptions)
        .then(response => response.text())
        .then(result => {
          setData(JSON.parse(result));
          console.log('datas1', datas)
        })
        .catch(error => console.log('error', error));
      } else if (yearMovie) {
        console.log('submit5!')
        requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
  
        fetch(`http://localhost:5000/api/movies/year?page=${page}&yearMovie=${yearMovie}`, requestOptions)
          .then(response => response.text())
          .then(result => {
            setData(JSON.parse(result));
          })
          .catch(error => console.log('error', error));
      }
    else if (language) {
      console.log('submit4!')
      requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch(`http://localhost:5000/api/movies/language?page=${page}&language=${language}`, requestOptions)
        .then(response => response.text())
        .then(result => {
          setData(JSON.parse(result));
          console.log('datas1', datas)
        })
        .catch(error => console.log('error', error));
  }}

  console.log('datas2', datas)
  dataArray = datas?.results;
  console.log('dataArray', dataArray, typeof dataArray)

  const increment = () => {
    if (page < total_pages) {
      setPage(page + 1);
      // submit();
    }
  }
  const decrement = () => {
    if (page > 1) {
      setPage(page - 1);
      // submit();
    }
  }

  const now = new Date().getUTCFullYear();
  const years = Array(now - (now - 60)).fill('').map((v, idx) => now - idx);
  // console.log('years', years)

  return (

    <div className="items">
      <Nav />
      <div className="btn-modal">

        <div className="form">
          <input
            className="input"
            type="text"
            placeholder="Search Input!"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button className="button" type="submit" onClick={() => {
            console.log('Submited!');
            submit()
          }}
          >Search </button>
        </div>
        <div className="frontBar">
          <div className="genre">
            <select method="GET"
              onChange={(e) => {
                setDataId(e.target.value);
              }}>
              <option value=''>-Genre Select-</option>

              {genreArray?.map((item) => {
                return (
                  <option value={item.id} key={item.id} method="GET" type="submit">{item.name}</option>
                )
              })
              }
            </select>
          </div>
          <div className="mediaType">
            <select method="GET"
              onChange={(e) => {
                setMedia(e.target.value)
              }}>
              <option value=''>-Type-</option>
              {mediaType?.mediaType?.map((item) => {
                return (
                  <option value={item} key={Math.random()} method='GET'>{item}</option>
                )
              })}
            </select>
          </div>
          <div>
            <select method="GET"
              onChange={(e) => {
                setLanguage(e.target.value)
              }}>
              <option value={''} key={Math.random()} method='GET'>-Language-</option>
              <option value={'en'} key={Math.random()} method='GET'>English</option>
              <option value={'ja'} key={Math.random()} method='GET'>Japan</option>
              <option value={'ko'} key={Math.random()} method='GET'>Korea</option>
              <option value={'hi'} key={Math.random()} method='GET'>India</option>
              <option value={'zh'} key={Math.random()} method='GET'>China</option>
              <option value={'de'} key={Math.random()} method='GET'>Germany</option>
              <option value={'fr'} key={Math.random()} method='GET'>Franch</option>
            </select>
          </div>
          <div className="year">
            <select method="GET"
              onChange={(e) => {
                setYear(e.target.value);
              }}>
              <option value={''}>-Year-</option>
              {years?.map((item) => {
                return (
                  <option value={item} key={Math.random()} method='GET'>{item}</option>
                )
              })}
            </select>
          </div>
        </div>
        <h2 className="label" htmlFor="search">
          Search Results
        </h2>

      </div>
      <div className="card-list">
        {dataArray?.map((data) => {
          return (
            <div key={data.id} className="poster">
              <img src={base_url + data.poster_path} alt={data.name} />
              <div className="name">{data.original_name ? data.original_name : data.original_title}</div>
            </div>
          )
        })}
      </div>
      <div className='paginate'>
        <button className='previous' onClick={() => { decrement(); submit(); console.log('clicked!') }}>Previous</button>
        <button className="inputPage">{datas?.page}</button>
        <button className="next" onClick={() => { increment(); submit(); console.log('clicked!') }}>Next</button>
        <button className="totalPage">Total: {datas?.total_pages}</button>
      </div>

    </div>
  )
}
