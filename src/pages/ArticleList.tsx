import React, { useEffect, useState } from 'react';
import HomeTemplate from 'components/Templates/Common/Home';
import LatestArticleTemp from 'components/Templates/LatestArticle';
import { useApi } from 'hooks';
import articleApi from 'api/article';
import { State as ArticleRes } from 'store/articleArr/types';
import ArticleProvider from 'context/article';
import Article from 'components/Article';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'store/reducer';
import { setArticleArr } from 'store/articleArr/actions';
import { Helmet } from 'react-helmet';

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
    params: { category = 'latest' },
  },
  history: { replace },
}: IProps) => {
  const { process, loading, success } = useApi(articleApi.getAll, 'home');
  const { articleArr } = useSelector((state: AppState) => state);
  const [page, setPage] = useState(0);
  const isLogged = useSelector((state: AppState) => state.user.id !== -1);
  const dispatch = useDispatch();

  useEffect(() => {
    if (category === 'latest' || category === 'favorite' || category === 'bookmark') {
      process({ page, isLogged, category }).then((res: { data: ArticleRes[] }) => {
        dispatch(setArticleArr(res.data));
      });
    } else {
      replace('/latest');
    }
  }, [category]);

  const onScroll = () => {
    const { scrollHeight, clientHeight } = document.body;
    const { scrollY } = window;
    const loadPoint = scrollHeight - clientHeight - 100;
    if (loadPoint <= scrollY) setPage(page + 1);
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return category === 'latest' || category === 'favorite' || category === 'bookmark' ? (
    <HomeTemplate>
      <Helmet>
        <title>whoareyou</title>
      </Helmet>
      <LatestArticleTemp>
        {!loading && success
          ? articleArr.map((article: ArticleRes, index: number) => (
              <ArticleProvider key={article.id} index={index}>
                <Article />
              </ArticleProvider>
            ))
          : null}
      </LatestArticleTemp>
    </HomeTemplate>
  ) : null;
};
