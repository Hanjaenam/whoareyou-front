import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { articleContainer } from 'styles/mixins/etc';

interface IProps {
  children: ReactNode;
}

const Container = styled.div`
  ${articleContainer};
`;

export default ({ children }: IProps) => <Container>{children}</Container>;
