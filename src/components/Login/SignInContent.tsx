import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  TextField,
  Typography,
} from "@material-ui/core";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import { useHistory } from "react-router-dom";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import Routes from "../../constants/Routes";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(8),
  },
  submitBtn: {
    marginTop: theme.spacing(2),
  },
  btnsGrid: {
    marginTop: theme.spacing(2),
  },
  errorMessage: {
    color: "red",
  },
}));

interface FormValues {
  email: string;
  password: string;
}

const SignInContent: React.FunctionComponent = () => {
  const history = useHistory();
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState<boolean>();

  return (
    <Box className={classes.form}>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          email: "",
          password: "",
        }}
        validate={(values: FormValues) => {
          const errors: Partial<FormValues> = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          } else if (!values.password) {
            errors.password = "Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            // alert(JSON.stringify(values, null, 2));
            history.push(Routes.SCENES);
          }, 1500);
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <Field name="email">
              {({ field }: FieldProps) => (
                <TextField
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  autoComplete="email"
                  fullWidth
                  autoFocus
                  {...field}
                />
              )}
            </Field>
            <ErrorMessage name="email">
              {(msg) => (
                <Typography className={classes.errorMessage} variant="body2">
                  {msg}
                </Typography>
              )}
            </ErrorMessage>

            <Field name="password">
              {({ field }: FieldProps) => (
                <TextField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  margin="normal"
                  autoComplete="current-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  {...field}
                />
              )}
            </Field>
            <ErrorMessage name="password">
              {(msg) => (
                <Typography className={classes.errorMessage} variant="body2">
                  {msg}
                </Typography>
              )}
            </ErrorMessage>

            {isSubmitting && <LinearProgress />}
            <br />
            <Button
              className={classes.submitBtn}
              variant="contained"
              color="primary"
              size="large"
              disabled={isSubmitting}
              onClick={submitForm}
              fullWidth
            >
              Sign In
            </Button>

            <Grid container className={classes.btnsGrid}>
              <Grid item xs>
                <Button onClick={() => history.push(Routes.FORGOT_PASSWORD)}>
                  Forgot Password
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default SignInContent;
