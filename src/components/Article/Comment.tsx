import React from 'react';
import styled from 'styled-components';
import { blueColorClick } from 'styles/mixins/etc';

interface IProps {
  author: string;
  content: string;
}

const Container = styled.div`
  display: flex;
  padding: ${props => props.theme.gap.small};
  background-color: ${props => props.theme.colors.aside()};
  border-radius: ${props => props.theme.borderRadius.comment};
  border: 1px solid white;
`;

const Author = styled.p`
  color: ${props => props.theme.colors.blue};
  margin-right: ${props => props.theme.gap.tiny};
  ${blueColorClick}
`;

const Comment = styled.p``;

export default ({ author, content }: IProps) => (
  <Container>
    <Author>{author}</Author>
    <Comment>{content}</Comment>
  </Container>
);
