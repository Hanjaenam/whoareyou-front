import { DefaultTheme } from 'styled-components';

const myTheme: DefaultTheme = {
  borderRadius: '3px',
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '1024px',
    xl: '1440px',
  },
  colors: {
    font: '#262626',
    main: '#2c3e50',
    bg: '#f9fbfd',
    secondary: '#d5d8db',
    success: '#2ecc71',
    danger: '#E74C3D',
    info: '#f39c12',
    blue: '#3897f0',
    aside: ({
      r = '0',
      g = '0',
      b = '0',
    }: { r?: string; g?: string; b?: string } = {}) =>
      `rgb(${236 + Number(r)}, ${239 + Number(g)}, ${242 + Number(b)})`,
  },
  fontSize: {
    tiny: '0.7rem',
    small: '0.8rem',
    medium: '1rem',
    large: '1.2rem',
    huge: '1.4rem',
  },
  gap: {
    tiny: '5px',
    small: '10px',
    medium: '15px',
    large: '25px',
    huge: '35px',
  },
  userAvatarSize: {
    userPage: {
      xl: '160px',
      md: '120px',
    },
    userEditPage: {
      xl: '200px',
      md: '160px',
    },
  },
  width: {
    max: {
      authMain: '550px',
      input: '355px',
    },
    min: {
      input: '330px',
    },
    aside: '12rem',
  },
  height: {
    header: '56px',
  },
};

export { myTheme };
