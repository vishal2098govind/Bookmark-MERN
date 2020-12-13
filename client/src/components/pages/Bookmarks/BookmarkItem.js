import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'reactstrap';

const BookmarkItem = ({
  subject,
  subId,
  topic,
  tpId,
  subtopic,
  subTpId,
  bookmark,
  bmId,
  year,
}) => {
  return (
    <li className='list-group-item'>
      <div className='d-flex justify-content-between align-items center'>
        <Link to='/bookmarks'>
          <h5 className='text-dark'>{bookmark}</h5>
        </Link>
        <div className='years'>
          <Badge className='badge-info mx-2'>{year}</Badge>
        </div>
      </div>
    </li>
  );
};

export default BookmarkItem;
