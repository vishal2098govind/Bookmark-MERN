import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Collapse } from 'reactstrap';
import AddBookmark from '../Bookmarks/AddBookmark';
import { Scrollbars } from 'react-custom-scrollbars';

const SubtopicItem = ({
  subtopic,
  bookmarks,
  subject,
  topic,
  subId,
  tpId,
  subTpId,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={`card p-1 mb-3`} style={{ backgroundColor: '#191308' }}>
      <div
        className={`card-header d-flex justify-content-around align-items-center text-center text-white p-0 py-3`}
      >
        <h4>{subtopic}</h4>
        <AddBookmark />
      </div>
      <div className='card-body' style={{ backgroundColor: '#747578' }}>
        <ul className='list-group'>
          <li
            className='list-group-item p-2 d-flex justify-content-between align-items-center'
            onClick={toggle}
            style={{ cursor: 'pointer' }}
          >
            <Link to='/bookmarks'>
              <h3 className='text-dark'>Bookmarks</h3>
            </Link>
            <span className='badge badge-dark p-2'>14</span>
            <span className='badge badge-dark p-2'>
              <i className={`fas fa-arrow-${isOpen ? 'up' : 'down'}`}></i>
            </span>
          </li>
          <Collapse isOpen={isOpen}>
            <ul className='list-group p-3'>
              <Scrollbars style={{ height: 150 }}>
                {bookmarks.map(bookmark => (
                  <li className='list-group-item'>
                    <div className='d-flex justify-content-between align-items-center'>
                      <Link
                        to={`/bookmarks/${subject}/${subId}/${topic}/${tpId}/${subtopic}/${subTpId}`}
                      >
                        {/* <h5 className='text-dark'>{bookmark.bookmarkUrl}</h5> */}
                        <h5 className='text-dark'>Question</h5>
                      </Link>
                      <Badge className='badge-info mx-2'>{bookmark.year}</Badge>
                    </div>
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

export default SubtopicItem;
