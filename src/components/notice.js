import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NotificationSystem from 'react-notification-system';

import { initNotice } from '../actions/notice';

const ref = React.createRef();

const Notice = ({
  initNoticeAct,
}) => {
  initNoticeAct({ ref });

  return (
    <NotificationSystem ref={ref} />
  );
};

const mapStateToProps = (state, props) => ( // eslint-disable-line
  {}
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    initNoticeAct: initNotice,
  }, dispatch)
);

Notice.propTypes = {
  initNoticeAct: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notice);
