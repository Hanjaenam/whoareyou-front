import React, { createContext, ReactNode } from 'react';

interface IContext {
  index: number;
}

export const ArticleContext = createContext<IContext>({ index: -1 });

interface IProps {
  children: ReactNode;
  index: number;
}

const Provider = ({ children, index }: IProps) => {
  return <ArticleContext.Provider value={{ index }}>{children}</ArticleContext.Provider>;
};

export default Provider;
