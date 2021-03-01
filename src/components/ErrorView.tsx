/* eslint-disable react/require-default-props */
import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: 'red',
    fontSize: 50,
  },
  message: {
    margin: theme.spacing(2, 0),
  },
}));

type RetryCallback = () => void;

interface ErrorViewProps {
  /**
   * Error message to display.
   */
  error: string;
  /**
   * Callback on retry button click.
   */
  onRetry?: RetryCallback;
}

const ErrorView: React.FunctionComponent<ErrorViewProps> = (
  props: ErrorViewProps
) => {
  const classes = useStyles();
  const { error, onRetry } = props;

  return (
    <Box className={classes.root}>
      <ErrorOutlineIcon className={classes.icon} />
      <Typography className={classes.message}>{error}</Typography>
      {onRetry && (
        <Button color="primary" variant="outlined" onClick={onRetry}>
          Retry
        </Button>
      )}
    </Box>
  );
};

export default ErrorView;
