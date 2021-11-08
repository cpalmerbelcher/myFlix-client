// myFlix-client/src/main-view/main-view.jsx

import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
      let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
          this.setState({
            user: localStorage.getItem('user')
          });
          this.getMovies(accessToken);
        }
    }

    getMovies(token) {
      axios.get('https://my-flix-application.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    onLoggedIn(authData) {
      console.log(authData);
      this.setState({
        user: authData.user.Username
      });

      localStorage.setItem('token', authData.token);
      localStorage.setItem('user', authData.user.Username);
      this.getMovies(authData.token);
    }

    onLoggedOut() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.setState({
        user: null
      });
    }

    // setSelectedMovie(newSelectedMovie) {
    //   this.setState({
    //     selectedMovie: newSelectedMovie
    //   });
    // }

    // onRegistration(register) {
    //   this.setState({
    //     register,
    //   });
    // }

    render() {
      const { movies, user } = this.state;

      // if (!register) return (<RegistrationView onRegistration={(register) => this.onRegistration(register)}/>);
  
      return (
        <Router>
          <Row className="main-view justify-content-md-center">
            <Route exact path="/" render={() => {
            if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
            if (movies.length === 0) return <div className="main-view" />;
              return movies.map(m => (
                <Col md={3} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ))
            }} />
            <Route path="/register" render={() => {
              if (user) return <Redirect to="/" />
              return <Col>
                <RegistrationView />
              </Col>
            }} />
            <Route path="/users/:username" render={(history) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                </Col>
              if (movies.length === 0) return <div className="main-view" />;
                return <Col md={8}>
                <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path="/movies/:movieId" render ={({ match, history }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              </Col>
              if (movies.length === 0) return <div className="main-view" />;    
              return <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                </Col>
            }} />

            <Route path="/directors/:name" render={({ match, history }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              </Col>
                if (movies.length === 0) return <div className="main-view" />;
                return <Col md={8}>
                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                </Col>
            }
            } />

            <Route path="/genres/:name" render={({ match, history }) => {
              if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
              </Col>
            }
            } />
          </Row>
        </Router>
      );
    }
}

export default MainView;