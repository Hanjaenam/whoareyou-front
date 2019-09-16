import React from 'react';
import styled, { keyframes } from 'styled-components';

interface IProps {
  color?: string;
  size?: number;
  position?: 'absolute' | 'relative';
}

const containerSpin = keyframes`
0%{
  transform: rotate(0deg)
}
100%{
  transform: rotate(360deg)
}
`;

const Container = styled.div<{ size: number; position: 'absolute' | 'relative' }>`
  z-index: 10;
  height: ${props => `${props.size}rem`};
  width: ${props => `${props.size}rem`};
  -webkit-animation: ${containerSpin} 4.8s linear infinite;
  animation: ${containerSpin} 4.8s linear infinite;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: ${props => props.position};
`;

const spanSpin = keyframes`
0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(220deg);
}
`;

const afterSpin = keyframes`
0% {
  transform: rotate(-140deg);
}
50% {
  transform: rotate(-160deg);
}
100% {
  transform: rotate(140deg);
}
`;

const Span = styled.span<{ size: number }>`
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  border: 0;
  right: 0;
  margin: auto;
  width: ${props => `${props.size}rem`};
  height: ${props => `${props.size}rem`};
  /*
  (y출발지점, y출발지점부터 보여질 높이, x출발 지점부터 보여질 너비, x출발지점)
  */
  clip: ${props => `rect(0, ${props.size}rem, ${props.size}rem, ${props.size / 2}rem)`};
  -webkit-animation: ${spanSpin} 1.2s linear infinite;
  animation: ${spanSpin} 1.2s linear infinite;

  &::after {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: block;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    width: ${props => `${props.size}rem`};
    height: ${props => `${props.size}rem`};
    clip: ${props => `rect(0, ${props.size}rem, ${props.size}rem, ${props.size / 2}rem)`};
    border-radius: 50%;
    border: 3px solid ${props => props.color};
    -webkit-animation: ${afterSpin} 1.2s cubic-bezier(0.77, 0, 0.175, 1) infinite;
    animation: ${afterSpin} 1.2s cubic-bezier(0.77, 0, 0.175, 1) infinite;
  }
`;

export default ({ size = 1, color = '#fff', position = 'absolute' }: IProps) => (
  <Container size={size} position={position} className="loader">
    <Span size={size} color={color} />
  </Container>
);
