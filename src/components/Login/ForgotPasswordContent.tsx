import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  TextField,
  Typography,
} from "@material-ui/core";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import { useHistory } from "react-router-dom";
import VerifyContent from "./VerifyContent";
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
}

const ForgotPasswordContent: React.FunctionComponent = () => {
  const history = useHistory();
  const classes = useStyles();
  const [email, setEmail] = useState<string>();

  if (email) {
    return <VerifyContent email={email} />;
  }

  return (
    <Box className={classes.form}>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          email: "",
        }}
        validate={(values: FormValues) => {
          const errors: Partial<FormValues> = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(values: FormValues) => {
          setTimeout(() => {
            setEmail(values.email);
          }, 1500);
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <Box mb={2}>
              <Typography align="center">
                Please enter your email address and a password reset link will
                be sent to you.
              </Typography>
            </Box>
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
              Send
            </Button>
            <Grid container className={classes.btnsGrid}>
              <Grid item xs>
                <Button onClick={() => history.push(Routes.SIGN_IN)}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ForgotPasswordContent;
