import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { SceneGrid, SceneItem, ScrollableBox } from ".";

const useStyles = makeStyles((theme) => ({
  scenesGrid: {
    marginTop: theme.spacing(1),
  },
}));

const items: SceneItem[] = [
  {
    key: "b1",
    title: "Space Landing",
    description: "Get the sense of landing from space!",
    image: "https://source.unsplash.com/oxgK2f_rxDc",
  },
  {
    key: "b2",
    title: "City Skyline",
    description: "Electrify your content with city skyline",
    image: "https://source.unsplash.com/ySNtJhDX-cw",
  },
  {
    key: "b3",
    title: "Experience Snow",
    description: "Image yourself being in a snow heaven",
    image: "https://source.unsplash.com/kVKz9qnJC-k",
  },
];

const Users: React.FunctionComponent = () => {
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
      </Container>
    </ScrollableBox>
  );
};

export default Users;
