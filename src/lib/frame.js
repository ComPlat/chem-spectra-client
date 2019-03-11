import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import Content from './components/content';
import Dropbox from './components/dropbox';
import RawInput from './components/raw_input';
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
      <Grid key="grid-dropbox" item xs={9}>
        <Dropbox />
      </Grid>
      <Grid key="grid-raw-input" item xs={3}>
        <RawInput />
      </Grid>
    </Grid>
    <Content />
    <Notice />
    <Loading />
  </div>
);

Frame.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Frame);
