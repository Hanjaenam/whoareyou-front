import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Search } from 'types/apiRes/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TempAvatar from 'assets/avatar.png';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  width: 340px;
  position: absolute;
  top: ${props => `calc(${props.theme.height.header} - 5px)`};
  left: -20px;
  @media screen and (max-width: ${props => props.theme.breakpoints.md}) {
    width: 270px;
  }
  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 100%;
    left: 0;
  }
`;

const Shadow = styled.div`
  box-shadow: ${props => props.theme.boxShadow};
  height: 14px;
  left: 0;
  margin: auto;
  right: 0;
  top: -6px;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  width: 14px;
  z-index: -1;
  position: absolute;
`;

const Result = styled.div`
  max-height: 380px;
  overflow: scroll;
  background-color: white;
  border-radius: ${props => props.theme.borderRadius.basic};
  box-shadow: ${props => props.theme.boxShadow};
  &::after {
    content: '';
    border-color: transparent transparent #fff;
    border-style: solid;
    border-width: 0 7.5px 7.5px;
    top: -7.5px;
    height: 0;
    width: 0;
    z-index: 3;
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
  }
`;

const NoData = styled.div`
  text-align: center;
  padding: ${props => props.theme.gap.medium};
  span {
    color: #999999;
  }
`;

const User = styled(Link)`
  padding: ${props => props.theme.gap.tiny} ${props => props.theme.gap.small};
  display: flex;
  text-decoration: none;
  align-items: center;
  &:hover {
    background-color: #fafafa;
  }
`;

const Avatar = styled.div`
  > img {
    width: 60px;
    height: 60px;
    border-radius: ${props => props.theme.borderRadius.avatar};
  }
`;

const Right = styled.div`
  margin-left: ${props => props.theme.gap.tiny};
`;

const Name = styled.p`
  font-weight: bold;
  font-size: 14px;
`;

const Introduce = styled.p`
  font-size: ${props => props.theme.fontSize.small};
  margin-top: ${props => props.theme.gap.tiny};
  color: #999;
`;

const ExitIcon = styled.div`
  position: absolute;
  padding: 5px;
  top: 0;
  right: 0;
  cursor: pointer;
`;

interface IProps {
  result: [Search] | [];
  initResult: () => void;
  setFocusing: React.Dispatch<React.SetStateAction<boolean>>;
}

export default ({ result, initResult, setFocusing }: IProps) => (
  <Container onMouseEnter={() => setFocusing(true)} onMouseLeave={() => setFocusing(false)}>
    <Shadow />
    <Result>
      {result.length === 0 ? (
        <NoData>
          <span>검색 결과가 없습니다.</span>
        </NoData>
      ) : (
        result.map(data => (
          <User to={`/user/${data.id}`} key={data.id} onClick={initResult}>
            <Avatar>
              <img src={data.avatar || TempAvatar} alt="프로필사진" />
            </Avatar>
            <Right>
              <Name>{data.name}</Name>
              <Introduce>{data.introduce}</Introduce>
            </Right>
          </User>
        ))
      )}
      <ExitIcon
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          e.stopPropagation();
          initResult();
        }}
      >
        <FontAwesomeIcon icon={faTimes} />
      </ExitIcon>
    </Result>
  </Container>
);
