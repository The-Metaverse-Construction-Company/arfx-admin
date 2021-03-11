import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, LinearProgress, Typography } from '@material-ui/core';
import { ErrorView } from '..';

const useStyles = makeStyles((theme) => ({
  authenticationBox: {
    width: '100%',
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    textAlign: 'center',
  },
  authenticatingSpinner: {
    marginBottom: theme.spacing(1),
  },
}));

type RetryCallback = () => void;

interface SignInContentProps {
  /**
   * Error message to display.
   */
  error: string;
  /**
   * Callback on retry button click.
   */
  onRetry: RetryCallback;
}

const SignInContent: React.FunctionComponent<SignInContentProps> = (
  props: SignInContentProps
) => {
  const classes = useStyles();
  const { error, onRetry } = props;

  if (error) {
    return (
      <ErrorView
        error={error}
        onRetry={onRetry}
      />
    );
  }
  return (
    <Box className={classes.authenticationBox}>
      <LinearProgress className={classes.authenticatingSpinner} />
      <Typography>Authenticating</Typography>
    </Box>
  );
};

export default SignInContent;
