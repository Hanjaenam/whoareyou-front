import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from 'store/reducer';
import { setEditType } from 'store/userEdit/actions';
import { opacityEffect } from 'styles/mixins/etc';

interface IProps {
  children: ReactNode;
}

const Container = styled.div`
  display: flex;
  max-width: 935px;
  width: 95%;
  margin: 0 auto;
  background-color: white;
  border: 1px solid ${props => props.theme.colors.secondary};
  margin-top: ${props => props.theme.gap.large};
  border-radius: ${props => props.theme.borderRadius.basic};
  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 100%;
    border-left: 0;
    border-right: 0;
    border-radius: 0;
  }
`;

const Aside = styled.ul`
  border-right: 1px solid ${props => props.theme.colors.secondary};
`;

const Item = styled.li`
  cursor: pointer;
  width: 125px;
`;

const Text = styled.p<{ active: boolean }>`
  user-select: none;
  padding: ${props => props.theme.gap.medium};
  box-sizing: border-box;
  border-right: 2px solid transparent;
  ${opacityEffect};
  ${props =>
    props.active
      ? css`
          opacity: 1;
          color: ${props.theme.colors.font};
          border-right: 3px solid ${props.theme.colors.main};
        `
      : css`
          &:hover {
            background-color: ${props.theme.colors.secondary};
            border-right: 3px solid ${props.theme.colors.main};
          }
        `};
  @media screen and (max-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.gap.small};
  }
`;

export default ({ children }: IProps) => {
  const { editType } = useSelector((state: AppState) => state.userEdit);
  const dispatch = useDispatch();
  return (
    <Container>
      <Aside>
        <Item>
          <Text active={editType === 'profile'} onClick={() => dispatch(setEditType('profile'))}>
            프로필 수정
          </Text>
        </Item>
        <Item>
          <Text active={editType === 'password'} onClick={() => dispatch(setEditType('password'))}>
            비밀번호 변경
          </Text>
        </Item>
      </Aside>
      {children}
    </Container>
  );
};
