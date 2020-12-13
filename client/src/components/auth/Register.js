import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../../actions/auth';

const Register = ({ register }) => {
  const [formDetails, setFormDetails] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formDetails;

  const onChange = e => {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    register({ name, email, password });
  };

  return (
    <div className='container'>
      <form onSubmit={onSubmit} className='my-5'>
        <fieldset>
          <legend>
            <h1>Register</h1>
          </legend>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input
              type='name'
              className='form-control'
              id='name'
              name='name'
              aria-describedby='nameHelp'
              placeholder='Enter name'
              value={name}
              onChange={onChange}
            />
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
            <small id='emailHelp' className='form-text text-muted'>
              We'll never share your email with anyone else.
            </small>
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
            Register
          </button>
          <br />
          <p className='mt-3'>
            Already have an account?{' '}
            <Link to='/login'>
              {' '}
              <span className='text-info'>Login</span>
            </Link>
          </p>
        </fieldset>
      </form>
    </div>
  );
};

export default connect(null, { register })(Register);
