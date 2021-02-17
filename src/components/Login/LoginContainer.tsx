import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Container } from "@material-ui/core";
import loginVideo from '../../assets/small_loop.mp4';
import logoImg from "../../assets/images/arfx_logo.png";
import ReactPlayer from 'react-player';

const useStyles = makeStyles((theme) => ({
  
  rootBox: {
    background: 'black',
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  videoBackground: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  loginContainer: {
    background: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 10,
    marginTop: theme.spacing(20),
    position: 'relative',
  },
  loginBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(4),
    color: "white",
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
      <ReactPlayer
        className={classes.videoBackground}
        width="100%"
        height="auto"
        url={loginVideo}
        playing
        loop
      />
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
