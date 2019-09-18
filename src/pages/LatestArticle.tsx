import React, { useEffect, useState } from 'react';
import HomeTemplate from 'components/Templates/Common/Home';
import LatestArticleTemp from 'components/Templates/LatestArticle';
import Article from 'components/Article';
import { useApiNoParms } from 'hooks';
import articleApi from 'api/article';
import { ArticleRes } from 'types/apiRes/article';
import ArticleProvider from 'context/article';

// content length = 200
export default () => {
  const [articles, setArticles] = useState([]);
  const { process, loading, success } = useApiNoParms(articleApi.getAll);

  useEffect(() => {
    process().then(res => setArticles(res.data));
  }, []);

  return (
    <HomeTemplate>
      <LatestArticleTemp>
        {!loading &&
          success &&
          articles.map((article: ArticleRes, index: number) => (
            <ArticleProvider key={article.id} article={article} idx={index}>
              <Article />
            </ArticleProvider>
          ))}
      </LatestArticleTemp>
    </HomeTemplate>
  );
};
