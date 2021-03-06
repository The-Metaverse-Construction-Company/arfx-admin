import { Box, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import {
  NavBar,
  Settings,
  ForgotPasswordContent,
  LoginContainer,
  SignInContent,
  Scenes,
  Users,
  SceneDetails,
  AppCommon,
} from "./components";
import Routes from "./constants/Routes";
import { RootState } from "./redux/RootReducer";

// Added scrollbar height for content box using link: https://codesandbox.io/s/rmll8r8qvp?file=/PageContent.jsx
const useStyles = makeStyles((theme) => ({
  contentBox: {
    height: `calc(100vh - 56px - 8px)`,
    [`${theme.breakpoints.up("xs")} and (orientation: landscape)`]: {
      height: `calc(100vh - 48px - 8px)`,
    },
    [theme.breakpoints.up("sm")]: {
      height: `calc(100vh - 64px - 8px)`,
    },
  },
  contentContainer: {
    height: "100%",
  },
}));

const App: React.FunctionComponent = () => {
  const history = useHistory();
  const classes = useStyles();
  const { success } = useSelector((state: RootState) => state.admin);

  useEffect(() => {
    if (!success) {
      history.push(Routes.SIGN_IN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  return (
    <>
      <AppCommon />
      {/* Below goes the controls that have fullscreen layout */}

      <Switch>
        <Route exact path="/">
          <Redirect to={Routes.SIGN_IN} />
        </Route>
        <Route exact path={Routes.SIGN_IN}>
          <LoginContainer content={<SignInContent />} />
        </Route>
        <Route exact path={Routes.FORGOT_PASSWORD}>
          <LoginContainer content={<ForgotPasswordContent />} />
        </Route>
      </Switch>

      {/* Below goes the controls that have common app layout */}

      <Route path={[Routes.SCENES, Routes.USERS, Routes.SETTINGS]}>
        <NavBar />
      </Route>
      <Box className={classes.contentBox}>
        <Switch>
          <Route exact path={Routes.SCENES} component={Scenes} />
          <Route path={Routes.USERS} component={Users} />
          <Route exact path={Routes.SETTINGS} component={Settings} />
          <Route
            exact
            path={[`${Routes.SCENES}/:sceneId`, `${Routes.SCENES}/new`]}
            component={SceneDetails}
          />
        </Switch>
      </Box>
    </>
  );
};

export default App;
