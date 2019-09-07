import React from 'react';
import styled from 'styled-components';
import buttonCss from 'styles/mixins/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Loader from './Loader';

interface IProps {
  padding?: 'tiny' | 'small' | 'medium';
  theme?: 'withBg' | 'noBg' | 'border';
  color?: 'main' | 'danger';
  loading?: boolean;
  disabled?: boolean;
  children?: string;
  icon?: IconProp;
  onClick?: (e: React.MouseEvent) => void;
}

interface IButton {
  styles: {
    padding: 'tiny' | 'small' | 'medium';
    theme: 'withBg' | 'noBg' | 'border';
    color: 'main' | 'danger';
  };
  status: {
    loading: boolean;
    disabled: boolean;
  };
}

const Button = styled.div<IButton>`
  ${({ styles: { padding, theme, color }, status: { loading, disabled } }) =>
    buttonCss({ padding, theme, color, loading, disabled })};
`;

const Text = styled.span`
  font-size: 1rem;
  user-select: none;
`;

export default ({
  padding = 'small',
  theme = 'withBg',
  color = 'main',
  children,
  disabled = false,
  icon,
  loading = false,
  onClick,
}: IProps) => (
  <Button
    styles={{ padding, theme, color }}
    status={{ loading, disabled }}
    onClick={disabled || loading ? undefined : onClick}
  >
    {loading && <Loader />}
    {icon === undefined ? (
      <Text>{children}</Text>
    ) : (
      <Text>
        <FontAwesomeIcon icon={icon} />
      </Text>
    )}
  </Button>
);
