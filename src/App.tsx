import { useMsal } from "@azure/msal-react";
import { Box, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import {
  NavBar,
  Settings,
  Scenes,
  SceneDetails,
  AppCommon,
  LoginContainer,
  SignInContent,
} from "./components";
import Routes from "./constants/Routes";
import { loginRequest } from "./msalConfig";

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
  const { instance } = useMsal();
  const [isAuthenticating, setAuthenticating] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>("");

  const authenticate = async () => {
    try {
      setAuthenticating(true);
      setAuthError("");

      let tokenResponse = await instance.handleRedirectPromise();

      let accountObj;
      if (tokenResponse) {
        accountObj = tokenResponse.account;
      } else {
        accountObj = instance.getAllAccounts()[0];
      }

      if (accountObj && tokenResponse) {
        console.log("Got valid accountObj and tokenResponse");
      } else if (accountObj) {
        console.log("User has logged in, but no tokens.");
        try {
          tokenResponse = await instance.acquireTokenSilent({
            account: instance.getAllAccounts()[0],
            ...loginRequest,
          });
        } catch (err) {
          console.error("Failed to acquireTokenSilent()", err);
          await instance.acquireTokenPopup(loginRequest);
        }
      } else {
        console.log(
          "No accountObject or tokenResponse present. User must now login."
        );
        await instance.loginPopup(loginRequest);
      }
    } catch (error) {
      console.error("Failed to handleRedirectPromise()", error);
      setAuthError(error.message);
    }

    setAuthenticating(false);
  };

  /**
   * https://stackoverflow.com/a/63892306/2077741
   */
  useEffect(() => {
    authenticate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isAuthenticating || authError) {
    return <LoginContainer content={<SignInContent error={authError} onRetry={() => authenticate()} />} />;
  }

  return (
    <>
      <AppCommon />
      {/* Below goes the controls that have fullscreen layout */}

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
          {/* <Route path={Routes.USERS} component={Users} /> */}
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
