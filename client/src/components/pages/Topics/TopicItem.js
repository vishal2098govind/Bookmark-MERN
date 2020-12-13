import React, { useState } from 'react';
import { Collapse } from 'reactstrap';
import { Link } from 'react-router-dom';
import AddSubTopic from './AddSubTopic';
import { Scrollbars } from 'react-custom-scrollbars';

const TopicItem = ({ tpId, topic, subtopics, subject, subId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className={`card p-1  mb-3`} style={{ backgroundColor: '#230903' }}>
      <div
        className={`card-header d-flex justify-content-around align-items-cente text-center  text-white p-0 py-3`}
      >
        <h4>{topic}</h4>
        <AddSubTopic />
      </div>
      <div className='card-body' style={{ backgroundColor: '#E0DDCF' }}>
        <ul className='list-group'>
          <li
            className='list-group-item d-flex p-2 justify-content-between align-items-center'
            style={{ cursor: 'pointer' }}
            onClick={toggle}
          >
            <Link to='/subtopics'>
              <h3 className='text-info'>Subtopics</h3>
            </Link>
            <span
              className='text-white badge p-2'
              style={{ backgroundColor: '#230903' }}
            >
              14
            </span>
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
                {subtopics.map(subTopic => (
                  <li className='list-group-item'>
                    <Link
                      to={`/subtopics/${subject}/${subId}/${topic}/${tpId}`}
                    >
                      <h5 className='text-dark'>{subTopic.subTopic}</h5>
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

export default TopicItem;
