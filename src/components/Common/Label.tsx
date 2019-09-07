import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface IProps {
  htmlFor: string;
  label: string;
  children: ReactNode;
  className?: string;
}

const LabelContainer = styled.div`
  display: grid;
  grid-template-columns: 25% 75%;
  justify-items: flex-start;
`;

const Label = styled.div`
  margin-top: ${props => props.theme.gap.tiny};
  margin-right: ${props => props.theme.gap.large};
  justify-self: flex-end;
`;
const ChildrenContainer = styled.div`
  > input,
  > textarea {
    text-align: left;
    width: 100%;
    max-width: 355px;
    min-width: 330px;
  }
`;

export default ({ htmlFor, label, children, className }: IProps) => (
  <LabelContainer className={className}>
    <Label>
      <label htmlFor={htmlFor}>{label}</label>
    </Label>
    <ChildrenContainer>{children}</ChildrenContainer>
  </LabelContainer>
);

// display: block;
// width: 330px;
// margin: 0 auto;
// > div {
//   margin-right: 0;
//   margin-top: 0;
//   margin-bottom: ${props => props.theme.gap.small};
//   text-align: left;
// }
// > input,
// > textarea {
//   width: 330px;
// }
