import React, { useEffect, useState, createContext } from 'react';
import HomeTemplate from 'components/Templates/Common/Home';
import UserTemplate from 'components/Templates/UserTemp';
import { State as ArticleRes } from 'store/articleArr/types';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from 'store/reducer';
import { Basic } from 'types/apiRes/user';
import userApi from 'api/user';
import ArticleProvider from 'context/article';
import Article from 'components/Article';
import { setArticle, pushArticle } from 'store/articleArr/actions';
import { Helmet } from 'react-helmet';
import { ARTICLE_LIMIT } from 'constant';
import { useScrollOnLoad } from 'hooks';

interface IUserContext {
  isMe: boolean;
  otherUser: Basic | null;
}

export const UserContext = createContext<IUserContext>({
  isMe: false,
  otherUser: null,
});

interface IProps {
  match: { params: { id: string } };
}

export default ({
  match: {
    params: { id },
  },
}: IProps) => {
  const { articleArr } = useSelector((state: AppState) => state);
  const dispatch = useDispatch();

  const [otherUser, setUser] = useState<Basic | null>(null);
  const isMe = useSelector((state: AppState) => state.user.id === Number(id));
  const myName = useSelector((state: AppState) => state.user.name);

  const { page, setPage } = useScrollOnLoad(articleArr);

  useEffect(() => {
    // 내가 아닐 경우에만 정보 가져오기
    setPage(0);
    if (!isMe) {
      userApi.getOne({ id: Number(id) }).then(({ data }: { data: Basic }) => setUser(data));
    }
    userApi
      .getArticleOnCreator({ page: 0, id: Number(id) })
      .then((res: { data: ArticleRes[] }) => dispatch(setArticle(res.data)));
  }, [id]);

  useEffect(() => {
    if (page !== 0)
      userApi
        .getArticleOnCreator({ page, id: Number(id) })
        .then((res: { data: ArticleRes[] }) => dispatch(pushArticle(res.data)));
  }, [page]);

  return (
    <HomeTemplate>
      {(isMe || otherUser) && (
        <>
          <Helmet>
            <title>{isMe ? myName : otherUser && otherUser.name}</title>
          </Helmet>
          <UserContext.Provider value={{ isMe, otherUser }}>
            <UserTemplate>
              {articleArr.map((article: ArticleRes, index: number) => (
                <ArticleProvider key={article.id} index={index}>
                  <Article />
                </ArticleProvider>
              ))}
            </UserTemplate>
          </UserContext.Provider>
        </>
      )}
    </HomeTemplate>
  );
};
