import React from 'react';
import PropTypes from 'prop-types';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';

import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';

import { manualClear } from '../actions/action_notice';

const stylesBar = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const BarContent = (props) => {
  const {
    classes, className, message, onClose, variant, open, ...other
  } = props;
  const Icon = variantIcon[variant];

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
    >
      <SnackbarContent
        className={classNames(classes[variant], className)}
        aria-describedby="client-snackbar"
        message={(
          <span
            id="client-snackbar"
            className={classNames(classes.message, 'txt-notice')}
          >
            <Icon className={classNames(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        )}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={onClose}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
        {...other}
      />
    </Snackbar>
  );
};

BarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired,
  message: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const BarContentWrapper = withStyles(stylesBar)(BarContent);

// - - - - - - - - - - - - - - - - - - - - - - - - - - -
//
// Notice
//
// - - - - - - - - - - - - - - - - - - - - - - - - - - -
const stylesNotice = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
});

const BarContentMain = (
  variant, className, message, open, onClose,
) => (
  <BarContentWrapper
    variant={variant}
    className={className}
    message={message}
    open={open}
    onClose={onClose}
  />
);

const Notice = ({
  classes, noticeSt, manualClearAct,
}) => {
  const { status, message } = noticeSt;

  return (
    <div>
      {
        status && message
          ? BarContentMain(
            status,
            classes.margin,
            message,
            Boolean(status),
            manualClearAct,
          )
          : null
      }
    </div>
  );
};

const mapStateToProps = state => (
  {
    noticeSt: state.notice,
  }
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    manualClearAct: manualClear,
  }, dispatch)
);

Notice.propTypes = {
  classes: PropTypes.object.isRequired,
  noticeSt: PropTypes.object.isRequired,
  manualClearAct: PropTypes.func.isRequired,
};

export default compose(
  withStyles(stylesNotice),
  connect(mapStateToProps, mapDispatchToProps),
)(Notice);
