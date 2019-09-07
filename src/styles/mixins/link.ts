import { css } from 'styled-components';

export default {
  basic: css`
    text-decoration: none;
    cursor: pointer;
    border-radius: ${props => props.theme.borderRadius};
    padding: ${props => props.theme.gap.small};
    display: flex;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: ${props => props.theme.breakpoints.md}) {
      padding: ${props => props.theme.gap.tiny};
    }
  `,
  noBg: css`
    &:hover {
      background-color: ${props => props.theme.colors.main};
      /* loading element : <div><span></span></div> -> span포함되어있음 loading 색상이 변경되는 걸 피하기 위해 */
      color: white;
      svg path {
        color: white;
      }
    }
    &:active {
      transform: scale(0.98);
    }
  `,
  border: css`
    border: 1px solid ${props => props.theme.colors.main};
    &:hover {
      background-color: ${props => props.theme.colors.main};
      color: white;
      svg path {
        color: white;
      }
    }
  `,
};
