import { useEffect } from 'react';
import { userApi } from 'utils/api';
import { useDispatch } from 'react-redux';
import { logIn } from 'store/user/actions';
import { useApi2 } from 'hooks';
import { GetMeRes } from 'types/apiResponse';

interface IProps {
  location: { search: string };
}

export default ({ location: { search } }: IProps) => {
  const dispatch = useDispatch();
  const { process, loading, success } = useApi2(userApi.getMe);
  useEffect(() => {
    const token = search.split('=')[1];
    window.localStorage.setItem('token', token);
    process()
      .then(({ data }: { data: GetMeRes }) => dispatch(logIn(data)))
      .catch();
  }, []);
  return null;
};
