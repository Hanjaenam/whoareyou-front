import React, { useEffect } from 'react';
import HomeTemplate from 'components/Templates/Common/Home';
import LatestArticleTemp from 'components/Templates/LatestArticle';
import { useApi } from 'hooks';
import articleApi from 'api/article';
import { ArticleRes } from 'types/apiRes/article';
import ArticleProvider from 'context/article';
import Article from 'components/Article';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'store/reducer';
import { setArticleArr } from 'store/articleArr/actions';

interface IProps {
  match: {
    params: {
      category: 'latest' | 'favorite' | 'bookmark';
    };
  };
}
// content length = 200
export default ({
  match: {
    params: { category = 'latest' },
  },
}: IProps) => {
  const { process, loading, success } = useApi(articleApi.getAll, 'home');
  const dispatch = useDispatch();
  const { articleArr } = useSelector((state: AppState) => state);

  useEffect(() => {
    process({ category }).then((res: { data: ArticleRes[] }) => dispatch(setArticleArr(res.data)));
  }, [category]);

  return (
    <HomeTemplate>
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
  );
};
