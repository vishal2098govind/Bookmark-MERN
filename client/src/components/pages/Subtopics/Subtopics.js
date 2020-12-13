import React, { useEffect } from 'react';
import AddSubtopic from './AddSubtopic';
import SubtopicItem from './SubtopicItem';
import { connect } from 'react-redux';
import { getSubtopicsForATopic } from '../../../actions/subtopic';

const Subtopics = ({
  match: {
    params: { subId, subName, tpId, tpName },
  },
  subtopics,
  getSubtopicsForATopic,
}) => {
  useEffect(() => {
    getSubtopicsForATopic(subId, tpId);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <section className='container mt-4'>
        <div className='d-flex justify-content-between align-items-center'>
          <h1>
            {subName}/{tpName}
          </h1>
          <AddSubtopic />
        </div>
        <hr />
        <div className='row'>
          {subtopics.map(subtopic => (
            <div className='col-lg-6 col-sm-12 col-md-6 my-3'>
              <SubtopicItem
                key={subtopic._id}
                subtopic={subtopic.subTopic}
                bookmarks={subtopic.bookmarks}
                subject={subName}
                topic={tpName}
                subId={subId}
                tpId={tpId}
                subTpId={subtopic._id}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = ({ subtopicReducer }) => {
  return {
    subtopics: subtopicReducer.subtopicsForTp,
  };
};

export default connect(mapStateToProps, { getSubtopicsForATopic })(Subtopics);
