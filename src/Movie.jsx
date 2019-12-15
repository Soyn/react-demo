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
class BouncingLoader extends React.Component {
  render() {
    return (
      <div class="bouncing-loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
}
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
    return <BouncingLoader />;
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.src !== this.props.src) {
      this.setState(
        {
          url: this.props.src,
          loaded: false
        },
        () => {
          fetchImg(this.state.url, () => {
            console.log(this.state.url);
            this.setState({
              loaded: true
            });
          });
        }
      );
    }
    if (prevProps.name !== this.props.name) {
      this.setState({
        name: this.props.name
      });
    }
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
  render() {
    return (
      <>
        <div className="movie-title">{this.props.title}</div>
        <p className="movie-description">{this.props.content}</p>
      </>
    );
  }
}
class Navigator extends React.Component {
  constructor(props) {
    super(props);
    this.length = props.length || 0;
    this.state = {
      previous: -1,
      current: 0,
      loaded: false
    };
  }
  jumpToPrevious = () => {
    this.setState(
      {
        current: this.state.current - 1,
        previous: this.state - 2
      },
      () => {
        this.props.onChange(this.state.current);
      }
    );
  };
  jumpToNext = () => {
    this.setState(
      {
        previous: this.state.current,
        current: this.state.current + 1
      },
      () => {
        this.props.onChange(this.state.current);
      }
    );
  };
  render() {
    return (
      <div className="navigator-container">
        {this.state.previous > -1 && (
          <button onClick={this.jumpToPrevious}>{"<-- Previous"}</button>
        )}
        {
          <button
            disabled={this.state.current === this.length - 1}
            onClick={this.jumpToNext}
          >
            {"Next --->"}
          </button>
        }
      </div>
    );
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
  switchMovie = idx => {
    this.setState({
      articleId: idx
    });
  };
  render() {
    if (this.state.movies.length) {
      const movieInfo = this.state.movies[this.state.articleId];
      console.log("---> ", movieInfo);
      return (
        <div className="movie-review-container">
          <Image src={movieInfo.image} name={movieInfo.name} />
          <Description content={movieInfo.description} title={movieInfo.name} />
          <Navigator
            onChange={this.switchMovie}
            length={this.state.movies.length}
          />
        </div>
      );
    }
    return <BouncingLoader />;
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
