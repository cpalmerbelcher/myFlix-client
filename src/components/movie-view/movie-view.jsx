import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

import './movie-view.scss';

export class MovieView extends React.Component {

  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
  }

    render() {
        const { movie, onBackClick } = this.props;

        return (

          <Container fluid className="moviesContainer">
            <Row>
              <Col>
                <div className="movie-view">
                  <div className="movie-poster">
                    <img src={movie.ImagePath} style={{ height: '500px', marginTop: '4em' }} />
                  </div>
                  <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movie.Title}</span>
                  </div>
                  <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.Description}</span>
                  </div>
                  <div className="movie-genre">
                    <span className="genre">Genre: </span>
                    <span className="value">{movie.Genre.Name}</span>
                  </div>
                  <div className="genre-description">
                    <span className="genre">Genre Description: </span>
                    <span className="value">{movie.Genre.Description}</span>
                  </div>
                  <div className="movie-director">
                    <span className="director">Director: </span>
                    <span className="value">{movie.Director.Name}</span>
                  </div>
                  <div className="director-bio">
                    <span className="director">Bio: </span>
                    <span className="value">{movie.Director.Bio}</span>
                  </div>

                  <div className="director-button-div">
                    <Link to={`/directors/${movie.Director.Name}`}>
                    <Button style={{backgroundColor: 'white', color: 'black'}}variant="link">Director</Button>                    
                    </Link>
                  </div>

                  <div className="genre-button-div">
                    <Link to={`/genres/${movie.Genre.Name}`}>
                    <Button style={{backgroundColor: 'white', color: 'black'}} variant="link">Genre</Button>                    
                    </Link>
                  </div>

                  <button className="movie-button" bg="dark" variant="dark" onClick={() => { onBackClick(null); }}>Back</button>
                </div>
              </Col>
             </Row>
          </Container>
          );
    }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ReleaseYear: PropTypes.number.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
    }),
  }).isRequired,
};