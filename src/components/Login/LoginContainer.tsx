import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container } from '@material-ui/core';
import loginImg from '../../assets/images/login_bg.png';
import logoImg from '../../assets/images/arfx_logo.png';

const useStyles = makeStyles((theme) => ({
  rootBox: {
    background: `url(${loginImg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    paddingTop: theme.spacing(20),
    height: '100%',
    width: '100%',
  },
  loginContainer: {
    background: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 10,
  },
  loginBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4),
    color: 'white',
  },
}));

interface LoginContainerProps {
  content: React.ReactNode;
}

const LoginContainer: React.FunctionComponent<LoginContainerProps> = (
  Props: LoginContainerProps
) => {
  const classes = useStyles();

  return (
    <Box className={classes.rootBox}>
      <Container className={classes.loginContainer} maxWidth="xs">
        <Box className={classes.loginBox}>
          <img src={logoImg} alt="ARfx Home Studio" />
          {Props.content}
        </Box>
      </Container>
    </Box>
  );
};

export default LoginContainer;
