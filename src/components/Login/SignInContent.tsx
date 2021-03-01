import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  TextField,
  Typography,
} from '@material-ui/core';
import { Formik, Form, Field, ErrorMessage, FieldProps } from 'formik';
import { useHistory } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import Routes from '../../constants/Routes';
import { RootState } from '../../redux/RootReducer';
import { performAdminLogin } from '../../redux/slice/AdminSlice';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(8),
  },
  submitBtn: {
    marginTop: theme.spacing(2),
  },
  btnsGrid: {
    marginTop: theme.spacing(2),
  },
  errorMessage: {
    color: 'red',
  },
}));

interface FormValues {
  email: string;
  password: string;
}

const SignInContent: React.FunctionComponent = () => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { success, isLoading, errors } = useSelector(
    (state: RootState) => state.admin
  );
  const [showPassword, setShowPassword] = useState<boolean>();

  useEffect(() => {
    if (success) {
      history.push(Routes.SCENES);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  return (
    <Box className={classes.form}>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          email: 'testmail0001@mailnesia.com',
          password: 'test123',
        }}
        validate={(values: FormValues) => {
          const validationErrors: Partial<FormValues> = {};
          if (!values.email) {
            validationErrors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
          ) {
            validationErrors.email = 'Invalid email address';
          } else if (!values.password) {
            validationErrors.password = 'Required';
          }
          return validationErrors;
        }}
        onSubmit={(values) => {
          dispatch(
            performAdminLogin({
              username: values.email,
              password: values.password,
            })
          );
        }}
      >
        {({ submitForm }) => (
          <Form>
            <Field name="email">
              {({ field }: FieldProps) => (
                <TextField
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  autoComplete="email"
                  disabled={isLoading}
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
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  margin="normal"
                  autoComplete="current-password"
                  disabled={isLoading}
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

            {isLoading && <LinearProgress />}
            {errors && errors.length > 0 && (
              <Typography className={classes.errorMessage}>
                {errors[0]}
              </Typography>
            )}
            <br />
            <Button
              className={classes.submitBtn}
              variant="contained"
              color="primary"
              size="large"
              disabled={isLoading}
              onClick={submitForm}
              fullWidth
            >
              Sign In
            </Button>

            <Grid container className={classes.btnsGrid}>
              <Grid item xs>
                <Button
                  disabled
                  onClick={() => history.push(Routes.FORGOT_PASSWORD)}
                >
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
