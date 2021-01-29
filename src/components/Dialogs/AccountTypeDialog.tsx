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
} from "@material-ui/core";
import React, { useEffect, useState } from "react";

interface AccountTypeDialogProps {
  open: boolean;
  title: string;
  description: string;
  currentAccountType: string;
  onSuccess: (accountTypeArgs: AccountTypeArgs) => void;
  onClose: () => void;
}

interface AccountTypeArgs {
  accountType: string;
}

const AccountTypeDialog: React.FunctionComponent<AccountTypeDialogProps> = (
  Props: AccountTypeDialogProps
) => {
  const [accountType, setAccountType] = useState(Props.currentAccountType);

  useEffect(() => {
    if (Props.open) {
      setAccountType(Props.currentAccountType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Props.open]);

  return (
    <Dialog open={Props.open} onClose={Props.onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{Props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{Props.description}</DialogContentText>
        <FormControl variant="filled" fullWidth>
          <InputLabel id="accountType-label">Type</InputLabel>
          <Select
            labelId="accountType-label"
            value={accountType}
            onChange={(event) => setAccountType(event.target.value as string)}
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={Props.onClose}>Cancel</Button>
        <Button
          autoFocus
          onClick={() => {
            Props.onSuccess({ accountType: accountType });
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AccountTypeDialog;
