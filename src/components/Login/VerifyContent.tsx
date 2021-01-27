import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Routes from '../../constants/Routes';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(8),
  },
  submitBtn: {
    marginTop: theme.spacing(2),
  },
}));

interface VerifyContentProps {
  email: string;
}

const VerifyContent: React.FunctionComponent<VerifyContentProps> = (
  Props: VerifyContentProps
) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <form className={classes.form} noValidate>
      <Box mb={2}>
        <Typography align="center">An email sent to {Props.email}</Typography>
      </Box>
      <Button
        className={classes.submitBtn}
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        onClick={() => history.push(Routes.SIGN_IN)}
      >
        Login
      </Button>
    </form>
  );
};

export default VerifyContent;
