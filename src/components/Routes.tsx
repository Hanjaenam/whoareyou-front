import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { LogIn, Register, FindPassword, Home, User, UserEdit } from 'pages';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducer';

export default () => {
  const isLogged = useSelector((state: AppState) => state.user.email) !== '';
  return isLogged ? (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/user/:id/edit" component={UserEdit} />
      <Route path="/user/:id" component={User} />
      <Redirect from="*" to="/" />
    </Switch>
  ) : (
    <Switch>
      <Route exact path="/" component={LogIn} />
      <Route path="/register" component={Register} />
      <Route path="/article" component={Home} />
      <Route path="/findPassword" component={FindPassword} />
      <Redirect from="*" to="/" />
    </Switch>
  );
};
