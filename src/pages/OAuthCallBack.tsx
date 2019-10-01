import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from 'store/user/actions';
import { useApiNoParms } from 'hooks';
import { Basic } from 'types/apiRes/user';
import userApi from 'api/user';

interface IProps {
  location: { search: string };
  history: { push: any; replace: any };
}

export default ({ location: { search }, history: { push, replace } }: IProps) => {
  const dispatch = useDispatch();
  const { process } = useApiNoParms(userApi.getMe);
  useEffect(() => {
    const token = search.split('=')[1];
    window.localStorage.setItem('token', token);
    process().then(({ data }: { data: Basic }) => {
      dispatch(logIn(data));
    });
  }, []);
  return null;
};
