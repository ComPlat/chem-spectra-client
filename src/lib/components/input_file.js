import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';

import { addFileInit } from '../actions/action_file';

const styles = () => ({
  baseDD: {
    borderRadius: 5,
    height: 40,
    lineHeight: '40px',
    margin: '0 0 10px 0',
    textAlign: 'center',
    verticalAlign: 'middle',
    width: '100%',
  },
  enableDD: {
    border: '2px dashed blue',
    color: '#000',
  },
  disableDD: {
    border: '2px dashed #aaa',
    color: '#aaa',
  },
});

const msgDefault = 'Add Spectrum';

const InputFile = ({
  classes, srcMolSt, srcFileSt, addFileInitAct,
}) => {
  const fileName = srcFileSt && srcFileSt.name;
  const onDrop = files => addFileInitAct({ file: files[0] });
  const addOnCls = srcMolSt ? classes.enableDD : classes.disableDD;

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
            { fileName || msgDefault }
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
