import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { LogIn, Register, FindPassword, LatestArticle, User, UserEdit, OAuthCallBack } from 'pages';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducer';

export default () => {
  const isLogged = useSelector((state: AppState) => state.user.email) !== '';
  return isLogged ? (
    <Switch>
      <Route exact path="/" component={LatestArticle} />
      <Route path="/user/:id/edit" component={UserEdit} />
      <Route path="/user/:id" component={User} />
      <Redirect from="*" to="/" />
    </Switch>
  ) : (
    <Switch>
      <Route exact path="/" component={LogIn} />
      <Route path="/register" component={Register} />
      <Route path="/findPassword" component={FindPassword} />
      <Route path="/latest" component={LatestArticle} />
      <Route path="/callback" component={OAuthCallBack} />
      <Redirect from="*" to="/" />
    </Switch>
  );
};
