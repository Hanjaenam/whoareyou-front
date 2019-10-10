import React, { useEffect, useState } from 'react';
import HomeTemplate from 'components/Templates/Common/Home';
import ArticleTemplate from 'components/Templates/Article';
import articleApi from 'api/article';
import { State as ArticleRes } from 'store/articleArr/types';
import ArticleProvider from 'context/article';
import Article from 'components/Article';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'store/reducer';
import { pushArticle, setArticle } from 'store/articleArr/actions';
import { Helmet } from 'react-helmet';
import { useScrollOnLoad } from 'hooks';

interface IProps {
  match: {
    params: {
      category: 'latest' | 'favorite' | 'bookmark';
    };
  };
  history: {
    replace: any;
  };
}
// content length = 200
export default ({
  match: {
    params: { category },
  },
  history: { replace },
}: IProps) => {
  const { articleArr } = useSelector((state: AppState) => state);
  const isLogged = useSelector((state: AppState) => state.user.id !== -1);
  const dispatch = useDispatch();
  const { page, setPage } = useScrollOnLoad(articleArr);

  useEffect(() => {
    if (page !== 0) {
      articleApi.getAll({ page, isLogged, category }).then((res: { data: ArticleRes[] }) => {
        dispatch(pushArticle(res.data));
      });
    }
  }, [page]);

  useEffect(() => {
    setPage(0);
    if (category === 'latest' || category === 'favorite' || category === 'bookmark') {
      articleApi.getAll({ page: 0, isLogged, category }).then((res: { data: ArticleRes[] }) => {
        dispatch(setArticle(res.data));
      });
    } else {
      replace('/latest');
    }
  }, [category]);

  return (
    <HomeTemplate>
      <Helmet>
        <title>whoareyou</title>
      </Helmet>
      <ArticleTemplate>
        {articleArr.map((article: ArticleRes, index: number) => (
          <ArticleProvider key={article.id} index={index}>
            <Article />
          </ArticleProvider>
        ))}
      </ArticleTemplate>
    </HomeTemplate>
  );
};
