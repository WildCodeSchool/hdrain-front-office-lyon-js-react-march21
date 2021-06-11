/* eslint-disable no-alert */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
// import { useHistory } from 'react-router';
import { useToasts } from 'react-toast-notifications';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Alert from '@material-ui/lab/Alert';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// import axios from 'axios';
import API from '../APIClient';

// require('dotenv').config();

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginForm() {
  const classes = useStyles();

  const { addToast } = useToasts();

  const [loginError, setLoginError] = useState(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = ({ username, password }) => {
    API.post(`/auth/login`, { username, password })
      .then(() => {
        addToast('Successfully logged in', { appearance: 'success' });
      })
      .catch((err) => {
        console.log(err);
        addToast('Wrong Credentials', { appearance: 'error' });
      });
    setLoginError(null);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          {loginError && (
            <div>
              <Alert severity="error">{loginError}</Alert>
            </div>
          )}
          <Controller
            name="username"
            control={control}
            rules={{ required: { value: true, message: 'Required' } }}
            render={({ field }) => (
              <TextField
                inputProps={field}
                error={!!errors.username}
                helperText={errors.username ? errors.username.message : ''}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{
              minLength: {
                value: 1,
                message: 'should be at least 8 characters',
              },
            }}
            render={({ field }) => (
              <TextField
                type="password"
                inputProps={field}
                error={!!errors.username}
                helperText={errors.password ? errors.password.message : ''}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                id="password"
                autoComplete="current-password"
              />
            )}
          />

          <Controller
            name="stayConnected"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox {...field} name="checkedB" color="primary" />
                }
                label="Remember me"
              />
            )}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log In
          </Button>
        </form>
      </div>
    </Container>
  );
}
