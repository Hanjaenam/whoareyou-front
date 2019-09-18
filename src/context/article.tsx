import React, { createContext, useState, ReactNode, useContext } from 'react';
import { ArticleRes } from 'types/apiRes/article';

interface IContext {
  data: ArticleRes;
  setData: React.Dispatch<React.SetStateAction<ArticleRes>>;
  index: number;
}

export const ArticleContext = createContext<IContext | null>(null);

interface IProps {
  article: ArticleRes;
  children: ReactNode;
  idx: number;
}

const Provider = ({ article, children, idx }: IProps) => {
  const [data, setData] = useState<ArticleRes>(article);
  const [index] = useState(idx);

  return (
    <ArticleContext.Provider value={{ data, index, setData }}>{children}</ArticleContext.Provider>
  );
};

export const useData = () => {
  const value = useContext(ArticleContext);
  return value ? { ...value.data, index: value.index } : null;
};

export const useFn = () => {
  const value = useContext(ArticleContext);
  return value ? value.setData : null;
};

export default Provider;
