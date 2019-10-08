import { css } from 'styled-components';
import tempAvatar from 'assets/avatar.png';

export default ({ url, page }: { url: string | null; page: 'user' | 'userEdit' }) => css`
  border-radius: ${props => props.theme.borderRadius.avatar};
  border: 1px solid ${props => props.theme.colors.secondary};
  background-image: ${url ? `url(${url})` : `url(${tempAvatar})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: ${props => props.theme.avatarSize[page].xl};
  height: ${props => props.theme.avatarSize[page].xl};
  @media screen and (max-width: ${props => props.theme.breakpoints.md}) {
    width: ${props => props.theme.avatarSize[page].md};
    height: ${props => props.theme.avatarSize[page].md};
  }
`;
