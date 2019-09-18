import React from 'react';
import AuthTemplate from 'components/Templates/Common/Auth';
import FindPasswordTemp from 'components/Templates/FindPassword';

interface IProps {
  history: { replace: (path: string) => void; goBack: () => void };
}

export default ({ history: { replace, goBack } }: IProps) => (
  <AuthTemplate>
    <FindPasswordTemp replace={replace} goBack={goBack} />
  </AuthTemplate>
);
