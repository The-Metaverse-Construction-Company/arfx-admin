import {
  Box,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import React, { useReducer } from "react";
import { useHistory } from "react-router-dom";
import { PasswordDialog, ScrollableBox } from ".";
import Routes from "../constants/Routes";
import { ActionResult } from "../models/Action";
import { IBasePayload } from "../models/IPayloads";

const useStyles = makeStyles((theme) => ({
  rootBox: {
    paddingTop: theme.spacing(4),
    height: "100%",
    width: "100%",
  },
  settingsBox: {
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "50%",
    },
  },
  sectionBox: {
    marginTop: theme.spacing(6),
  },
  sectionHeading: {
    marginBottom: theme.spacing(1),
  },
  list: {
    backgroundColor: "black",
    marginTop: theme.spacing(1),
    borderRadius: theme.spacing(1),
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

const Settings: React.FunctionComponent = () => {
  const classes = useStyles();
  const history = useHistory();
  const [state, dispatch] = useReducer(LocalReducer, DefaultLocalState);

  const accountOptions: MenuItem[] = [
    {
      key: "s1",
      label: "Logout",
      onClick: () => {
        history.push(Routes.SIGN_IN);
      },
    },
    {
      key: "s2",
      label: "Change Password",
      onClick: () =>
        dispatch({
          type: LocalAction.TogglePasswordDialog,
        }),
    },
    {
      key: "s3",
      label: "Delete Account",
      onClick: () =>
        dispatch({
          type: LocalAction.ToggleDeleteDialog,
        }),
    },
  ];

  return (
    <ScrollableBox className={classes.rootBox}>
      <Container className={classes.settingsBox} disableGutters>
        <Box className={classes.sectionBox} pb={8}>
          <List className={classes.list}>
            {accountOptions.map((item, index) => {
              return (
                <Box key={item.key}>
                  <ListItem button onClick={item.onClick}>
                    <ListItemText primary={item.label} />
                  </ListItem>
                  {accountOptions[index + 1] !== undefined && <Divider />}
                </Box>
              );
            })}
          </List>

          <PasswordDialog
            title="Change Password"
            description="Please enter details below"
            open={state.showPasswordDialog}
            newPasswordMode
            onClose={() =>
              dispatch({
                type: LocalAction.TogglePasswordDialog,
              })
            }
            onSuccess={(passwordArgs) => {
              console.log(passwordArgs);
              dispatch({
                type: LocalAction.TogglePasswordDialog,
              });
            }}
          />

          <PasswordDialog
            title="Delete Account"
            description="Are you sure you want to permanently delete your account? If so, please confirm your password to proceed."
            open={state.showDeleteDialog}
            onClose={() =>
              dispatch({
                type: LocalAction.ToggleDeleteDialog,
              })
            }
            onSuccess={(passwordArgs) => {
              console.log(passwordArgs);
              dispatch({
                type: LocalAction.ToggleDeleteDialog,
              });
            }}
          />
        </Box>
      </Container>
    </ScrollableBox>
  );
};

export default Settings;
