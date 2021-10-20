// src/components/movie-card/movie-card.jsx
import React from 'react';
import PropTypes from 'prop-types';

export class MovieCard extends React.Component {
  render() {
      const { movie, onMovieClick } = this.props;
      
      return (
        <div onClick={() => onMovieClick(movie)} className="movie-card">{movie.Title}</div>
      );
      // return <div className="movie-card" onClick={() => {onMovieClick(movie); }}>{movie.Title}</div>
    }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    // ImageURL: PropTypes.string.isRequired,
    // Genre: PropTypes.shape({
    //   Name: ...
    //   ...
    // })
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};
