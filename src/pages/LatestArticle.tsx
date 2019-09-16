import React, { useEffect, useState } from 'react';
import HomeTemplate from 'components/Templates/Home';
import ArticleTemplate from 'components/Templates/Article';
import Article from 'components/Article';
import { useApi2 } from 'hooks';
import { articleApi } from 'utils/api';
import { ArticleRes } from 'types/apiResponse';

// content length = 200
export default () => {
  const { process, loading, success } = useApi2(articleApi.getAll);
  const [articles, setArticles] = useState<ArticleRes[]>([]);
  useEffect(() => {
    process().then(res => setArticles(res.data));
  }, []);
  return (
    <HomeTemplate>
      <ArticleTemplate>
        {!loading &&
          success &&
          articles.map(article => (
            <Article
              key={article.id}
              id={article.id}
              creatorAvt={article.creator.avatar}
              creator={article.creator.name}
              photos={article.photos}
              content={article.content}
              createdAt={article.createdAt}
              likeNumber={article.likeNumber}
              commentNumber={article.commentNumber}
              comments={article.comments}
              isLiked={article.isLiked}
              isBookmarked={article.isBookmarked}
            />
          ))}
      </ArticleTemplate>
    </HomeTemplate>
  );
};
