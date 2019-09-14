import { css } from 'styled-components';
import { myTheme } from 'styles/theme';

export const line = css`
  height: 1px;
  background-color: ${props => props.theme.colors.secondary};
`;

export const opacityEffect = css`
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
  &:active {
    opacity: 0.8;
  }
`;

export const LinkStyle = css`
  cursor: pointer;
  text-decoration: none;
  user-select: none;
  display: block;
  padding: ${props => props.theme.gap.medium} ${props => props.theme.gap.large};
  font-size: ${props => props.theme.fontSize.medium};
  &:hover {
    background-color: ${props => props.theme.colors.aside({ r: '-10', g: '-10', b: '-10' })};
  }
  &:active {
    color: ${props => props.theme.colors.font};
    background-color: white;
    border-right: 3px solid ${props => props.theme.colors.blue};
  }
  &.active {
    background-color: white;
    border-right: 3px solid ${props => props.theme.colors.blue};
    opacity: 1;
  }
`;

export const MainHeightAboveLg = `calc(100vh - ${myTheme.height.header})`;

export const mainHeightBelowLg = `calc(100vh - ${myTheme.height.header} - ${myTheme.height.nav})`;

export const blueColorClick = css`
  color: ${props => props.theme.colors.blue};
  user-select: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export const black = css`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: #000;
  opacity: 0.7;
`;
