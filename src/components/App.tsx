import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { userApi } from 'utils/api';
import { logIn } from 'store/user/actions';
import { GetMeRes } from 'types/apiResponse';
import Routes from './Routes';

export default () => {
  // token이 있을 경우 페이지 깜빡임 문제 해결
  // GET_ME에서 데이터 모두 가져온 이후에 렌더링 하게끔
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // 처음 들어올 때 get user
  useEffect(() => {
    if (window.localStorage.getItem('token')) {
      userApi.getMe().then(({ data }: GetMeRes | { data: '' }) => {
        if (data !== '') dispatch(logIn({ user: data }));
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  return <Router>{!loading && <Routes />}</Router>;
};
