import React, { useState } from 'react';
import axios from 'axios';
import "./LoginForm.css"
import { Fragment } from 'react';

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await axios.post('https://paraiso-api-dev-jajx.1.us-1.fl0.io/api/usuarios/login', {
        email,
        password,
      });

      localStorage.setItem('auth-token', response.data);

      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError('Credenciales no válidas');
      } else {
        setError('Error en el servidor');
      }
    }
  };

  return (
  <Fragment>
  <div className='formLogin-header'>
      <h2 className="formLogin-title">Login Intranet</h2>
      </div>
    <form className="formLogin" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Correo Electrónico:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Iniciar Sesión</button>
    </form>
    </Fragment>
  );
};

export default LoginForm;
