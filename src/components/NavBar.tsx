import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Box, Button, CssBaseline, Toolbar } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import logoImg from '../assets/images/arfx_logo.png';
import Routes from '../constants/Routes';

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: 'transparent',
  },
  logo: {
    height: 60,
  },
  buttons: {
    marginLeft: theme.spacing(4),
  },
  menuBtn: {
    margin: theme.spacing(0, 1, 0, 1),
    background: 'transparent',
    boxShadow: 'none',
  },
  menuSelectedBtn: {
    margin: theme.spacing(0, 1, 0, 1),
    background: theme.palette.primary.main,
  },
}));

interface MenuItem {
  key: string;
  label: string;
  link: string;
  isSelected: boolean;
}

const NavBar: React.FunctionComponent = () => {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();

  const currentRoute = location.pathname;

  const menuItems: MenuItem[] = [
    {
      key: 'scenes',
      label: 'Scenes',
      link: Routes.SCENES,
      isSelected: currentRoute.startsWith(Routes.SCENES),
    },
    {
      key: 'users',
      label: 'Users',
      link: Routes.USERS,
      isSelected: currentRoute.startsWith(Routes.USERS),
    },
    {
      key: 'settings',
      label: 'Settings',
      link: Routes.SETTINGS,
      isSelected: currentRoute.startsWith(Routes.SETTINGS),
    },
  ];

  return (
    <>
      <CssBaseline />
      <AppBar className={classes.appBar} position="sticky">
        <Toolbar>
          <img className={classes.logo} src={logoImg} alt="ARfx Home Studio" />
          <Box className={classes.buttons}>
            {menuItems.map((item) => {
              return (
                <Button
                  className={
                    item.isSelected ? classes.menuSelectedBtn : classes.menuBtn
                  }
                  key={item.key}
                  color="primary"
                  variant="contained"
                  size="large"
                  onClick={() => history.push(item.link)}
                >
                  {item.label}
                </Button>
              );
            })}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
