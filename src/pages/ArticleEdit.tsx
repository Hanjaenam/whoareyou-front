import React from 'react';
import HomeTemplate from 'components/Templates/Common/Home';
import CreateArticle from 'components/Templates/CreateArticle';

interface IProps {
  history: {
    goBack: () => void;
  };
}

export default ({ history: { goBack } }: IProps) => (
  <HomeTemplate>
    <CreateArticle goBack={goBack} edit />
  </HomeTemplate>
);
