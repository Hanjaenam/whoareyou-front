import React, { createContext, useState, ReactNode } from 'react';

interface IContext {
  index: number;
}

export const ArticleContext = createContext<IContext>({ index: -1 });

interface IProps {
  children: ReactNode;
  idx: number;
}

const Provider = ({ children, idx }: IProps) => {
  const [index] = useState(idx);

  return <ArticleContext.Provider value={{ index }}>{children}</ArticleContext.Provider>;
};

export default Provider;
