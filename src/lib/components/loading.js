import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  card: {
    overflow: 'hide',
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

const Loading = ({ loadingSt, classes }) => (
  <Dialog open={loadingSt}>
    <div className={classes.card}>
      <CircularProgress className={classes.progress} />
    </div>
  </Dialog>
);

const mapStateToProps = (state, props) => ( // eslint-disable-line
  {
    loadingSt: state.loading,
  }
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({
  }, dispatch)
);

Loading.propTypes = {
  loadingSt: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Loading));
