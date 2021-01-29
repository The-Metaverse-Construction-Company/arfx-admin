import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import React, { useEffect, useReducer } from "react";
import { cloneDeep } from "lodash";
import { ActionResult } from "../../models/Action";
import { IBasePayload, IStringPayload } from "../../models/IPayloads";

interface PasswordDialogProps {
  open: boolean;
  title: string;
  description: string;
  newPasswordMode?: boolean;
  onSuccess: (passwordArgs: PasswordArgs) => void;
  onClose: () => void;
}

interface PasswordArgs {
  currentPassword: string;
  newPassword: string;
}

interface PasswordItem {
  password: string;
  error: string;
  showPassword: boolean;
}
const DefaultPasswordItem: PasswordItem = {
  password: "",
  error: "",
  showPassword: false,
};

// Local state
interface ILocalState {
  currentPassword: PasswordItem;
  newPassword: PasswordItem;
  confirmPassword: PasswordItem;
}

// Local default state
const DefaultLocalState: ILocalState = {
  currentPassword: cloneDeep(DefaultPasswordItem),
  newPassword: cloneDeep(DefaultPasswordItem),
  confirmPassword: cloneDeep(DefaultPasswordItem),
};

// Local actions
const LocalAction = {
  Reset: "Reset",
  SetCurrentPassword: "SetCurrentPassword",
  SetCurrentPasswordError: "SetCurrentPasswordError",
  ToggleCurrentPassword: "ToggleCurrentPassword",
  SetNewPassword: "SetNewPassword",
  SetNewPasswordError: "SetNewPasswordError",
  ToggleNewPassword: "ToggleNewPassword",
  SetConfirmPassword: "SetConfirmPassword",
  SetConfirmPasswordError: "SetConfirmPasswordError",
  ToggleConfirmPassword: "ToggleConfirmPassword",
};

// Local reducer
const LocalReducer = (
  state: ILocalState,
  action: ActionResult<IBasePayload>
): ILocalState => {
  switch (action.type) {
    case LocalAction.Reset: {
      const newState = cloneDeep(DefaultLocalState);
      return newState;
    }
    case LocalAction.SetCurrentPassword: {
      const newState = cloneDeep(state);
      newState.currentPassword.password = (action.payload as IStringPayload).string;
      return newState;
    }
    case LocalAction.SetCurrentPasswordError: {
      const newState = cloneDeep(state);
      newState.currentPassword.error = (action.payload as IStringPayload).string;
      newState.newPassword.error = "";
      newState.confirmPassword.error = "";
      return newState;
    }
    case LocalAction.ToggleCurrentPassword: {
      const newState = cloneDeep(state);
      newState.currentPassword.showPassword = !newState.currentPassword
        .showPassword;
      return newState;
    }
    case LocalAction.SetNewPassword: {
      const newState = cloneDeep(state);
      newState.newPassword.password = (action.payload as IStringPayload).string;
      return newState;
    }
    case LocalAction.SetNewPasswordError: {
      const newState = cloneDeep(state);
      newState.currentPassword.error = "";
      newState.newPassword.error = (action.payload as IStringPayload).string;
      newState.confirmPassword.error = "";
      return newState;
    }
    case LocalAction.ToggleNewPassword: {
      const newState = cloneDeep(state);
      newState.newPassword.showPassword = !newState.newPassword.showPassword;
      return newState;
    }
    case LocalAction.SetConfirmPassword: {
      const newState = cloneDeep(state);
      newState.confirmPassword.password = (action.payload as IStringPayload).string;
      return newState;
    }
    case LocalAction.SetConfirmPasswordError: {
      const newState = cloneDeep(state);
      newState.currentPassword.error = "";
      newState.newPassword.error = "";
      newState.confirmPassword.error = (action.payload as IStringPayload).string;
      return newState;
    }
    case LocalAction.ToggleConfirmPassword: {
      const newState = cloneDeep(state);
      newState.confirmPassword.showPassword = !newState.confirmPassword
        .showPassword;
      return newState;
    }
    default: {
      return state;
    }
  }
};

const PasswordDialog: React.FunctionComponent<PasswordDialogProps> = (
  Props: PasswordDialogProps
) => {
  const [state, dispatch] = useReducer(LocalReducer, DefaultLocalState);

  useEffect(() => {
    if (Props.open) {
      dispatch({
        type: LocalAction.Reset,
      });
    }
  }, [Props.open]);

  const OnConfirm = () => {
    if (!state.currentPassword.password) {
      dispatch({
        type: LocalAction.SetCurrentPasswordError,
        payload: { string: "Required" },
      });
    } else if (Props.newPasswordMode && !state.newPassword.password) {
      dispatch({
        type: LocalAction.SetNewPasswordError,
        payload: { string: "Required" },
      });
    } else if (Props.newPasswordMode && !state.confirmPassword.password) {
      dispatch({
        type: LocalAction.SetConfirmPasswordError,
        payload: { string: "Required" },
      });
    } else if (
      Props.newPasswordMode &&
      state.newPassword.password !== state.confirmPassword.password
    ) {
      dispatch({
        type: LocalAction.SetConfirmPasswordError,
        payload: { string: "Passwords must match" },
      });
    } else {
      Props.onSuccess({
        currentPassword: state.currentPassword.password,
        newPassword: state.newPassword.password,
      });
    }
  };

  return (
    <Dialog open={Props.open} onClose={Props.onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{Props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{Props.description}</DialogContentText>
        <TextField
          autoFocus
          variant="outlined"
          margin="normal"
          id="currentPassword"
          label="Current Password"
          type={state.currentPassword.showPassword ? "text" : "password"}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={() =>
                    dispatch({ type: LocalAction.ToggleCurrentPassword })
                  }
                >
                  {state.currentPassword.showPassword ? (
                    <Visibility />
                  ) : (
                    <VisibilityOff />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={(event) => {
            const { value } = event.target;
            dispatch({
              type: LocalAction.SetCurrentPassword,
              payload: { string: value },
            });
          }}
        />
        <Typography variant="body2" color="error">
          {state.currentPassword.error}
        </Typography>
        {Props.newPasswordMode && (
          <>
            <TextField
              autoFocus
              variant="outlined"
              margin="normal"
              id="newPassword"
              label="New Password"
              type={state.newPassword.showPassword ? "text" : "password"}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() =>
                        dispatch({ type: LocalAction.ToggleNewPassword })
                      }
                    >
                      {state.newPassword.showPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={(event) => {
                const { value } = event.target;
                dispatch({
                  type: LocalAction.SetNewPassword,
                  payload: { string: value },
                });
              }}
            />
            <Typography variant="body2" color="error">
              {state.newPassword.error}
            </Typography>

            <TextField
              autoFocus
              variant="outlined"
              margin="normal"
              id="confirmPassword"
              label="Confirm Password"
              type={state.confirmPassword.showPassword ? "text" : "password"}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() =>
                        dispatch({ type: LocalAction.ToggleConfirmPassword })
                      }
                    >
                      {state.confirmPassword.showPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={(event) => {
                const { value } = event.target;
                dispatch({
                  type: LocalAction.SetConfirmPassword,
                  payload: { string: value },
                });
              }}
            />
            <Typography variant="body2" color="error">
              {state.confirmPassword.error}
            </Typography>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={Props.onClose}>Cancel</Button>
        <Button onClick={OnConfirm} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PasswordDialog;
