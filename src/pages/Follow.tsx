import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { Follow } from 'types/apiRes/user';
import { useApiNoParms } from 'hooks';
import HomeTemplate from 'components/Templates/Common/Home';
import User from 'components/Follow/User';
import userApi from 'api/user';
import Loader from 'components/Common/Loader';

const Container = styled.div`
  max-width: ${props => props.theme.breakpoints.md};
  margin: 75px auto;
  padding: ${props => props.theme.gap.small} ${props => props.theme.gap.medium};
  background-color: white;
  border-radius: ${props => props.theme.borderRadius.basic};
  @media screen and (max-width: ${props => props.theme.breakpoints.md}) {
    margin-top: 0;
    width: 100%;
  }
`;

export default () => {
  const { loading, process } = useApiNoParms(userApi.getAll);
  const [datas, setDatas] = useState<Follow[]>([]);
  useEffect(() => {
    process().then(res => setDatas(res.data));
  }, []);
  return (
    <HomeTemplate>
      <Helmet>whoareyou</Helmet>
      <Container>
        {loading ? (
          <Loader />
        ) : (
          datas.map(data => (
            <User
              key={data.id}
              id={data.id}
              name={data.name}
              avatar={data.avatar}
              introduce={data.introduce}
              isFollow={data.isFollow}
            />
          ))
        )}
      </Container>
    </HomeTemplate>
  );
};
