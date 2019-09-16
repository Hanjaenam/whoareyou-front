import React from 'react';
import styled from 'styled-components';
import { blueColorClick } from 'styles/mixins/etc';

interface IProps {
  creator: string;
  content: string;
}

const Container = styled.div`
  display: flex;
  & + & {
    margin-top: ${props => props.theme.gap.tiny};
  }
`;

const Author = styled.p`
  color: ${props => props.theme.colors.blue};
  margin-right: ${props => props.theme.gap.tiny};
  ${blueColorClick}
`;

const Comment = styled.p``;

export default ({ creator, content }: IProps) => (
  <Container>
    <Author>{creator}</Author>
    <Comment>{content}</Comment>
  </Container>
);
