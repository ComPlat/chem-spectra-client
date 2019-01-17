import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dropzone from 'react-dropzone';

import { addFile } from '../actions/action_file';

const baseStyle = {
  border: '2px dashed blue',
  borderRadius: 5,
  height: 50,
  lineHeight: '45px',
  textAlign: 'center',
  verticalAlign: 'middle',
  width: '100%',
};

const msgDefault = 'Drop File, or Click to add File.';

const Dropbox = ({
  srcFileSt, addFileAct,
}) => {
  const filename = srcFileSt && srcFileSt.name;
  const onDrop = files => addFileAct({ file: files[0] });

  return (
    <Dropzone
      className="dropbox"
      onDrop={onDrop}
    >
      {
        ({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            style={baseStyle}
          >
            <input {...getInputProps()} />
            { filename || msgDefault }
          </div>
        )
      }
    </Dropzone>
  );
};

const mapStateToProps = (state, props) => ( // eslint-disable-line
  {
    srcFileSt: state.file.src,
  }
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addFileAct: addFile,
  }, dispatch)
);

Dropbox.propTypes = {
  addFileAct: PropTypes.func.isRequired,
  srcFileSt: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dropbox);
