import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
        <form>
          <label>
            Username:
            <input type='text' value={Username} onChange={e => setUsername(e.target.value)} />
          </label>
          <label>
            Password:
            <input type='password' value={Password} onChange={e => setPassword(e.target.value)} />
    
          </label>
          <label>
            Email:
            <input type='email' value={Email} onChange={e => setEmail(e.target.value)} />
    
          </label>
          <label>
            Birthday:
            <input type='date' value={Birthday} onChange={e => setBirthday(e.target.value)} />
    
          </label>
          <button type='submit' onClick={handleSubmit}>Register</button>
        </form>
      );
    }

RegistrationView.propTypes = {
    onRegistration: PropTypes.func.isRequired,
};