import { connect } from 'react-redux';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';
import { logout } from '../../actions/auth';
import { Fragment } from 'react';
import AddModal from '../pages/Subjects/AddSubject';
const NavBar = ({ isAuthenticated, logout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const onLogout = () => {
    console.log('logout');

    logout();
  };

  return (
    <Fragment>
      <Navbar className='sticky-top bg-light' light expand='md'>
        <Link id='RouterNavLink' to='/' style={{ textDecoration: 'none' }}>
          <h3 className='text-dark'>BOOKMARKS</h3>
        </Link>

        {isAuthenticated ? (
          <NavItem className='ml-auto' style={{ listStyle: 'None' }}>
            <button className='btn btn-dark' onClick={onLogout}>
              <i className='fas fa-sign-out-alt'></i>{' '}
              <span className='hide-sm'>Logout</span>
            </button>
          </NavItem>
        ) : null}
      </Navbar>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
  };
};

export default connect(mapStateToProps, { logout })(NavBar);
