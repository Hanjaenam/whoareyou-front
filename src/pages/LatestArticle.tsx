import React, { useEffect } from 'react';
import HomeTemplate from 'components/Templates/Common/Home';
import LatestArticleTemp from 'components/Templates/LatestArticle';
import { useApiNoParms } from 'hooks';
import articleApi from 'api/article';
import { ArticleRes } from 'types/apiRes/article';
import ArticleProvider from 'context/article';
import Article from 'components/Article';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'store/reducer';
import { setArticleArr } from 'store/articleArr/actions';

// content length = 200
export default () => {
  const { process, loading, success } = useApiNoParms(articleApi.getAll);
  const dispatch = useDispatch();
  const { articleArr } = useSelector((state: AppState) => state);

  useEffect(() => {
    process().then((res: { data: ArticleRes[] }) => dispatch(setArticleArr(res.data)));
  }, []);

  return (
    <HomeTemplate>
      <LatestArticleTemp>
        {!loading &&
          success &&
          articleArr.map((article: ArticleRes, index: number) => (
            <ArticleProvider key={article.id} idx={index}>
              <Article />
            </ArticleProvider>
          ))}
      </LatestArticleTemp>
    </HomeTemplate>
  );
};
