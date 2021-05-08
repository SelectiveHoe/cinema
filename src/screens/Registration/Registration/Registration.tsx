import { Button, createStyles, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import TextField from '../../../component/TextFiled';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppState } from '../../../store';
import { getUserRegistrationRequest } from '../../../store/auth/actions';
import { Field, Form } from 'react-final-form';
import PhoneField from '../../../component/PhoneField';
import { UserRegistrationRequest } from '../../../common/types/user';
import { Puff } from '@agney/react-loading';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: theme.spacing(2),
  },
  loginContainer: {
    minWidth: '500px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  input: {
    minHeight: '69px',
    width:'80%',
    marginTop: theme.spacing(2),
  },
  bigInput: {
    minHeight: '90px',
    width:'80%',
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
  message: {
    minHeight: '24px',
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
  registrationResponseMessage: state.auth.userCred.registrationResponseMessage,
  isLoading: state.auth.userCred.isLoading,
});

const mapDispatchToProps = {
  getUserRegistrationRequest,
};

type Props = ReturnType<typeof mapStateToProps> &
  {
    [key in keyof typeof mapDispatchToProps]: (
      ...args: Parameters<typeof mapDispatchToProps[key]>
    ) => void;
  };

  const validate = (values: Record<string, any>) => {
    const error: {
      phone?: string;
      username?: string;
      first_name?: string;
      last_name?: string;
      password?: string;
      password_confirm?: string;
      description?: string;
      date_birth?: string;
      email?: string;
    } = {}

    if (!values.email) {
      error.email = "E-mail is required";
    }

    if (!values.date_birth) {
      error.date_birth = "Birth date is required.";
    }

    if (values.description && values.description.length > 150) {
      error.description = "Description bigger then 150."
    }

    if (!values.password_confirm) {
      error.password_confirm = 'Password is required.';
    } else {
      if (values.password_confirm !== values.password) {
        error.password_confirm = 'Password mismatch.';
      }
    }

    if (!values.password) {
      error.password = 'Password is required.';
    } else {
      if (values.password.length < 5) {
        error.password = 'Password less then 5.';
      }
      if (values.password.length > 150) {
        error.password = 'Password bigger then 150.';
      }
    }

    if (!values.last_name) {
      error.last_name = 'Last name is required.';
    } else {
      if (values.last_name.length < 1) {
        error.last_name = 'Last name less then 1.';
      }
      if (values.last_name.length > 150) {
        error.last_name = 'Last name bigger then 150.';
      }
    }

    if (!values.first_name) {
      error.first_name = 'First name is required.';
    } else {
      if (values.first_name.length < 1) {
        error.first_name = 'First name less then 1.';
      }
      if (values.first_name.length > 150) {
        error.first_name = 'First name bigger then 150.';
      }
    }

    if (!values.username) {
      error.username = 'User name is required.';
    } else {
      if (values.username.length < 1) {
        error.username = 'User name less then 1.';
      }
      if (values.username.length > 150) {
        error.username = 'User name bigger then 150.';
      }
    }

    if (!values.phone) {
      error.phone = 'Phone number is required.';
    } else {
      if (values.phone.length > 19) {
        error.phone = 'Phone number bigger then 13.';
      }
      if (values.phone.length < 9) {
        error.phone = 'Phone number less then 9.';
      }
    }

    return error;
  }

const Registration: React.FC<Props> = ({ user, registrationResponseMessage, isLoading, getUserRegistrationRequest }) => {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    if (!isLoading && user) {
      history.push('/main');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, user])

  const submit = (values: UserRegistrationRequest) => {
    values.history = history;
    getUserRegistrationRequest(values);
  }

  return (
    <div className={classes.root}>
      <Paper elevation={3} >
        <Form
          onSubmit={submit}
          validate={validate}
          render={({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit} className={classes.loginContainer}>
              <Typography variant="h4">
                Registration
              </Typography>
              <Typography variant="subtitle1">
                Please fill in all fields.
              </Typography>
              <Field
              name="username"
              component={TextField}
              InnerInputProps={{
                fullWidth: true,
                label: 'UserName',
                className: classes.input,
              }}/>
              <Field
              name="first_name"
              component={TextField}
              InnerInputProps={{
                fullWidth: true,
                label: 'First name',
                className: classes.input,
              }}/>
              <Field
              name="last_name"
              component={TextField}
              InnerInputProps={{
                fullWidth: true,
                label: 'Last name',
                className: classes.input,
              }}/>
              <Field
              name="email"
              component={TextField}
              InnerInputProps={{
                fullWidth: true,
                label: 'E-mail',
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
              <Field
              name="password_confirm"
              component={TextField}
              InnerInputProps={{
                fullWidth: true,
                type: 'password',
                label: 'Confirm password',
                className: classes.input,
              }}/>
              <Field
              name="phone"
              component={PhoneField}
              InnerInputProps={{
                defaultCountry: 'ua',
                fullWidth: true,
                label: 'Phone',
                className: classes.input,
              }}/>
              <Field
              name="description"
              component={TextField}
              InnerInputProps={{
                fullWidth: true,
                label: 'Description',
                className: classes.bigInput,
                multiline: true,
                rows: 2,
              }}/>
              <Field
              name="date_birth"
              component={TextField}
              InnerInputProps={{
                fullWidth: true,
                label: 'Birth date',
                className: classes.input,
                type: "date",
                InputLabelProps: {
                  shrink: true,
                },
              }}/>

            <Typography color="primary" className={classes.message}>
              {registrationResponseMessage}
            </Typography>

              <div className={classes.btnContainer}>
                <Button variant="text" onClick={() => history.push('/login')}>cancel</Button>
                <div className={classes.submitContainer}>
                  <div className={classes.submitContainer}>
                    {isLoading ? <Puff/> : <></>}
                  </div>
                  <Button variant="outlined" color="primary" type="submit" disabled={submitting}>Registration</Button>
                </div>
              </div>
            </form>
          )}
        />
      </Paper>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
