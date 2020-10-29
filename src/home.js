import React, { useState, useEffect,Suspense } from "react";
import "./App.css";

import { useSelector,useDispatch } from "react-redux";
import Header from "./header";
import { makeStyles } from '@material-ui/core/styles';
import Pagination from "@material-ui/lab/Pagination";

const RenderData = React.lazy(() => import('./renderdata'));

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));
function Home() {
  const [hasError, setErrors] = useState(false);
  const [searchName, setSearchName] = useState("");

  let [page, setPage] = useState(1);
  let { Images } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    let url="";
    async function fetchData() {
      if (searchName.length > 0) {
            url=`https://api.unsplash.com/search/photos?client_id=QOcjZAk1JV7JQD3Llh7Qxy0nxUgjwTFV9m-jc4jCwR8&query=${searchName}&page=${page}`
        }
      else {
              url=`https://api.unsplash.com/photos?client_id=QOcjZAk1JV7JQD3Llh7Qxy0nxUgjwTFV9m-jc4jCwR8`
          }
    fetch(url)
        .then((response) => response.json())
        .then((res) => {

          dispatch({ type: "SET_IMAGES", payload: res });
        })
        .catch((err) => setErrors(err));
    }
    fetchData();
  }, []);
  useEffect(() => {
    if (searchName.length > 0) {
      fetch(`https://api.unsplash.com/search/photos?client_id=QOcjZAk1JV7JQD3Llh7Qxy0nxUgjwTFV9m-jc4jCwR8&query=${searchName}`)
        .then((response) => response.json())
        .then((data) => dispatch({ type: "SET_IMAGES", payload: data.results }))
        .catch((err) => setErrors(err));
    }
  }, [searchName]);
  const handleChange = (event, value) => {
    fetch(`https://api.unsplash.com/photos?client_id=QOcjZAk1JV7JQD3Llh7Qxy0nxUgjwTFV9m-jc4jCwR8&page=${value}`)
      .then((response) => response.json())
      .then((res) => {
        dispatch({ type: "SET_IMAGES", payload: res });
      })
      .catch((err) => console.log(err));
    setPage(value);
  };
  const classes = useStyles();

  return (

    <div className="color-theme">
      <Header />
      <div className="head-mr"></div>

      <div className="images">
        <div className="container-fluid">
          <div className="search-box filter">
            <input
              type="text"
              placeholder="Search..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <i className="fas fa-search" aria-hidden="true"></i>
            <div className="theme-btn filter text-right">
              <button className="btn">Search</button>
            </div>
          </div>
          <Suspense fallback={<div>Loading...</div>}>

          {Images && Images.length ? (

            <RenderData
              data={Images}
              forSelection={true}
            />
          ) : <div>Loading...</div>}
          </Suspense>

        </div>
      </div>
      <div className={classes.root}>

  <Pagination
    count={Images.total_pages || 1000}
    page={page}
    onChange={handleChange}
    size="large"
  />
  </div>
    </div>
  );
}

export default Home;
