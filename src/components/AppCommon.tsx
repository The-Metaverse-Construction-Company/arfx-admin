import React from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/RootReducer";
import { removeNotification } from "../redux/slice/SettingsSlice";

const AppCommon: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state: RootState) => state.settings);

  return (
    <>
      {notifications.map((item) => (
        <Snackbar
          open
          autoHideDuration={5000}
          onClose={() => dispatch(removeNotification(item.id))}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            severity={item.severity}
            onClose={() => dispatch(removeNotification(item.id))}
          >
            {item.message}
          </MuiAlert>
        </Snackbar>
      ))}
    </>
  );
};

export default AppCommon;
