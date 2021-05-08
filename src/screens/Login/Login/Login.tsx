import { Button, createStyles, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import TextField from '../../../component/TextFiled';
import {connect} from 'react-redux';
import React, { useEffect } from 'react';
import { getUserLoginRequest } from '../../../store/auth/actions';
import { Field, Form } from 'react-final-form';
import { useHistory } from 'react-router-dom';
import { Puff } from '@agney/react-loading';
import { UserLoginRequest } from '../../../common/types/user';
import { AppState } from '../../../store';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    maxWidth: '500px',
    width: '500px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  btnContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: theme.spacing(2),
  },
  input: {
    height: '69px',
    width:'80%',
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
  form: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    minHeight: '24px',
  },
  bottomSpace: {
    marginBottom: theme.spacing(2),
  },
  submitContainer: {
    minWidth: '31px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    "& svg": {
      width: '15px',
      marginRight: theme.spacing(2),
      color: theme.palette.primary.main,
    }
  },
}));

const mapStateToProps = (state: AppState) => ({
  user: state.auth.userCred.currUser,
  responseMessage: state.auth.userCred.responseMessage,
  isLoading: state.auth.userCred.isLoading,
});

const mapDispatchToProps = {
  getUserLoginRequest
};

type Props = ReturnType<typeof mapStateToProps> &
  {
    [key in keyof typeof mapDispatchToProps]: (
      ...args: Parameters<typeof mapDispatchToProps[key]>
    ) => void;
  };

const Login: React.FC<Props> = ({ getUserLoginRequest, isLoading, responseMessage, user }) => {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    if (!isLoading && user) {
      history.push('/main');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, user])

  const onSubmit = (values: UserLoginRequest) => {
    getUserLoginRequest(values);
  }

  const validate = (values: Record<string, any>) => {
    const errors: {
      username?: string;
      password?: string;
    } = {};

    if (!values.username) {
      errors.username = "Login is required.";
    } else {
      if (values.username.length > 150) {
        errors.username = "Can't be bigger than 150 symbols.";
      }
      if (values.username.length < 5) {
        errors.username = "Can't be less than 1 symbols.";
      }
    }
 
    if (!values.password) {
      errors.password = "Password is required.";
    } else {
      if (values.password.length > 128) {
        errors.password = "Can't be bigger than 128 symbols.";
      }
      if (values.password.length < 5) {
        errors.password = "Can't be less than 1 symbols.";
      }
    }

    return errors
  }

  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.loginContainer}>
      <Form 
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit} className={classes.form}>
            <Typography variant="h4">
              Login
            </Typography>
            <Typography variant="subtitle1" className={classes.bottomSpace}>
              Please enter username or email and password.
            </Typography>
            <Field
              name="username"
              component={TextField}
              InnerInputProps={{
                fullWidth: true,
                label: 'UserName or E-mail',
                className: classes.input,
              }}/>
            <Field
              name="password"
              component={TextField}
              InnerInputProps={{
                fullWidth: true,
                type: 'password',
                label: 'Password',
                className: classes.input,
              }}/>
            <Typography color="primary" className={classes.message}>
              {responseMessage}
            </Typography>
            <div className={classes.btnContainer}>
              <Button variant="text" onClick={() => history.push('/registration')}>Registration</Button>
              <div className={classes.submitContainer}>
                <div className={classes.submitContainer}>
                  {isLoading ? <Puff/> : <></>}
                </div>
                <Button variant="outlined" color="primary" disabled={submitting} type="submit">Log-in</Button>
              </div>
            </div>
          </form>
        )}/>
      </Paper>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
