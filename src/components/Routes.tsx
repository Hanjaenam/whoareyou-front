import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {
  LogIn,
  Register,
  FindPassword,
  ArticleList,
  User,
  UserEdit,
  OAuthCallBack,
  CreateArticle,
  ArticleEdit,
} from 'pages';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducer';

const Routes = () => {
  const isLogged = useSelector((state: AppState) => state.user.id !== -1);
  return isLogged ? (
    <Switch>
      <Route path="/user/edit" component={UserEdit} />
      <Route path="/user/:id" component={User} />
      <Route path="/new" component={CreateArticle} />
      <Route path="/edit" component={ArticleEdit} />
      <Route path="/:category" component={ArticleList} />
      <Redirect from="*" to="/latest" />
    </Switch>
  ) : (
    <Switch>
      <Route exact path="/" component={LogIn} />
      <Route path="/register" component={Register} />
      <Route path="/findPassword" component={FindPassword} />
      <Route path="/callback" component={OAuthCallBack} />
      <Route path="/user/:id" component={User} />
      <Route path="/:category" component={ArticleList} />
      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default Routes;
