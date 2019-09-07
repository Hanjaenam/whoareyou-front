import { css } from 'styled-components';
import {
  ButtonBasic,
  ButtonBg,
  ButtonBorder,
  ButtonCustom,
} from 'types/mixinsButton';

const _disabled = css`
  cursor: not-allowed;
  background-color: ${props => props.theme.colors.main};
  opacity: 0.3;
  > span {
    color: white;
    svg path {
      color: white;
    }
  }
`;

const _loading = css`
  cursor: not-allowed;
  background-color: ${props => props.theme.colors.main};
  opacity: 0.3;
  /* loading이 되면 text혹은 icon이 사라진다. 사라지면서 loading element가 중앙으로 올 수 있게끔 해주기 위해 */
  /* .loader {
    position: absolute;
  } */
  /* loading element : <div><span></span></div> -> span포함되어있음 loading 색상이 변경되는 걸 피하기 위해 */
  > span {
    opacity: 0;
    svg {
      opacity: 0;
    }
  }
`;

export const basic = (
  { padding }: ButtonBasic = {
    padding: 'small',
  },
) => css`
  position: relative;
  cursor: pointer;
  border-radius: ${props => props.theme.borderRadius};
  padding: ${props => props.theme.gap[padding]};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const withBg = (
  { color, disabled, loading }: ButtonBg = {
    color: 'main',
    disabled: false,
    loading: false,
  },
) => {
  if (disabled) return _disabled;
  if (loading) return _loading;
  return css`
    background-color: ${props => props.theme.colors[color]};
    > span {
      color: white;
      svg path {
        color: white;
      }
    }
    &:hover {
      opacity: 0.9;
    }
    &:active {
      opacity: 1;
    }
  `;
};

export const noBg = (
  { color, disabled, loading }: ButtonBg = {
    color: 'main',
    disabled: false,
    loading: false,
  },
) => {
  if (disabled) return _disabled;
  if (loading) return _loading;
  return css`
    &:hover {
      background-color: ${props => props.theme.colors[color]};
      /* loading element : <div><span></span></div> -> span포함되어있음 loading 색상이 변경되는 걸 피하기 위해 */
      > span {
        color: white;
        svg path {
          color: white;
        }
      }
    }
    &:active {
      transform: scale(0.98);
    }
  `;
};

export const border = (
  { color, disabled, loading }: ButtonBorder = {
    color: 'main',
    disabled: false,
    loading: false,
  },
) => {
  if (disabled) return _disabled;
  if (loading) return _loading;
  return css`
    border: 1px solid ${props => props.theme.colors[color]};
    &:hover {
      background-color: ${props => props.theme.colors[color]};
      span {
        color: white;
        svg path {
          color: white;
        }
      }
    }
  `;
};

export default (
  { padding, theme, color, loading, disabled }: ButtonCustom = {
    padding: 'medium',
    theme: 'withBg',
    color: 'main',
    loading: false,
    disabled: false,
  },
) => {
  const basicCss = css`
    ${basic({ padding })};
    ${loading && _loading};
  `;

  const withBgCss = withBg({ color, disabled, loading });
  const noBgCss = noBg({ color, disabled, loading });
  const borderCss = border({ color, disabled, loading });

  switch (theme) {
    case 'withBg':
      return css`
        ${basicCss};
        ${withBgCss};
      `;
    case 'noBg':
      return css`
        ${basicCss};
        ${noBgCss};
      `;
    case 'border':
      return css`
        ${basicCss};
        ${borderCss};
      `;
    default:
      return css`
        ${basicCss};
        ${withBgCss};
      `;
  }
};
