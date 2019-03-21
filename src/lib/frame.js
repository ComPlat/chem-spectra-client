import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import Content from './components/content';
import InputMol from './components/input_mol';
import InputFile from './components/input_file';
import InputForm from './components/input_form';
import Loading from './components/loading';
import Notice from './components/notice';

const styles = () => ({
  root: {
    flexGrow: 1,
  },
});

const Frame = ({ classes }) => (
  <div>
    <Grid container className={classes.root} spacing={24}>
      <Grid key="grid-drop-space" item xs={1} />
      <Grid key="grid-drop-mol" item xs={5}>
        <InputMol />
      </Grid>
      <Grid key="grid-drop-file" item xs={5}>
        <InputFile />
      </Grid>
      <Grid key="grid-form-input" item xs={1}>
        <InputForm />
      </Grid>
    </Grid>
    <br />
    <Content />
    <Notice />
    <Loading />
  </div>
);

Frame.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Frame);
