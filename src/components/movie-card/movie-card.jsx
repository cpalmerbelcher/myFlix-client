// src/components/movie-card/movie-card.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';

export class MovieCard extends React.Component {
  render() {
      const { movie } = this.props;
      
      return (
        <Container className="movieContainer">
          <Row>
            <Col>
              <CardGroup>
                <Card className="movieCard text-center" >
                  <Card.Img className="cardImage" variant="top" src={movie.ImagePath} />
                  <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Link to={`/movies/${movie._id}`}>
                      <Button variant="link">Open</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      );
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
