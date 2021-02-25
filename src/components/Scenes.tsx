import { Box, Button, Container, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { ErrorView, SceneGrid, ScrollableBox } from ".";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";
import Routes from "../constants/Routes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/RootReducer";
import { getScenes } from "../redux/slice/ScenesSlice";
import ScenesSkeleton from "./Skeletons/ScenesSkeleton";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(3),
  },
  sceneBox: {
    marginTop: theme.spacing(2),
  },
}));

const Scenes: React.FunctionComponent = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { scenes } = useSelector((state: RootState) => state);

  useEffect(() => {
    dispatch(getScenes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (scenes.isLoading) {
    return <ScenesSkeleton />;
  }

  if (scenes.errors.length > 0) {
    return (
      <ErrorView
        error={scenes.errors[0]}
        onRetry={() => dispatch(getScenes())}
      />
    );
  }

  return (
    <ScrollableBox onScrollBottom={() => dispatch(getScenes())}>
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
          <SceneGrid
            items={scenes.result.data}
            isLoadingMore={scenes.isLoadingMore}
          />
        </Box>
      </Container>
    </ScrollableBox>
  );
};

export default Scenes;
