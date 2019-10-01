import React from 'react';
import AuthTemplate from 'components/Templates/Common/Auth';
import LogInTemplate from 'components/Templates/LogIn';
import { Helmet } from 'react-helmet';

export default () => (
  <AuthTemplate>
    <Helmet>
      <title>로그인</title>
    </Helmet>
    <LogInTemplate />
  </AuthTemplate>
);
