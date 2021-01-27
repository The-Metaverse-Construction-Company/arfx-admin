import { Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { SceneGrid, SceneItem, ScrollableBox } from '.';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(3),
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
  {
    key: 'b4',
    title: 'Scene Title',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    image: 'https://source.unsplash.com/featured/?nature',
  },
  {
    key: 'b5',
    title: 'Scene Title',
    description: 'Image yourself being in a heaven',
    image: 'https://source.unsplash.com/featured/?dark',
  },
  {
    key: 'b6',
    title: 'Scene Title',
    description: 'Image yourself being in a heaven',
    image: 'https://source.unsplash.com/featured/?abstract',
  },
  {
    key: 'b7',
    title: 'Scene Title',
    description: 'Image yourself being in a heaven',
    image: 'https://source.unsplash.com/featured/?helicopter',
  },
  {
    key: 'b8',
    title: 'Scene Title',
    description: 'Image yourself being in a heaven',
    image: 'https://source.unsplash.com/featured/?hill',
  },
  {
    key: 'b9',
    title: 'Scene Title',
    description: 'Image yourself being in a heaven',
    image: 'https://source.unsplash.com/featured/?ball',
  },
];

const Scenes: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <ScrollableBox
      onScrollBottom={() => {
        console.log('hello');
      }}
    >
      <Container className={classes.container} disableGutters>
        <Typography variant="h4">My Scenes</Typography>

        <SceneGrid items={items} />
      </Container>
    </ScrollableBox>
  );
};

export default Scenes;
