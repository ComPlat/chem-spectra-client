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

import { VerifyRawExt } from '../utils/util_file';
import {
  updateRawScan, clearRawScan, submitRaw,
} from '../actions/action_raw';

const styles = () => ({
  btnRefresh: {
  },
  btnSubmit: {
  },
  rawInput: {
  },
  icon: {
  },
  tpLabel: {
    fontSize: 16,
  },
});

const btnRefresh = (
  classes, isValidRawExt, clearRawScanAct,
) => (
  <IconButton
    disabled={!isValidRawExt}
    variant="fab"
    color="primary"
    className={classNames(classes.btnRefresh)}
    onClick={clearRawScanAct}
  >
    <Refresh />
  </IconButton>
);

const btnSubmit = (
  classes, isValidRawExt, submitRawAct,
) => (
  <IconButton
    disabled={!isValidRawExt}
    variant="fab"
    color="primary"
    className={classNames(classes.btnRefresh)}
    onClick={submitRawAct}
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

const RawInput = ({
  classes, fileSt, rawSt, updateRawScanAct, clearRawScanAct, submitRawAct,
}) => {
  const { src } = fileSt;
  const { scan } = rawSt;
  const isValidRawExt = VerifyRawExt(src);
  const onChange = e => updateRawScanAct({ scan: e.target.value });

  return (
    <div>
      <Tooltip
        title={tpRawInput(classes)}
        placement="bottom"
        disableFocusListener
        disableTouchListener
      >
        <TextField
          className={classNames(classes.rawInput)}
          disabled={!isValidRawExt}
          id="outlined-name"
          label="Mass Spectrum Scan"
          type="number"
          value={scan || 0}
          margin="none"
          onChange={onChange}
        />
      </Tooltip>
      { btnRefresh(classes, isValidRawExt, clearRawScanAct) }
      { btnSubmit(classes, isValidRawExt, submitRawAct) }
    </div>
  );
};

const mapStateToProps = (state, props) => ( // eslint-disable-line
  {
    fileSt: state.file,
    rawSt: state.raw,
  }
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    updateRawScanAct: updateRawScan,
    clearRawScanAct: clearRawScan,
    submitRawAct: submitRaw,
  }, dispatch)
);

RawInput.propTypes = {
  fileSt: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]).isRequired,
  rawSt: PropTypes.object.isRequired,
  updateRawScanAct: PropTypes.func.isRequired,
  clearRawScanAct: PropTypes.func.isRequired,
  submitRawAct: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(RawInput));
