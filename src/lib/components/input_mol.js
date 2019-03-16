import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';

import { addMolInit } from '../actions/action_mol';

const styles = () => ({
  baseDD: {
    border: '2px dashed blue',
    borderRadius: 5,
    height: 40,
    lineHeight: '40px',
    margin: '0 0 10px 0',
    textAlign: 'center',
    verticalAlign: 'middle',
    width: '100%',
  },
});

const msgDefault = 'Add Molfile';

const showByMolfile = (molSt) => {
  const { src, mass } = molSt;
  if (src) {
    const txtMass = parseFloat(mass).toFixed(2);
    return `${src.name} (${txtMass}g/mol)`;
  }

  return msgDefault;
};

const InputMol = ({
  classes, molSt, addMolInitAct,
}) => {
  const onDrop = mols => addMolInitAct({ mol: mols[0] });

  const desc = showByMolfile(molSt, classes);

  return (
    <Dropzone
      className="dropbox"
      onDrop={onDrop}
    >
      {
        ({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className={classNames(classes.baseDD)}
          >
            <input {...getInputProps()} />
            { desc }
          </div>
        )
      }
    </Dropzone>
  );
};

const mapStateToProps = (state, props) => ( // eslint-disable-line
  {
    molSt: state.mol,
  }
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addMolInitAct: addMolInit,
  }, dispatch)
);

InputMol.propTypes = {
  classes: PropTypes.object.isRequired,
  molSt: PropTypes.object.isRequired,
  addMolInitAct: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(InputMol));
