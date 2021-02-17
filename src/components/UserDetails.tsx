import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import React, { useReducer } from "react";
import { useRouteMatch } from "react-router-dom";
import { AccountTypeDialog, ConfirmDialog, EmailDialog, PasswordDialog } from ".";
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
  showAccountTypeDialog: boolean;
  showDeleteDialog: boolean;
  showEmailDialog: boolean;
  showSendPasswordDialog: boolean;
}

// Local default state
const DefaultLocalState: ILocalState = {
  showAccountTypeDialog: false,
  showDeleteDialog: false,
  showEmailDialog: false,
  showSendPasswordDialog: false,
};

// Local actions
const LocalAction = {
  ToggleAccountTypeDialog: "ToggleAccountTypeDialog",
  ToggleDeleteDialog: "ToggleDeleteDialog",
  ToggleEmailDialog: 'ToggleEmailDialog',
  ToggleSendPasswordDialog: "ToggleSendPasswordDialog",
};

// Local reducer
const LocalReducer = (
  state: ILocalState,
  action: ActionResult<IBasePayload>
): ILocalState => {
  switch (action.type) {
    case LocalAction.ToggleAccountTypeDialog: {
      return { ...state, showAccountTypeDialog: !state.showAccountTypeDialog };
    }
    case LocalAction.ToggleDeleteDialog: {
      return { ...state, showDeleteDialog: !state.showDeleteDialog };
    }
    case LocalAction.ToggleEmailDialog: {
      return { ...state, showEmailDialog: !state.showEmailDialog };
    }
    case LocalAction.ToggleSendPasswordDialog: {
      return { ...state, showSendPasswordDialog: !state.showSendPasswordDialog };
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
          type: LocalAction.ToggleAccountTypeDialog,
        }),
    },
    {
      key: "a2",
      label: "Change Email",
      onClick: () =>
        dispatch({
          type: LocalAction.ToggleEmailDialog,
        }),
    },
    {
      key: "a3",
      label: "Send New Password",
      onClick: () =>
        dispatch({
          type: LocalAction.ToggleSendPasswordDialog,
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
      <Typography variant="h5" gutterBottom>
        Settings For
      </Typography>
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
      
      <AccountTypeDialog
        title="Change Type"
        description={`Please select account type for "hanzlamateen${userId}@live.com".`}
        open={state.showAccountTypeDialog}
        currentAccountType="user"
        onClose={() =>
          dispatch({
            type: LocalAction.ToggleAccountTypeDialog,
          })
        }
        onSuccess={(type) => {
          console.log(type);
          dispatch({
            type: LocalAction.ToggleAccountTypeDialog,
          });
        }}
      />

      <EmailDialog
        title="Change Email"
        description={`Please enter new email address for "hanzlamateen${userId}@live.com" account.`}
        open={state.showEmailDialog}
        onClose={() =>
          dispatch({
            type: LocalAction.ToggleEmailDialog,
          })
        }
        onSuccess={(email) => {
          console.log(email);
          dispatch({
            type: LocalAction.ToggleEmailDialog,
          });
        }}
      />
      
      <ConfirmDialog
        title="Send New Password"
        description={`Are you sure you want to send new  password for "hanzlamateen${userId}@live.com" account?`}
        open={state.showSendPasswordDialog}
        onClose={() =>
          dispatch({
            type: LocalAction.ToggleSendPasswordDialog,
          })
        }
        onSuccess={() =>
          dispatch({
            type: LocalAction.ToggleSendPasswordDialog,
          })
        }
      />

      <PasswordDialog
        title="Delete Account"
        description={`Are you sure you want to permanently delete "hanzlamateen${userId}@live.com" account? If so, please confirm your password to proceed.`}
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
  );
};

export default UserDetails;
