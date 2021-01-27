import {
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useReducer } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { ActionResult } from "../models/Action";
import { IBasePayload, IFilesPayload } from "../models/IPayloads";
import { ConfirmDialog, ScrollableBox } from ".";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Routes from "../constants/Routes";

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
  uploadSceneBtn: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4),
  },
  priceTxtBox: {
    marginBottom: 0,
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
  btnsBox: {
    marginTop: theme.spacing(4),
  },
  deleteBtn: {
    margin: theme.spacing(0, 1, 0, 1),
    background: "transparent",
    boxShadow: "none",
  },
}));

// Local state
interface ILocalState {
  sceneFiles: File[];
  showDeleteDialog: boolean;
}

// Local default state
const DefaultLocalState: ILocalState = {
  sceneFiles: [],
  showDeleteDialog: false,
};

// Local actions
const LocalAction = {
  AddFiles: "AddFiles",
  AddVideo: "AddVideo",
  ToggleDeleteDialog: "ToggleDeleteDialog",
};

// Local reducer
const LocalReducer = (
  state: ILocalState,
  action: ActionResult<IBasePayload>
): ILocalState => {
  switch (action.type) {
    case LocalAction.AddFiles: {
      return {
        ...state,
        sceneFiles: (action.payload as IFilesPayload).files,
      };
    }
    case LocalAction.ToggleDeleteDialog: {
      return {
        ...state,
        showDeleteDialog: !state.showDeleteDialog,
      };
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

  return (
    <ScrollableBox>
      <Container className={classes.container} disableGutters>
        <Button
          startIcon={<ArrowBackIosIcon />}
          onClick={() => history.goBack()}
        >
          Back
        </Button>
        <br />

        <Grid className={classes.grid} spacing={3} container>
          <Grid item xs={3}>
            <Typography className={classes.sceneTitle}>
              Current Scene
            </Typography>

            {Array.from(state.sceneFiles).map((file) => {
              return (
                <Typography key={file.name} variant="caption">
                  {file.name}
                </Typography>
              );
            })}

            <br />
            <Button
              className={classes.uploadSceneBtn}
              component="label"
              variant="contained"
              color="primary"
              startIcon={<CloudUploadIcon />}
            >
              Upload Scene
              <input
                type="file"
                accept=".png, .jpg, .jpeg"
                hidden
                onChange={(event: React.SyntheticEvent) => {
                  if (event.target) {
                    let newFiles: File[] = (event.target as any).files;
                    dispatch({
                      type: LocalAction.AddFiles,
                      payload: { files: newFiles },
                    });
                  }
                }}
              />
            </Button>

            <TextField
              label="Name"
              variant="outlined"
              margin="normal"
              autoComplete="name"
              fullWidth
            />

            <TextField
              label="Description"
              variant="outlined"
              margin="normal"
              autoComplete="description"
              rows={4}
              fullWidth
              multiline
            />

            <TextField
              className={classes.priceTxtBox}
              label="Price"
              variant="outlined"
              margin="normal"
              autoComplete="price"
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid className={classes.previewGrid} item xs={9}>
            <Typography>Preview Clip</Typography>

            <Box className={classes.videoBox}>
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
                  onChange={(event: React.SyntheticEvent) => {
                    if (event.target) {
                      let newFiles: File[] = (event.target as any).files;
                      dispatch({
                        type: LocalAction.AddVideo,
                        payload: { files: newFiles },
                      });
                    }
                  }}
                />
              </Button>
            </Box>
          </Grid>
        </Grid>

        <br />
        <Box className={classes.btnsBox}>
          <Button component="label" variant="contained" color="primary">
            Save Scene
          </Button>
          {!isNewSceneMode && (
            <Button
              className={classes.deleteBtn}
              component="label"
              variant="contained"
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
        onSuccess={() =>
          dispatch({
            type: LocalAction.ToggleDeleteDialog,
          })
        }
      />
    </ScrollableBox>
  );
};

export default SceneDetails;
