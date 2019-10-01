import React from 'react';
import AuthTemplate from 'components/Templates/Common/Auth';
import RegisterTemplate from 'components/Templates/Register';
import { Helmet } from 'react-helmet';

export default () => (
  <AuthTemplate>
    <Helmet>
      <title>비밀번호 복구</title>
    </Helmet>
    <RegisterTemplate />
  </AuthTemplate>
);
