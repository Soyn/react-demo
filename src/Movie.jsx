import React, { useState, useEffect } from "react";
import "./movies.scss";

const mockRequestResource = (url, time, resolve, reject) => {
  setTimeout(() => {
    window.fetch(url).then(res => {
      resolve(res);
    }, reject);
  }, time);
};
const fetchImg = (url, resolve) => {
  mockRequestResource(url, 3000, resolve);
};
const fetchMovie = (url, resolve) => {
  mockRequestResource(url, 2000, res => {
    res.json().then(resolve);
  });
};

const useImageFetcher = props => {
  const [url, setUrl] = useState(props.src);
  const [name, setName] = useState(props.name);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setUrl(props.src);
    setLoaded(false);
    fetchImg(props.src, () => {
      setLoaded(true);
    });
  }, [props.src]);
  useEffect(() => {
    setName(props.name);
  }, [props.name]);
  return {url, loaded, name};
};
class BouncingLoader extends React.Component {
  render() {
    return (
      <div className="bouncing-loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
}
function Image(props) {
  const { url, name, loaded } = useImageFetcher(props);
  if (loaded) {
    return <img src={url} className="movie-image" alt={name} />;
  } else {
    return <BouncingLoader />;
  }
}
function Description(props) {
  return (
    <>
      <div className="movie-title">{props.title}</div>
      <p className="movie-description">{props.content}</p>
    </>
  );
}
function Navigator({length, onChange}) {
  const [ previous, setPrevious ] = useState(-1);
  const [ current, setCurrent ] = useState(0);
  const jumpToPrevious = () => {
    setPrevious(current - 2);
    setCurrent(current - 1);
  }
  const jumpToNext= () => {
    setPrevious(current);
    setCurrent(current + 1);
  }
  useEffect(() => {
    onChange(current)
  })
  return (
    <div className="navigator-container">
      {previous > -1 && (
        <button onClick={jumpToPrevious}>{"<-- Previous"}</button>
      )}
      {
        <button
          disabled={current === length - 1}
          onClick={jumpToNext}
        >
          {"Next --->"}
        </button>
      }
    </div>
  );
}
function Movie() {
  const [articleIdx, setArticleIdx] = useState(0);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetchMovie("data/moviesReview.json", data => {
      const movies = data.movies;
      setMovies(movies);
    });
  });
  if (movies.length) {
    const movieInfo = movies[articleIdx];
    return (
      <div className="movie-review-container">
        <Image src={movieInfo.image} name={movieInfo.name} />
        <Description content={movieInfo.description} title={movieInfo.name} />
        <Navigator onChange={setArticleIdx} length={movies.length} />
      </div>
    );
  } else {
    return <BouncingLoader />;
  }
}
export default Movie;
