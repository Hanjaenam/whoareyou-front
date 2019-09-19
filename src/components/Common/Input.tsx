import React from 'react';
import styled from 'styled-components';

interface IProps {
  autoFocus?: boolean;
  className?: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  padding?: 'tiny' | 'small' | 'medium';
  type?: string;
  value: string;
  id?: string;
}

interface Input {
  styles: {
    padding: 'tiny' | 'small' | 'medium';
  };
}

const Input = styled.input<Input>`
  padding: ${props => props.theme.gap[props.styles.padding]};
  font-size: 1rem;
  border-radius: ${props => props.theme.borderRadius.basic};
  border: 1px solid ${props => props.theme.colors.secondary};
`;

export default ({
  autoFocus = false,
  className,
  disabled = false,
  onChange,
  onKeyUp,
  placeholder,
  padding = 'small',
  type = 'text',
  value,
  id,
}: IProps) => (
  <Input
    disabled={disabled}
    className={className}
    autoFocus={autoFocus}
    onChange={onChange}
    placeholder={placeholder}
    type={type}
    value={value}
    onKeyUp={onKeyUp}
    styles={{ padding }}
    id={id}
  />
);
