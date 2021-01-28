import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import React, { useReducer } from "react";
import { useRouteMatch } from "react-router-dom";
import Routes from "../constants/Routes";
import { ActionResult } from "../models/Action";
import { IBasePayload } from "../models/IPayloads";

const useStyles = makeStyles((theme) => ({
  rootBox: {
    margin: theme.spacing(4),
  },
  detailsText: {
    fontWeight: "bold",
  },
  btnsBox: {
    marginTop: theme.spacing(4),
  },
  optionBtn: {
    marginTop: theme.spacing(3),
  },
}));

interface MenuItem {
  key: string;
  label: string;
  onClick: () => void;
}

// Local state
interface ILocalState {
  showDeleteDialog: boolean;
  showPasswordDialog: boolean;
}

// Local default state
const DefaultLocalState: ILocalState = {
  showDeleteDialog: false,
  showPasswordDialog: false,
};

// Local actions
const LocalAction = {
  ToggleDeleteDialog: "ToggleDeleteDialog",
  TogglePasswordDialog: "TogglePasswordDialog",
};

// Local reducer
const LocalReducer = (
  state: ILocalState,
  action: ActionResult<IBasePayload>
): ILocalState => {
  switch (action.type) {
    case LocalAction.ToggleDeleteDialog: {
      return { ...state, showDeleteDialog: !state.showDeleteDialog };
    }
    case LocalAction.TogglePasswordDialog: {
      return { ...state, showPasswordDialog: !state.showPasswordDialog };
    }
    default: {
      return state;
    }
  }
};

const UserDetails: React.FunctionComponent = () => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(LocalReducer, DefaultLocalState);
  const userItemRoute = useRouteMatch({
    path: `${Routes.USERS}/:userId`,
  });

  const accountOptions: MenuItem[] = [
    {
      key: "a1",
      label: "Change Type",
      onClick: () =>
        dispatch({
          type: LocalAction.TogglePasswordDialog,
        }),
    },
    {
      key: "a2",
      label: "Change Email",
      onClick: () =>
        dispatch({
          type: LocalAction.TogglePasswordDialog,
        }),
    },
    {
      key: "a3",
      label: "Send New Password",
      onClick: () =>
        dispatch({
          type: LocalAction.TogglePasswordDialog,
        }),
    },
    {
      key: "a4",
      label: "Delete Account",
      onClick: () =>
        dispatch({
          type: LocalAction.ToggleDeleteDialog,
        }),
    },
  ];

  if (!userItemRoute) {
    return <></>;
  }

  const userId = (userItemRoute.params as any).userId;

  return (
    <Box className={classes.rootBox}>
      <Typography gutterBottom>
        <span className={classes.detailsText}>Email: </span>hanzlamateen{userId}
        @live.com
      </Typography>
      <Typography>
        <span className={classes.detailsText}>Type: </span>User
      </Typography>

      <Box className={classes.btnsBox}>
        {accountOptions.map((item, index) => {
          return (
            <Box key={item.key}>
              <Button
                className={classes.optionBtn}
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                onClick={item.onClick}
              >
                {item.label}
              </Button>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default UserDetails;
