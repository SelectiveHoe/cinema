import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { PrivateRoute } from '../../../component/PrivateRoute';
import Login from '../../Login';
import Drawer from '../../Drawer';
import Registration from '../../Registration';

type Props = {};

const MainLayout: React.FC<Props> = () => {

  return (
    <div style={{ backgroundColor: '#2b2b2b', minWidth: '100vh', minHeight: '100vh', display: 'flex' }}>
      <Switch>
        <Route
        exact
        path={"/Login"}
        component={Login}
        />
        <PrivateRoute path={"/main"} component={Drawer}/>
        <Route
        exact
        path={"/Registration"}
        component={Registration}
        />
        <Redirect
        to={"/Login"}
        />
      </Switch>
    </div>
  );
};

export default MainLayout;