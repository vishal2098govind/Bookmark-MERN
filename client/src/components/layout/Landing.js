import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <section className='container-fluid my-5 center'>
      <div className='jumbotron'>
        <h1 className='display-2 text-center'>Welcome To Bookmarks!</h1>
        <h3 className='text-center'>Bookmark important PYQs</h3>
        <hr className='my-4' />
        <div className='text-center'>
          <Link to='/register'>
            <button className='btn btn-dark' style={{ fontSize: '1.5rem' }}>
              Sign up
            </button>
          </Link>
          {'  '}
          <Link to='/login'>
            <button className='btn btn-light' style={{ fontSize: '1.5rem' }}>
              Login
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Landing;
