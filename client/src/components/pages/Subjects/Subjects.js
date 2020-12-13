import React from 'react';
import AddSubject from './AddSubject';
import SubjectItem from './SubjectItem';
import { connect } from 'react-redux';
const Subjects = ({ subjects }) => {
  return (
    <div>
      <section className='container mt-4'>
        <div className='d-flex justify-content-between align-items-center'>
          <h1>All Subjects</h1>
          <AddSubject />
        </div>
        <hr />
        <div className='row'>
          {subjects.length > 0 &&
            subjects.map(subject => (
              <div
                className='col-lg-6 col-sm-12 col-md-6 my-3'
                key={subject.id}
              >
                <SubjectItem
                  id={subject.id}
                  subject={subject.subject}
                  topics={subject.topics}
                />
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = ({ subjectReducer }) => {
  const subjects = subjectReducer.map(subject => {
    return {
      subject: subject.subject,
      id: subject._id,
      topics: subject.topics,
    };
  });

  return {
    subjects,
  };
};

export default connect(mapStateToProps)(Subjects);
