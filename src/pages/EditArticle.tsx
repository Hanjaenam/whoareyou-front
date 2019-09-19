import React from 'react';
import HomeTemplate from 'components/Templates/Common/Home';
import UpdateArticle from 'components/Templates/UpdateArticle';

interface IProps {
  history: {
    goBack: () => void;
  };
}

export default ({ history: { goBack } }: IProps) => (
  <HomeTemplate>
    <UpdateArticle goBack={goBack} edit />
  </HomeTemplate>
);
