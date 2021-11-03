import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';

import './registration-view.scss';

export function RegistrationView(props) {
    const [ Username, setUsername ] = useState('');
    const [ Password, setPassword ] = useState('');
    const [ Email, setEmail ] = useState('');
    const [ Birthday, setBirthday ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(Username, Password, Email, Birthday);
        props.onRegistration(Username);
    };

    return (
        
        <Container fluid className="registerContainer" >
    
        <Navbar bg="navColor" variant="dark" expand="lg">
          <Container fluid>
            <Navbar.Brand href="#home">My-Flix App</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#logout">Register</Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <Row>
        <Col>
          <CardGroup>
            <Card className="registerCard">
              <Card.Body>
                <Card.Title className="text-center">Welcome to My-Flix App.</Card.Title>
                <Card.Subtitle className="mb-2 text-muted text-center">Please Register</Card.Subtitle>
            
                <Form>
                  <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" value={Username} onChange={e => setUsername(e.target.value)} />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={Password} onChange={e => setPassword(e.target.value)} />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={Email} onChange={e => setEmail(e.target.value)} />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control className="mb-3" type="date" value={Birthday} onChange={e => setBirthday(e.target.value)} />
                  </Form.Group>
                  
                  <Button className="registerButton" variant="secondary" size="lg" type="submit" onClick={handleSubmit}>Register</Button>
                  
                </Form>
              </Card.Body>
            </Card>
        </CardGroup>
        </Col>
      </Row>
    </Container>
    );
}

RegistrationView.propTypes = {
    onRegistration: PropTypes.func.isRequired,
};