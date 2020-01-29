import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

import { addFileInit } from '../actions/action_file';

const styles = () => ({
  root: {
    flexGrow: 1,
  },
  baseDD: {
    borderRadius: 5,
    height: 30,
    lineHeight: '30px',
    margin: '0 0 10px 0',
    textAlign: 'center',
    verticalAlign: 'middle',
    width: '90%',
  },
  enableDD: {
    border: '2px dashed #000',
    color: '#000',
  },
  disableDD: {
    border: '2px dashed #aaa',
    color: '#aaa',
  },
  tpCard: {
  },
  tpLabel: {
    fontSize: 16,
  },
});

const tpHint = classes => (
  <span className={classNames(classes.tpCard)}>
    <p className={classNames(classes.tpLabel, 'txt-sv-tp')}>
      - Accept *.dx, *.jdx, *.JCAMP, *.RAW, *.mzML, *.cdf
    </p>
    <p className={classNames(classes.tpLabel, 'txt-sv-tp')}>
      - Max 30Mb
    </p>
  </span>
);

const msgDefault = 'Add Spectrum';

const content = (classes, desc) => (
  <Tooltip
    title={tpHint(classes)}
    placement="bottom"
  >
    <span>{desc}</span>
  </Tooltip>
);

const InputFile = ({
  classes, srcMolSt, srcFileSt, addFileInitAct,
}) => {
  const fileName = srcFileSt && srcFileSt.name;
  const onDrop = files => addFileInitAct({ file: files[0] });
  const addOnCls = srcMolSt ? classes.enableDD : classes.disableDD;
  const desc = fileName || msgDefault;

  return (
    <Dropzone
      className="dropbox"
      onDrop={onDrop}
      disabled={!srcMolSt}
    >
      {
        ({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className={classNames(classes.baseDD, addOnCls)}
          >
            <input {...getInputProps()} />
            { content(classes, desc) }
          </div>
        )
      }
    </Dropzone>
  );
};

const mapStateToProps = (state, props) => ( // eslint-disable-line
  {
    srcMolSt: state.mol.src,
    srcFileSt: state.file.src,
  }
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addFileInitAct: addFileInit,
  }, dispatch)
);

InputFile.propTypes = {
  classes: PropTypes.object.isRequired,
  srcMolSt: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]).isRequired,
  srcFileSt: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]).isRequired,
  addFileInitAct: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(InputFile));
