import React from 'react';
import HomeTemplate from 'components/Templates/Home';
import ArticleTemplate from 'components/Templates/Article';
import Article from 'components/Article';

// content length = 200
export default () => (
  <HomeTemplate>
    <ArticleTemplate>
      <Article
        id="1"
        author="author"
        authorAvt={null}
        content="contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent"
        files={['https://cdn.pixabay.com/photo/2015/12/22/04/00/photo-1103595_960_720.png']}
        likeNumber={20}
        commentNumber={9}
        isLiked={false}
        isBookmarked
        createdAt="2개월 전"
        comments={[{ id: '1', author: 'comment author', content: 'comment' }]}
      />
      <Article
        id="1"
        author="author"
        authorAvt={null}
        content="contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent"
        files={['https://cdn.pixabay.com/photo/2015/12/22/04/00/photo-1103595_960_720.png']}
        likeNumber={20}
        commentNumber={9}
        isLiked={false}
        isBookmarked
        createdAt="2개월 전"
        comments={[{ id: '1', author: 'comment author', content: 'comment' }]}
      />
      <Article
        id="1"
        author="author"
        authorAvt={null}
        content="contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent"
        files={['https://cdn.pixabay.com/photo/2015/12/22/04/00/photo-1103595_960_720.png']}
        likeNumber={20}
        commentNumber={9}
        isLiked={false}
        isBookmarked
        createdAt="2개월 전"
        comments={[{ id: '1', author: 'comment author', content: 'comment' }]}
      />
      <Article
        id="1"
        author="author"
        authorAvt={null}
        content="contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent"
        files={['https://cdn.pixabay.com/photo/2015/12/22/04/00/photo-1103595_960_720.png']}
        likeNumber={20}
        commentNumber={9}
        isLiked={false}
        isBookmarked
        createdAt="2개월 전"
        comments={[{ id: '1', author: 'comment author', content: 'comment' }]}
      />
      <Article
        id="1"
        author="author"
        authorAvt={null}
        content="contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent"
        files={['https://cdn.pixabay.com/photo/2015/12/22/04/00/photo-1103595_960_720.png']}
        likeNumber={20}
        commentNumber={9}
        isLiked={false}
        isBookmarked
        createdAt="2개월 전"
        comments={[{ id: '1', author: 'comment author', content: 'comment' }]}
      />
    </ArticleTemplate>
  </HomeTemplate>
);
