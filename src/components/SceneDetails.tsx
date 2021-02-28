import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useReducer } from "react";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import { ActionResult } from "../models/Action";
import {
  IBasePayload,
  IFilePayload,
  INumberPayload,
  IScenePayload,
  IStringPayload,
} from "../models/IPayloads";
import { ConfirmDialog, ScrollableBox } from ".";
import ReactPlayer from "react-player";
import Routes from "../constants/Routes";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CloseIcon from "@material-ui/icons/Close";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/RootReducer";
import { cloneDeep } from "lodash";
import { SceneData } from "../models/Scenes";
import { createScene, deleteScene, updateScene } from "../redux/slice/ScenesSlice";
import { GenerateGuid } from "../utilities/StringHelpers";
import { addNotification } from "../redux/slice/SettingsSlice";
import { CreateErrorNotification } from "../models/Notification";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
    marginTop: theme.spacing(3),
  },
  grid: {
    marginTop: theme.spacing(2),
  },
  sceneTitle: {
    marginBottom: theme.spacing(2),
  },
  previewBox: {
    height: 100,
    width: 200,
    border: "1px solid rgba(255, 255, 255, 0.25)",
    borderRadius: theme.spacing(0.5),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  previewImg: {
    maxHeight: 98,
    maxWidth: 198,
  },
  uploadPreviewBtn: {
    marginBottom: theme.spacing(4),
  },
  priceTxtBox: {
    marginBottom: theme.spacing(4),
  },
  previewGrid: {
    display: "flex",
    flexDirection: "column",
  },
  videoBox: {
    marginTop: theme.spacing(2),
    border: "1px solid rgba(255, 255, 255, 0.25)",
    borderRadius: theme.spacing(1),
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  videoLayout: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  videoSpinner: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  videoPlayer: {
    "& video": {
      outline:
        "none" /** https://github.com/mui-org/material-ui/issues/11504 */,
    },
  },
  btnsBox: {
    marginTop: theme.spacing(4),
  },
  deleteBtn: {
    margin: theme.spacing(0, 1, 0, 1),
  },
}));

// Local state
interface ILocalState {
  title: string;
  description: string;
  price: number;
  scene?: SceneData;
  sceneImage?: File;
  sceneImageUrl?: string;
  sceneVideo?: File;
  sceneVideoUrl?: string;
  sceneVideoLoading?: boolean;
  sceneFile?: File;
  showDeleteDialog: boolean;
}

// Local default state
const DefaultLocalState: ILocalState = {
  showDeleteDialog: false,
  title: "",
  description: "",
  price: 0,
};

// Local actions
const LocalAction = {
  SetTitle: "SetTitle",
  SetDescription: "SetDescription",
  SetPrice: "SetPrice",
  AddImage: "AddImage",
  AddVideo: "AddVideo",
  VideoLoaded: "VideoLoaded",
  AddSceneFile: "AddSceneFile",
  ToggleDeleteDialog: "ToggleDeleteDialog",
  ParseScene: "ParseScene",
  Reset: "Reset",
};

// Local reducer
const LocalReducer = (
  state: ILocalState,
  action: ActionResult<IBasePayload>
): ILocalState => {
  switch (action.type) {
    case LocalAction.SetTitle: {
      return {
        ...state,
        title: (action.payload as IStringPayload).string,
      };
    }
    case LocalAction.SetDescription: {
      return {
        ...state,
        description: (action.payload as IStringPayload).string,
      };
    }
    case LocalAction.SetPrice: {
      return {
        ...state,
        price: (action.payload as INumberPayload).number,
      };
    }
    case LocalAction.AddImage: {
      let file = (action.payload as IFilePayload).file;
      let url = file ? URL.createObjectURL(file) : undefined;

      if (!url && state.scene) {
        url = state.scene.thumbnail.blobURL;
      }

      return {
        ...state,
        sceneImage: file,
        sceneImageUrl: url,
      };
    }
    case LocalAction.AddVideo: {
      let file = (action.payload as IFilePayload).file;
      let url = file ? URL.createObjectURL(file) : undefined;

      if (!url && state.scene) {
        url = state.scene.previewVideo.blobURL;
      }

      return {
        ...state,
        sceneVideoLoading: true,
        sceneVideo: file,
        sceneVideoUrl: url,
      };
    }
    case LocalAction.VideoLoaded: {
      return {
        ...state,
        sceneVideoLoading: false,
      };
    }
    case LocalAction.AddSceneFile: {
      let file = (action.payload as IFilePayload).file;
      return {
        ...state,
        sceneFile: file,
      };
    }
    case LocalAction.ToggleDeleteDialog: {
      return {
        ...state,
        showDeleteDialog: !state.showDeleteDialog,
      };
    }
    case LocalAction.ParseScene: {
      const scene = (action.payload as IScenePayload).scene;

      return {
        ...state,
        scene,
        title: scene.title,
        description: scene.description,
        price: scene.price,
        sceneImageUrl: scene.thumbnail.blobURL,
        sceneVideoLoading: true,
        sceneVideoUrl: scene.previewVideo.blobURL,
      };
    }
    case LocalAction.Reset: {
      return cloneDeep(DefaultLocalState);
    }
    default: {
      return state;
    }
  }
};

const SceneDetails: React.FunctionComponent = () => {
  const classes = useStyles();
  const history = useHistory();
  const [state, dispatch] = useReducer(LocalReducer, DefaultLocalState);
  const isNewSceneMode = useRouteMatch({
    path: `${Routes.SCENES}/new`,
  });
  const { sceneId } = useParams<{ sceneId: string }>();

  const reduxDispatch = useDispatch();
  const scene = useSelector((state: RootState) => {
    if (sceneId && state.scenes.result) {
      return state.scenes.result.data.find((item) => item._id === sceneId);
    }
    return undefined;
  });

  useEffect(() => {
    if (scene) {
      dispatch({
        type: LocalAction.ParseScene,
        payload: { scene },
      });
    } else {
      dispatch({ type: LocalAction.Reset });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSceneSubmit = () => {
    let validationError = "";
    if (!state.title) {
      validationError = "Title is empty";
    } else if (!state.description) {
      validationError = "Description is empty";
    } else if (!state.price || state.price === 0) {
      validationError = "Price is empty or zero";
    }

    if (validationError) {
      reduxDispatch(addNotification(CreateErrorNotification(validationError)));
    } else if (isNewSceneMode) {
      reduxDispatch(
        createScene({
          id: GenerateGuid(),
          title: state.title!,
          description: state.description!,
          price: state.price!,
          sceneImage: state.sceneImage,
          sceneVideo: state.sceneVideo,
          sceneFile: state.sceneFile,
        })
      );
      history.push(Routes.SCENES);
    } else {
      reduxDispatch(
        updateScene({
          id: sceneId,
          title: state.title!,
          description: state.description!,
          price: state.price!,
          scene,
          sceneImage: state.sceneImage,
          sceneVideo: state.sceneVideo,
          sceneFile: state.sceneFile,
        })
      );
      history.push(Routes.SCENES);
    }
  };

  const UploadVideoBtn = () => {
    return (
      <Button
        component="label"
        variant="contained"
        color="primary"
        startIcon={<CloudUploadIcon />}
      >
        Upload Video
        <input
          type="file"
          accept="video/*"
          hidden
          onClick={(event) =>
            ((event.target as any).value = "")
          } /** https://stackoverflow.com/a/54632736/2077741 */
          onChange={(event: React.SyntheticEvent) => {
            if (event.target) {
              let fileList = (event.target as any).files;

              if (fileList.length > 0) {
                dispatch({
                  type: LocalAction.AddVideo,
                  payload: { file: fileList[0] },
                });
              }
            }
          }}
        />
      </Button>
    );
  };

  return (
    <ScrollableBox>
      <Container className={classes.container} disableGutters>
        <Button
          startIcon={<ArrowBackIosIcon />}
          onClick={() => history.push(Routes.SCENES)}
        >
          Back
        </Button>
        <br />

        <Grid className={classes.grid} spacing={3} container>
          <Grid item xs={3}>
            <Typography className={classes.sceneTitle}>
              Scene Details
            </Typography>

            <Box className={classes.previewBox}>
              {state.sceneImageUrl && (
                <img
                  className={classes.previewImg}
                  src={state.sceneImageUrl}
                  alt="Scene Preview"
                />
              )}
            </Box>

            {state.sceneImage && (
              <Typography key={state.sceneImage.name} variant="caption">
                <IconButton
                  size="small"
                  onClick={() =>
                    dispatch({
                      type: LocalAction.AddImage,
                      payload: { file: undefined },
                    })
                  }
                >
                  <CloseIcon />
                </IconButton>
                {state.sceneImage.name}
              </Typography>
            )}

            <br />
            <Button
              className={classes.uploadPreviewBtn}
              component="label"
              variant="contained"
              color="primary"
              startIcon={<CloudUploadIcon />}
            >
              Upload Preview
              <input
                type="file"
                accept=".png, .jpg, .jpeg"
                hidden
                onClick={(event) =>
                  ((event.target as any).value = "")
                } /** https://stackoverflow.com/a/54632736/2077741 */
                onChange={(event: React.SyntheticEvent) => {
                  if (event.target) {
                    let fileList = (event.target as any).files;

                    if (fileList.length > 0) {
                      dispatch({
                        type: LocalAction.AddImage,
                        payload: { file: fileList[0] },
                      });
                    }
                  }
                }}
              />
            </Button>

            <TextField
              label="Title"
              variant="outlined"
              margin="normal"
              autoComplete="title"
              value={state.title}
              fullWidth
              onChange={(event) => {
                const { value } = event.target;
                dispatch({
                  type: LocalAction.SetTitle,
                  payload: { string: value },
                });
              }}
            />

            <TextField
              label="Description"
              variant="outlined"
              margin="normal"
              autoComplete="description"
              value={state.description}
              rows={4}
              fullWidth
              multiline
              onChange={(event) => {
                const { value } = event.target;
                dispatch({
                  type: LocalAction.SetDescription,
                  payload: { string: value },
                });
              }}
            />

            <TextField
              className={classes.priceTxtBox}
              label="Price"
              variant="outlined"
              margin="normal"
              autoComplete="price"
              type="number"
              value={state.price}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              onChange={(event) => {
                const { value } = event.target;
                dispatch({
                  type: LocalAction.SetPrice,
                  payload: { number: value },
                });
              }}
            />

            <br />
            {state.sceneFile && (
              <Typography key={state.sceneFile.name} variant="caption">
                <IconButton
                  size="small"
                  onClick={() =>
                    dispatch({
                      type: LocalAction.AddSceneFile,
                      payload: { file: undefined },
                    })
                  }
                >
                  <CloseIcon />
                </IconButton>
                {state.sceneFile.name}
              </Typography>
            )}
            <br />
            <Button
              component="label"
              variant="contained"
              color="primary"
              startIcon={<CloudUploadIcon />}
            >
              Upload Scene Files
              <input
                type="file"
                accept=".zip"
                hidden
                onClick={(event) =>
                  ((event.target as any).value = "")
                } /** https://stackoverflow.com/a/54632736/2077741 */
                onChange={(event: React.SyntheticEvent) => {
                  if (event.target) {
                    let fileList = (event.target as any).files;

                    if (fileList.length > 0) {
                      dispatch({
                        type: LocalAction.AddSceneFile,
                        payload: { file: fileList[0] },
                      });
                    }
                  }
                }}
              />
            </Button>
          </Grid>
          <Grid className={classes.previewGrid} item xs={9}>
            <Grid container>
              <Grid item xs>
                <Typography>Preview Clip</Typography>

                {state.sceneVideo && (
                  <Typography key={state.sceneVideo.name} variant="caption">
                    <IconButton
                      size="small"
                      onClick={() =>
                        dispatch({
                          type: LocalAction.AddVideo,
                          payload: { file: undefined },
                        })
                      }
                    >
                      <CloseIcon />
                    </IconButton>
                    {state.sceneVideo.name}
                  </Typography>
                )}
              </Grid>

              {state.sceneVideoUrl && (
                <Grid item>
                  <UploadVideoBtn />
                </Grid>
              )}
            </Grid>

            <Box className={classes.videoLayout}>
              {state.sceneVideoUrl && state.sceneVideoLoading && (
                <Box className={classes.videoSpinner}>
                  <CircularProgress />
                  <Typography>Loading Video</Typography>
                </Box>
              )}

              {state.sceneVideoUrl && (
                <ReactPlayer
                  className={classes.videoPlayer}
                  url={state.sceneVideoUrl}
                  width="100%"
                  height="100%"
                  playing
                  loop
                  onReady={() => dispatch({ type: LocalAction.VideoLoaded })}
                />
              )}
            </Box>

            {!state.sceneVideoUrl && (
              <Box className={classes.videoBox}>
                <UploadVideoBtn />
              </Box>
            )}
          </Grid>
        </Grid>

        <br />
        <Box className={classes.btnsBox}>
          <Button
            component="label"
            variant="contained"
            color="primary"
            onClick={onSceneSubmit}
          >
            Save Scene
          </Button>
          {!isNewSceneMode && (
            <Button
              className={classes.deleteBtn}
              component="label"
              variant="outlined"
              color="primary"
              onClick={() =>
                dispatch({
                  type: LocalAction.ToggleDeleteDialog,
                })
              }
            >
              Delete Scene
            </Button>
          )}
        </Box>
      </Container>

      <ConfirmDialog
        title="Delete Scene"
        description={`Are you sure you want to remove this scene?`}
        open={state.showDeleteDialog}
        onClose={() =>
          dispatch({
            type: LocalAction.ToggleDeleteDialog,
          })
        }
        onSuccess={() => {
          reduxDispatch(deleteScene(sceneId));
          history.push(Routes.SCENES);
        }}
      />
    </ScrollableBox>
  );
};

export default SceneDetails;
