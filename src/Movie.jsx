import React from "react";
import "./movies.scss";

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: props.src,
      loaded: false
    };
  }
  render() {
    if (this.state.loaded) {
      return (
        <img
          src={this.state.url}
          className="movie-image"
          alt={this.state.alt}
        />
      );
    }
    return <div>Loading....</div>;
  }

  componentDidMount() {
    window.fetch(this.state.url).then(img => {
      console.log("img ", img);
      setTimeout(() => {
        this.setState({
          loaded: true
        });
      }, 2000);
    });
  }
}
class Description extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: props.content,
      loaded: false
    };
  }
  render() {
    return <p className="movie-description">{this.state.content}</p>;
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
  render() {
    if (this.state.movies.length) {
      return (
        <div className="movie-review-container">
          <Image src={this.state.movies[this.state.articleId].image} />
          <Description
            content={this.state.movies[this.state.articleId].description}
          />
        </div>
      );
    }
    return <div>Loading...</div>;
  }
  componentDidMount() {
    window
      .fetch("data/moviesReview.json")
      .then(res => res.json())
      .then(data => {
        const movies = data.movies;
        setTimeout(() => {
          console.log(movies);
          this.setState({
            movies
          });
        }, 3000);
      });
  }
}

export default Movie;
