import React from 'react';
import AuthTemplate from 'components/Templates/Common/Auth';
import RegisterTemplate from 'components/Templates/Register';

export default () => {
  return (
    <AuthTemplate>
      <RegisterTemplate />
    </AuthTemplate>
  );
};
