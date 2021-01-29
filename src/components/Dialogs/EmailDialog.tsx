import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useReducer } from "react";
import { cloneDeep } from "lodash";
import { ActionResult } from "../../models/Action";
import { IBasePayload, IStringPayload } from "../../models/IPayloads";

interface EmailDialogProps {
  open: boolean;
  title: string;
  description: string;
  onSuccess: (emailArgs: EmailArgs) => void;
  onClose: () => void;
}

interface EmailArgs {
  email: string;
}

// Local state
interface ILocalState {
  email: string;
  emailError: string;
}

// Local default state
const DefaultLocalState: ILocalState = {
  email: "",
  emailError: "",
};

// Local actions
const LocalAction = {
  Reset: "Reset",
  SetEmail: "SetEmail",
  SetEmailError: "SetEmailError",
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
    default: {
      return state;
    }
  }
};

const EmailDialog: React.FunctionComponent<EmailDialogProps> = (
  Props: EmailDialogProps
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
      Props.onSuccess({ email: state.email });
    }
  };

  return (
    <Dialog open={Props.open} onClose={Props.onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{Props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {Props.description}
        </DialogContentText>
        <TextField
          autoFocus
          variant="outlined"
          margin="normal"
          id="email"
          label="New Email Address"
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

export default EmailDialog;
