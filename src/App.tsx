import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import { Switch, Route, Redirect, HashRouter } from "react-router-dom";
import {
  NavBar,
  Settings,
  ForgotPasswordContent,
  LoginContainer,
  SignInContent,
  Scenes,
  Users,
  SceneDetails,
} from "./components";
import Routes from "./constants/Routes";

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
  const classes = useStyles();

  return (
    <>
      <HashRouter>
        {/* Below goes the controls that have fullscreen layout */}

        <Switch>
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
            <Route exact path="/">
              <Redirect to={Routes.SCENES} />
            </Route>
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
      </HashRouter>
    </>
  );
};

export default App;
