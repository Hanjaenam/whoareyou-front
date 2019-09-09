import { css } from 'styled-components';
import { ButtonBasic, ButtonBg, ButtonBorder, ButtonCustom } from 'types/mixinsButton';

export const _disabled = (theme: 'withBg' | 'noBg' | 'border') => css`
  cursor: not-allowed;
  ${props =>
    theme !== 'noBg'
      ? css`
          background-color: ${props.theme.colors.main};
          opacity: 0.3;
          > span {
            color: white;
          }
          > svg {
            color: white;
          }
        `
      : css`
          opacity: 0.3;
        `}
`;

export const _loading = css`
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
  }
  > svg {
    opacity: 0;
  }
`;

export const basic = (
  { padding }: ButtonBasic = {
    padding: 'small',
  },
) => css`
  position: relative;
  cursor: pointer;
  border-radius: ${props => props.theme.borderRadius.basic};
  padding: ${props => props.theme.gap[padding]};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const withBg = (
  { color, disabled, loading, padding }: ButtonBg = {
    color: 'main',
    disabled: false,
    loading: false,
    padding: 'small',
  },
) => css`
${basic({ padding })}
${disabled && _disabled('withBg')}
${loading && _loading}
  background-color: ${props => props.theme.colors[color]};
  > span {
    color: white;
  }
  > svg {
    color: white;
  }
  ${
    disabled || loading
      ? null
      : css`
          &:hover {
            opacity: 0.9;
          }
          &:active {
            opacity: 1;
          }
        `
  }
`;

export const noBg = (
  { color, disabled, loading, padding }: ButtonBg = {
    color: 'main',
    disabled: false,
    loading: false,
    padding: 'small',
  },
) => css`
${basic({ padding })}
${disabled && _disabled('noBg')}
${loading && _loading}
${
  disabled || loading
    ? null
    : css`
        &:hover {
          background-color: ${props => props.theme.colors[color]};
          /* loading element : <div><span></span></div> -> span포함되어있음 loading 색상이 변경되는 걸 피하기 위해 */
          > span {
            color: white;
          }
          > svg {
            color: white;
          }
        }
        &:active {
          transform: scale(0.98);
        }
      `
}
`;

export const border = (
  { color, disabled, loading, padding }: ButtonBorder = {
    color: 'main',
    disabled: false,
    loading: false,
    padding: 'small',
  },
) => css`
${disabled && _disabled('border')}
${loading && _loading}
${basic({ padding })}
  border: 1px solid ${props => props.theme.colors[color]};
  ${
    disabled || loading
      ? null
      : css`
          &:hover {
            background-color: ${props => props.theme.colors[color]};
            span {
              color: white;
            }
            > svg {
              color: white;
            }
          }
        `
  }
`;

export default (
  { padding, theme, color, loading, disabled }: ButtonCustom = {
    padding: 'small',
    theme: 'withBg',
    color: 'main',
    loading: false,
    disabled: false,
  },
) => {
  const withBgCss = withBg({ color, disabled, loading, padding });
  const noBgCss = noBg({ color, disabled, loading, padding });
  const borderCss = border({ color, disabled, loading, padding });

  switch (theme) {
    case 'withBg':
      return css`
        ${withBgCss};
      `;
    case 'noBg':
      return css`
        ${noBgCss};
      `;
    case 'border':
      return css`
        ${borderCss};
      `;
    default:
      return css`
        ${withBgCss};
      `;
  }
};
