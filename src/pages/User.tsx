import React, { useEffect, useState, createContext } from 'react';
import HomeTemplate from 'components/Templates/Common/Home';
import UserTemplate from 'components/Templates/UserTemp';
import { ArticleRes } from 'types/apiRes/article';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from 'store/reducer';
import { Basic } from 'types/apiRes/user';
import userApi from 'api/user';
import { useApi } from 'hooks';
import ArticleProvider from 'context/article';
import Article from 'components/Article';
import { setArticleArr } from 'store/articleArr/actions';
import { Helmet } from 'react-helmet';

interface IProps {
  match: { params: { id: string } };
}

interface IUserContext {
  isMe: boolean;
  otherUser: Basic | undefined;
}

export const UserContext = createContext<IUserContext>({
  isMe: false,
  otherUser: undefined,
});

export default ({
  match: {
    params: { id },
  },
}: IProps) => {
  const { process, loading, success } = useApi(userApi.getArticleOnCreator, 'home');
  const { articleArr } = useSelector((state: AppState) => state);
  const dispatch = useDispatch();

  const [otherUser, setUser] = useState<Basic>();
  const isMe = useSelector((state: AppState) => state.user.id === Number(id));
  const myName = useSelector((state: AppState) => state.user.name);

  useEffect(() => {
    // 내가 아닐 경우에만 정보 가져오기
    if (!isMe)
      userApi.getOne({ id: Number(id) }).then(({ data }: { data: Basic }) => setUser(data));
    process({ id: Number(id) }).then((res: { data: ArticleRes[] }) =>
      dispatch(setArticleArr(res.data)),
    );
  }, []);

  return (
    <HomeTemplate>
      {(isMe || otherUser) && (
        <>
          <Helmet>
            <title>{isMe ? myName : otherUser && otherUser.name}</title>
          </Helmet>
          <UserContext.Provider value={{ isMe, otherUser }}>
            <UserTemplate>
              {!loading &&
                success &&
                articleArr.map((article: ArticleRes, index: number) => (
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
