import {
  Box,
  CircularProgress,
  GridList,
  GridListTile,
  GridListTileBar,
  isWidthUp,
  LinearProgress,
  makeStyles,
  Typography,
  withWidth,
  WithWidthProps,
} from "@material-ui/core";
import React from "react";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { useHistory } from "react-router-dom";
import { SceneData, SceneStatus } from "../../models/Scenes";

const useStyles = makeStyles((theme) => ({
  gridBox: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  gridBoxHorizontal: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  gridMarginBottom: {
    marginBottom: theme.spacing(10),
  },
  gridListHorizontal: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  gridTile: {
    cursor: "pointer",
    "& .MuiGridListTile-tile": {
      border: "2px solid transparent",
    },
    "& .MuiGridListTile-tile:hover": {
      border: "2px solid white",
    },
  },
  gridTileBar: {
    backgroundColor: "transparent",
    textShadow: "1px 1px 5px black",
    height: 80,
    "& .MuiGridListTileBar-title": {
      fontSize: 24,
      lineHeight: "inherit",
    },
    "& .MuiGridListTileBar-subtitle": {
      fontSize: 14,
    },
  },
  spinner: {
    marginTop: theme.spacing(2),
    textAlign: "center",
  },
  noScenes: {
    textAlign: "center",
    marginTop: 100,
    marginBottom: 100,
  },
  spinnerBox: {
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    background: 'repeating-linear-gradient(45deg, black, transparent 100px)',
  },
  linearProgress: {
    width: '100%',
    height: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  errorIcon: {
    color: 'red',
    fontSize: 32,
    margin: theme.spacing(1),
  },
  pendingIcon: {
    color: 'orange',
    fontSize: 32,
    margin: theme.spacing(1),
  },
}));

interface SceneGridProps {
  /**
   * Items to be rendered in grid.
   */
  items: SceneData[];
  /**
   * Set true to show loading spinner at bottom.
   */
  isLoadingMore?: boolean;
  /**
   * Set true to hide default margin in bottom.
   */
  hideBottomMargin?: boolean;
  /**
   * Set true to render items in a horizontal list.
   */
  isHorizontal?: boolean;
}

// https://github.com/mui-org/material-ui/issues/8824#issuecomment-344124872
const SceneGrid: React.FunctionComponent<WithWidthProps & SceneGridProps> = (
  Props: WithWidthProps & SceneGridProps
) => {
  const history = useHistory();
  const classes = useStyles();
  const { items, width, hideBottomMargin, isHorizontal } = Props;

  // https://stackoverflow.com/a/53463748/2077741
  const getGridListCols = () => {
    if (width && isWidthUp("lg", width)) {
      return 5;
    }

    if (width && isWidthUp("md", width)) {
      return 3;
    }

    return 2;
  };

  const showSpinner = (scene: SceneData) =>
    scene.Status === SceneStatus.Creating ||
    scene.Status === SceneStatus.Deleting ||
    scene.Status === SceneStatus.Updating ||
    scene.Status === SceneStatus.UpdatingImage ||
    scene.Status === SceneStatus.UploadingVideo ||
    scene.Status === SceneStatus.UploadingZipContent;

  const getSpinnerMessage = (scene: SceneData) => {
    if (scene.Status === SceneStatus.Creating) return "Creating";
    else if (scene.Status === SceneStatus.Deleting) return "Deleting";
    else if (scene.Status === SceneStatus.Updating) return "Updating";
    else if (scene.Status === SceneStatus.UpdatingImage)
      return "Uploading Image";
    else if (scene.Status === SceneStatus.UploadingVideo)
      return "Uploading Video";
    else if (scene.Status === SceneStatus.UploadingZipContent)
      return "Uploading Scene";
    else return "";
  };

  if (Props.items.length === 0) {
    return (
      <Typography className={classes.noScenes}>No scenes to display</Typography>
    );
  }

  return (
    <Box
      className={`${classes.gridBox} ${
        hideBottomMargin ?? classes.gridMarginBottom
      } ${isHorizontal && classes.gridBoxHorizontal}`}
    >
      <GridList
        className={`${isHorizontal && classes.gridListHorizontal}`}
        cellHeight={150}
        cols={getGridListCols()}
        spacing={8}
      >
        {items.map((scene) => (
          <GridListTile
            key={scene._id}
            className={classes.gridTile}
            onClick={() => {
              if (scene.Status === SceneStatus.None) {
                history.push(`${history.location.pathname}/${scene._id}`);
              }
            }}
          >
            {showSpinner(scene) && (
              <Box className={classes.spinnerBox}>
                <LinearProgress className={classes.linearProgress} />
                <Typography variant="body2">
                  {getSpinnerMessage(scene)}
                </Typography>
              </Box>
            )}
            {!showSpinner(scene) && scene.thumbnail && scene.thumbnail.blobURL && (
              <img src={scene.thumbnail.blobURL} alt={scene.title} />
            )}
            {scene.Status === SceneStatus.Failed && (
              <Box className={classes.spinnerBox}>
                <ErrorOutlineIcon className={classes.errorIcon} titleAccess={scene.Error} />
                <Typography variant="body2">
                  Failed
                </Typography>
              </Box>
            )}
            {scene.state !== 1 && (
              <Box className={classes.spinnerBox}>
                <ErrorOutlineIcon className={classes.pendingIcon} titleAccess="The scene needs image, video or content zip to be added"  />
                <Typography variant="body2">
                  Pending
                </Typography>
              </Box>
            )}
            <GridListTileBar
              className={classes.gridTileBar}
              title={scene.title}
              subtitle={scene.description}
            />
          </GridListTile>
        ))}
      </GridList>

      {Props.isLoadingMore && (
        <Box className={classes.spinner}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default withWidth()(SceneGrid);
