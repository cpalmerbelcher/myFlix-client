// myFlix-client/src/main-view/main-view.jsx

import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';

import './main-view.scss'

import {RegistrationView} from '../registration-view/registration-view';
import {LoginView} from '../login-view/login-view';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';
// import {Container} from 'react-bootstrap';
// import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';

export class MainView extends React.Component {

    constructor(){
      super();
      this.state = {
        movies: [],
        selectedMovie: null,
        user: null
      };
    }

    componentDidMount(){
      axios.get('https://my-flix-application.herokuapp.com/movies')
        .then(response => {
          this.setState({
            movies: response.data
          });
        })
        .catch(error => {
          console.log(error);
        });
    }

    setSelectedMovie(newSelectedMovie) {
      this.setState({
        selectedMovie: newSelectedMovie
      });
    }

    onRegistration(register) {
      this.setState({
        register,
      });
    }

    onLoggedIn(user) {
      this.setState({
        user
      });
    }
  
    render() {
      const { movies, selectedMovie, user, register } = this.state;

      if (!register) return (<RegistrationView onRegistration={(register) => this.onRegistration(register)}/>);
  
      if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

      if (movies.length === 0) return <div className="main-view" />;
  
      return (
        <Row className="main-view justify-content-md-center">
          {selectedMovie
            ? (
                <Col md={8}>
                  <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                </Col>
              )
              : movies.map(movie => (
                    <Col md={3}>
                    <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                  </Col>
                ))
          }
        </Row>
      );
    }
}

export default MainView;