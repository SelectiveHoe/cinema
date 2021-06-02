import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from '../../Login';
import Drawer from '../../Drawer';
import Registration from '../../Registration';

type Props = {};

const MainLayout: React.FC<Props> = () => {

  return (
    <div style={{ backgroundColor: '#2b2b2b', minWidth: '100vh', minHeight: '110vh', display: 'flex' }}>
      <Switch>
        <Route
        exact
        path={"/Login"}
        component={Login}
        />
        <Route path={"/main"} component={Drawer}/>
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
