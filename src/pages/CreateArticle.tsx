import React from 'react';
import HomeTemplate from 'components/Templates/Common/Home';
import CreateArticle from 'components/Templates/CreateArticle';
import { Helmet } from 'react-helmet';

interface IProps {
  history: {
    goBack: () => void;
  };
}

export default ({ history: { goBack } }: IProps) => (
  <HomeTemplate>
    <Helmet>
      <title>새 글</title>
    </Helmet>
    <CreateArticle goBack={goBack} />
  </HomeTemplate>
);
