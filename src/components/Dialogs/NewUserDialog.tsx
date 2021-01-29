import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useReducer } from "react";
import { cloneDeep } from "lodash";
import { ActionResult } from "../../models/Action";
import { IBasePayload, IStringPayload } from "../../models/IPayloads";

interface NewUserDialogProps {
  open: boolean;
  onClose: () => void;
}

// Local state
interface ILocalState {
  email: string;
  emailError: string;
  accountType: string;
}

// Local default state
const DefaultLocalState: ILocalState = {
  email: "",
  emailError: "",
  accountType: "user",
};

// Local actions
const LocalAction = {
  Reset: "Reset",
  SetEmail: "SetEmail",
  SetEmailError: "SetEmailError",
  SetAccountType: "SetAccountType",
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
    case LocalAction.SetEmail: {
      return { ...state, email: (action.payload as IStringPayload).string };
    }
    case LocalAction.SetEmailError: {
      return {
        ...state,
        emailError: (action.payload as IStringPayload).string,
      };
    }
    case LocalAction.SetAccountType: {
      return {
        ...state,
        accountType: (action.payload as IStringPayload).string,
      };
    }
    default: {
      return state;
    }
  }
};

const NewUserDialog: React.FunctionComponent<NewUserDialogProps> = (
  Props: NewUserDialogProps
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
    if (!state.email) {
      dispatch({
        type: LocalAction.SetEmailError,
        payload: { string: "Required" },
      });
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(state.email)) {
      dispatch({
        type: LocalAction.SetEmailError,
        payload: { string: "Invalid email address" },
      });
    } else {
      // Currently the error message would not be cleared until explicity done in this else.
      console.log({ email: state.email, accountType: state.accountType });
    }
  };

  return (
    <Dialog open={Props.open} onClose={Props.onClose} maxWidth="sm" fullWidth>
      <DialogTitle>New User</DialogTitle>
      <DialogContent>
        <DialogContentText>Please enter user details below.</DialogContentText>
        <TextField
          autoFocus
          variant="outlined"
          margin="normal"
          id="email"
          label="Email Address"
          type="email"
          fullWidth
          onChange={(event) => {
            const { value } = event.target;
            dispatch({
              type: LocalAction.SetEmail,
              payload: { string: value },
            });
          }}
        />
        <Typography variant="body2" color="error">
          {state.emailError}
        </Typography>
        <FormControl variant="filled" fullWidth>
          <InputLabel id="accountType-label">Type</InputLabel>
          <Select
            labelId="accountType-label"
            value={state.accountType}
            onChange={(event) =>
              dispatch({
                type: LocalAction.SetAccountType,
                payload: { string: event.target.value as string },
              })
            }
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </FormControl>
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

export default NewUserDialog;
