import React from 'react';
import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';

const Login = ({ isAuthenticated, login }) => {
  const [formDetails, setFormDetails] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formDetails;

  const onChange = e => {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    login({ email, password });
  };

  if (isAuthenticated) {
    return <Redirect to='/subjects' />;
  }

  return (
    <div className='container'>
      <form onSubmit={onSubmit} className='my-5'>
        <fieldset>
          <legend>
            <h1>Login</h1>
          </legend>
          <div className='form-group'>
            <label htmlFor='email'>Email address</label>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              aria-describedby='emailHelp'
              placeholder='Enter email'
              value={email}
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              placeholder='Password'
              pb-role='password'
              value={password}
              onChange={onChange}
            />
          </div>
          <button type='submit' className='btn btn-dark mt-3'>
            Submit
          </button>
          <p className='my-1'>
            Don't have an account?
            <Link to='/register'>
              {' '}
              <span className='text-info'>Register</span>
            </Link>
          </p>
        </fieldset>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
  };
};

export default connect(mapStateToProps, { login })(Login);
