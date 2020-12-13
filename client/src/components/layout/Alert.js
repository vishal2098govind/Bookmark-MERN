import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';

const Alerts = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <div className='container'>
      <Alert key={alert.id} className={`alert alert-${alert.type}`}>
        {alert.msg}
      </Alert>
    </div>
  ));
Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = state => {
  return {
    alerts: state.alertReducer,
  };
};

export default connect(mapStateToProps)(Alerts);
