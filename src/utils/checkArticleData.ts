import { useContext } from 'react';
import { ArticleContext } from 'context/article';

export default () => {
  const data = useContext(ArticleContext);
  if (data === null) return null;
};
