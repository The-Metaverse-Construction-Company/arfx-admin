import { Box, Button, Container, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { SceneGrid, SceneItem, ScrollableBox } from ".";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";
import Routes from "../constants/Routes";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(3),
  },
  sceneBox: {
    marginTop: theme.spacing(2),
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
  {
    key: "b4",
    title: "Scene Title",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    image: "https://source.unsplash.com/featured/?nature",
  },
  {
    key: "b5",
    title: "Scene Title",
    description: "Image yourself being in a heaven",
    image: "https://source.unsplash.com/featured/?dark",
  },
  {
    key: "b6",
    title: "Scene Title",
    description: "Image yourself being in a heaven",
    image: "https://source.unsplash.com/featured/?abstract",
  },
  {
    key: "b7",
    title: "Scene Title",
    description: "Image yourself being in a heaven",
    image: "https://source.unsplash.com/featured/?helicopter",
  },
  {
    key: "b8",
    title: "Scene Title",
    description: "Image yourself being in a heaven",
    image: "https://source.unsplash.com/featured/?hill",
  },
  {
    key: "b9",
    title: "Scene Title",
    description: "Image yourself being in a heaven",
    image: "https://source.unsplash.com/featured/?ball",
  },
];

function getScenes(count: number, currentCount: number) {
  let newItems: SceneItem[] = [];
  for (let loop = 0; loop < count; loop++) {
    newItems.push({
      key: `s${currentCount + 1 + loop}`,
      title: "Scene Title",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      image: "https://source.unsplash.com/featured/?ball",
    });
  }

  return newItems;
}

const Scenes: React.FunctionComponent = () => {
  const classes = useStyles();
  const history = useHistory();
  const [sceneItems, setSceneItems] = useState<SceneItem[]>([]);

  useEffect(() => {
    let newScenes = getScenes(41, items.length);
    setSceneItems([...items, ...newScenes]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollableBox
      onScrollBottom={() => {
        let newScenes = getScenes(20, sceneItems.length);
        setSceneItems([...sceneItems, ...newScenes]);
      }}
    >
      <Container className={classes.container} disableGutters>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<AddIcon />}
          onClick={() => {
            history.push(`${Routes.SCENES}/new`);
          }}
        >
          New Scene
        </Button>

        <br />

        <Box className={classes.sceneBox}>
          <SceneGrid items={sceneItems} />
        </Box>
      </Container>
    </ScrollableBox>
  );
};

export default Scenes;
