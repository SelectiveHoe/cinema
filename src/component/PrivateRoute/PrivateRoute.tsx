import React from 'react';
import {RouteProps, Redirect, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {Box, CircularProgress} from '@material-ui/core';
import { AppState } from '../../store';

const mapStateToProps = (state: AppState) => ({
  user: state.auth.userCred,
});

export type PrivateRouteProps = RouteProps & ReturnType<typeof mapStateToProps>;

const PrivateRoute = ({user, ...routeProps}: PrivateRouteProps) => {
  if (!user.isGetUserCredLoading) {
    return user.currUser ? (
      <Route {...routeProps} />
    ) : (
      <Redirect to={"/login"} />
    );
  }

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress />
    </Box>
  );
};

export default connect(mapStateToProps)(PrivateRoute);
