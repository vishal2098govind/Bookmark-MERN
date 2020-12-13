import React, { useEffect } from 'react';
import { getTopicsForASubject } from '../../../actions/topic';
import AddTopic from './AddTopic';
import TopicItem from './TopicItem';
import { connect } from 'react-redux';
const Topics = ({
  match: {
    params: { subId, subName },
  },
  topics,
  getTopicsForASubject,
}) => {
  useEffect(() => {
    getTopicsForASubject(subId);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <section className='container mt-4'>
        <div className='d-flex justify-content-between align-items-center'>
          <h1>{subName}</h1>
          <AddTopic />
        </div>
        <hr />
        <div className='row'>
          {topics.map(topic => (
            <div className='col-lg-6 col-sm-12 col-md-6 my-3'>
              <TopicItem
                key={topic._id}
                tpId={topic._id}
                topic={topic.topic}
                subtopics={topic.subTopics}
                subject={subName}
                subId={subId}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = ({ topicReducer }) => {
  return {
    topics: topicReducer.topicsForSub,
  };
};

export default connect(mapStateToProps, { getTopicsForASubject })(Topics);
