import React, { useEffect } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import AddBookmark from './AddBookmark';
import BookmarkItem from './BookmarkItem';
import { connect } from 'react-redux';
import { getBookmarksForASubtopic } from '../../../actions/bookmark';

const Bookmarks = ({
  match: {
    params: { subId, subName, tpId, tpName, subTpId, subTpName },
  },
  bookmarks,
  getBookmarksForASubtopic,
}) => {
  useEffect(() => {
    getBookmarksForASubtopic(subId, tpId, subTpId);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <section className='container mt-4'>
        <div className='d-flex justify-content-between align-items-center'>
          <h1>
            {subName}/{tpName}/{subTpName}
          </h1>
          <AddBookmark />
        </div>
        <hr />
        <div className='row'>
          <div className='col-sm-12'>
            <ul className='list-group p-3'>
              <Scrollbars style={{ height: 600 }}>
                {bookmarks.map(bookmark => (
                  <BookmarkItem
                    key={bookmark._id}
                    bmId={bookmark._id}
                    subject={subName}
                    topic={tpName}
                    subId={subId}
                    tpId={tpId}
                    subTpId={subTpId}
                    subtopic={subTpName}
                    bookmark={bookmark.bookmarkUrl}
                    year={bookmark.year}
                  />
                ))}
              </Scrollbars>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = ({ bookmarkReducer }) => {
  return {
    bookmarks: bookmarkReducer.bookmarkForSubTp,
  };
};

export default connect(mapStateToProps, { getBookmarksForASubtopic })(
  Bookmarks
);
