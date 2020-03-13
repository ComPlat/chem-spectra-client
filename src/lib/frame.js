import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import Content from './components/content';
import InputMol from './components/input_mol';
import InputFile from './components/input_file';
import InputForm from './components/input_form';
import InputPredJson from './components/input_pred_json';
import Loading from './components/loading';
import Notice from './components/notice';

const styles = () => ({
  root: {
    flexGrow: 1,
  },
});

const Frame = ({ classes, editorOnly }) => (
  <div>
    <Grid container className={classes.root} spacing={24}>
      <Grid key="grid-drop-space" item xs={1} />
      <Grid key="grid-drop-mol" item xs={4}>
        {
          editorOnly ? null : <InputMol />
        }
      </Grid>
      <Grid key="grid-drop-file" item xs={4}>
        <InputFile editorOnly={editorOnly} />
      </Grid>
      <Grid key="grid-drop-pred-json" item xs={2}>
        {
          editorOnly ? null : <InputPredJson />
        }
      </Grid>
      <Grid key="grid-form-input" item xs={1}>
        <InputForm />
      </Grid>
    </Grid>
    <Content editorOnly={editorOnly} />
    <Notice />
    <Loading />
  </div>
);

Frame.propTypes = {
  classes: PropTypes.object.isRequired,
  editorOnly: PropTypes.bool.isRequired,
};

export default withStyles(styles)(Frame);
