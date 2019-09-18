import React, { useEffect, useState, createContext } from 'react';
import HomeTemplate from 'components/Templates/Common/Home';
import UserTemplate from 'components/Templates/User';
import Article from 'components/Article';
import { ArticleRes } from 'types/apiRes/article';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducer';
import { GetOne } from 'types/apiRes/user';
import userApi from 'api/user';
import { useApi } from 'hooks';
import ArticleProvider from 'context/article';

interface IProps {
  match: { params: { id: string } };
}

interface IUserContext {
  isMe: boolean;
  user: GetOne;
}

export const UserContext = createContext<IUserContext>({
  isMe: false,
  user: { id: -1, name: '', avatar: null, introduce: null },
});

export default ({
  match: {
    params: { id },
  },
}: IProps) => {
  const [articles, setArticles] = useState([]);
  const [user, setUser] = useState<GetOne | null>(null);

  const { process, loading, success } = useApi(userApi.getArticleOnCreator, 'home');
  const me = useSelector((state: AppState) => state.user);

  useEffect(() => {
    // get user info
    if (me.id === Number(id)) {
      setUser({ id: me.id, name: me.name, avatar: me.avatar, introduce: me.introduce });
    } else {
      userApi.getOne({ id });
    }
    // get article
    process({ id }).then(res => setArticles(res.data));
  }, []);

  return (
    <HomeTemplate>
      {user && (
        <UserContext.Provider value={{ isMe: me.id === Number(id), user }}>
          <UserTemplate>
            {!loading &&
              success &&
              articles.map((article: ArticleRes, index: number) => (
                <ArticleProvider key={article.id} article={article} idx={index}>
                  <Article />
                </ArticleProvider>
              ))}
          </UserTemplate>
        </UserContext.Provider>
      )}
    </HomeTemplate>
  );
};
