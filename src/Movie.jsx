import React from "react";
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
class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: props.src,
      name: props.name,
      loaded: false
    };
  }
  render() {
    if (this.state.loaded) {
      return (
        <img
          src={this.state.url}
          className="movie-image"
          alt={this.state.name}
        />
      );
    }
    return <div>Loading....</div>;
  }

  componentDidMount() {
    fetchImg(this.state.url, img => {
      this.setState({
        loaded: true
      });
    });
  }
}
class Description extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: props.content,
      title: props.title,
      loaded: false
    };
  }
  render() {
    return (
      <>
        <div className="movie-title">{this.state.title}</div>
        <p className="movie-description">{this.state.content}</p>
      </>
    );
  }
}
class Navigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previous: -1,
      current: 0,
      loaded: false,
    }
  }
  jumpToPrevious = () => {
    this.setState({
      current: this.state.current - 1,
      previous: this.state - 2,
    }, () => {
      this.props.onChange(this.state.current);
    })
  }
  jumpToNext = () => {
    this.setState({
      previous: this.state.current,
      current: this.state.current + 1,
    }, () => {
      this.props.onChange(this.state.current);
    })
  }
  render() {
    return <div className="navigator-container">
      {this.state.previous > - 1 && <button onClick={this.jumpToPrevious}>{"<-- Previous"}</button>}
      {<button onClick={this.jumpToNext}>{"Next --->"}</button>}
    </div>;
  }
}
class Movie extends React.Component {
  constructor() {
    super();
    this.state = {
      articleId: 0,
      movies: []
    };
  }
  switchMovie = (idx) => {
    
  }
  render() {
    if (this.state.movies.length) {
      const movieInfo = this.state.movies[this.state.articleId];
      return (
        <div className="movie-review-container">
          <Image src={movieInfo.image} name={movieInfo.name} />
          <Description content={movieInfo.description} title={movieInfo.name} />
          <Navigator onChange={this.switchMovie}/>
        </div>
      );
    }
    return <div>Loading...</div>;
  }
  componentDidMount() {
    fetchMovie("data/moviesReview.json", data => {
      const movies = data.movies;
      this.setState({
        movies
      });
    });
  }
}
export default Movie;
