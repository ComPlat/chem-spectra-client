import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Refresh from '@material-ui/icons/Refresh';
import Send from '@material-ui/icons/Send';

import {
  VerifyRawExt, VerifyJcampExt,
} from '../utils/util_file';
import {
  updateFormScan, clearFormScan, submitForm,
} from '../actions/action_form';

const styles = () => ({
  root: {
    float: 'right',
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

const btnRefresh = (
  classes, isValidRawExt, clearFormScanAct,
) => (
  <IconButton
    disabled={!isValidRawExt}
    variant="fab"
    color="primary"
    className={classNames(classes.btnRefresh)}
    onClick={clearFormScanAct}
  >
    <Refresh />
  </IconButton>
);

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

const tpRawInput = classes => (
  <span>
    <p className={classNames(classes.tpLabel, 'txt-sv-tp')}>
      - Input to select a specific scan
    </p>
    <p className={classNames(classes.tpLabel, 'txt-sv-tp')}>
      - Auto-picked when 0
    </p>
  </span>
);

const InputSubmit = ({
  classes, fileSt, formSt,
  updateFormScanAct, clearFormScanAct, submitFormAct,
}) => {
  const { src } = fileSt;
  const { scan } = formSt;
  const isValidRawExt = VerifyRawExt(src);
  const isValidJcampExt = VerifyJcampExt(src);
  const isValidExt = isValidRawExt || isValidJcampExt;
  const onChange = e => updateFormScanAct({ scan: e.target.value });

  return (
    <div className={classNames(classes.root)}>
      <Tooltip
        title={tpRawInput(classes)}
        placement="bottom"
        disableFocusListener
        disableTouchListener
      >
        <TextField
          className={classNames(classes.formInput)}
          disabled={!isValidRawExt}
          id="outlined-name"
          label="Mass Spectrum Scan"
          type="number"
          value={scan || 0}
          margin="none"
          onChange={onChange}
        />
      </Tooltip>
      { btnRefresh(classes, isValidRawExt, clearFormScanAct) }
      { btnSubmit(classes, isValidExt, submitFormAct) }
    </div>
  );
};

const mapStateToProps = (state, props) => ( // eslint-disable-line
  {
    fileSt: state.file,
    formSt: state.form,
  }
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    updateFormScanAct: updateFormScan,
    clearFormScanAct: clearFormScan,
    submitFormAct: submitForm,
  }, dispatch)
);

InputSubmit.propTypes = {
  fileSt: PropTypes.object.isRequired,
  formSt: PropTypes.object.isRequired,
  updateFormScanAct: PropTypes.func.isRequired,
  clearFormScanAct: PropTypes.func.isRequired,
  submitFormAct: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(InputSubmit));
