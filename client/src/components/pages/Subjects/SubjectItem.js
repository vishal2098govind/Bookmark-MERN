import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse } from 'reactstrap';
import AddTopic from '../Topics/AddTopic';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import PrivateRoute from '../../routing/PrivateRoute';
import Topics from '../Topics/Topics';

const SubjectItem = ({ id, subject, topics }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={`card p-1 mb-3`} style={{ backgroundColor: '#191308' }}>
      <div className='card-header d-flex justify-content-around align-items-center text-center text-white p-0 py-3'>
        <h4>{subject}</h4>
        <AddTopic />
      </div>
      <div className='card-body' style={{ backgroundColor: '#F9DBBD' }}>
        <ul className='list-group'>
          <li
            className='list-group-item p-2 d-flex justify-content-between align-items-center'
            style={{ cursor: 'pointer' }}
            onClick={toggle}
          >
            <Link to='/topics'>
              <h3 className='text-info'>Topics</h3>
            </Link>
            <span className='badge badge-info p-2'>14</span>
            <span
              className='badge text-white  p-2'
              style={{ backgroundColor: '#230903' }}
            >
              <i className={`fas fa-arrow-${isOpen ? 'up' : 'down'}`}></i>
            </span>
          </li>
          <Collapse isOpen={isOpen}>
            <ul className='list-group p-3'>
              <Scrollbars style={{ height: 150 }}>
                {topics.map(topic => (
                  <li key={topic._id} className='list-group-item'>
                    <Link to={`/topics/${subject}/${id}`}>
                      <h5 className='text-dark'>{topic.topic}</h5>
                    </Link>
                  </li>
                ))}
              </Scrollbars>
            </ul>
          </Collapse>
        </ul>
      </div>
    </div>
  );
};

export default connect()(SubjectItem);
