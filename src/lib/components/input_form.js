import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Send from '@material-ui/icons/Send';

import {
  VerifyRawExt, VerifyJcampExt,
} from '../utils/util_file';
import {
  submitForm,
} from '../actions/action_form';

const styles = () => ({
  root: {
    float: 'left',
  },
  btnRefresh: {
  },
  btnSubmit: {
  },
  formInput: {
  },
  icon: {
  },
  tpLabel: {
    fontSize: 16,
  },
});

const btnSubmit = (
  classes, isValidExt, submitFormAct,
) => (
  <IconButton
    disabled={!isValidExt}
    variant="fab"
    color="primary"
    className={classNames(classes.btnRefresh)}
    onClick={submitFormAct}
  >
    <Send className={classNames(classes.icon)} />
  </IconButton>
);

const InputForm = ({
  classes, fileSt,
  submitFormAct,
}) => {
  const { src } = fileSt;
  const isValidRawExt = VerifyRawExt(src);
  const isValidJcampExt = VerifyJcampExt(src);
  const isValidExt = isValidRawExt || isValidJcampExt;

  return (
    <div className={classNames(classes.root)}>
      { btnSubmit(classes, isValidExt, submitFormAct) }
    </div>
  );
};

const mapStateToProps = (state, props) => ( // eslint-disable-line
  {
    fileSt: state.file,
  }
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    submitFormAct: submitForm,
  }, dispatch)
);

InputForm.propTypes = {
  fileSt: PropTypes.object.isRequired,
  submitFormAct: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(InputForm));
