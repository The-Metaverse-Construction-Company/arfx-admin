import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { SceneGrid, SceneItem, ScrollableBox } from '.';
import homeSettingImg from '../assets/images/home_setting_bg.png';
import Routes from '../constants/Routes';

const useStyles = makeStyles((theme) => ({
  scenesGrid: {
    marginTop: theme.spacing(1),
  },
  settingsBox: {
    background: `url(${homeSettingImg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    alignItems: 'center',
    height: 150,
    width: '100%',
    paddingLeft: theme.spacing(4),
    marginBottom: theme.spacing(10),
  },
}));

const items: SceneItem[] = [
  {
    key: 'b1',
    title: 'Space Landing',
    description: 'Get the sense of landing from space!',
    image: 'https://source.unsplash.com/oxgK2f_rxDc',
  },
  {
    key: 'b2',
    title: 'City Skyline',
    description: 'Electrify your content with city skyline',
    image: 'https://source.unsplash.com/ySNtJhDX-cw',
  },
  {
    key: 'b3',
    title: 'Experience Snow',
    description: 'Image yourself being in a snow heaven',
    image: 'https://source.unsplash.com/kVKz9qnJC-k',
  },
];

const Users: React.FunctionComponent = () => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <ScrollableBox>
      <Container disableGutters>
        <Grid className={classes.scenesGrid} container>
          <Grid item xs>
            <Typography variant="h5">My Scenes</Typography>
          </Grid>
        </Grid>

        <SceneGrid items={items} hideBottomMargin isHorizontal />

        <Box className={classes.settingsBox}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push(Routes.SETTINGS)}
          >
            Configure System and Settings...
          </Button>
        </Box>
      </Container>
    </ScrollableBox>
  );
};

export default Users;
