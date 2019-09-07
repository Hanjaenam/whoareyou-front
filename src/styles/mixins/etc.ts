import { css } from 'styled-components';

export const line = css`
  height: 1px;
  background-color: ${props => props.theme.colors.secondary};
`;

export const sideLink = css`
  cursor: pointer;
  display: block;
  text-decoration: none;
  &:hover {
    background-color: ${props =>
      props.theme.colors.aside({ r: '-15', g: '-15', b: '-15' })};
  }
  &:active {
    background-color: ${props =>
      props.theme.colors.aside({ r: '-30', g: '-30', b: '-30' })};
  }
  user-select: none;
`;
