import { DefaultTheme } from 'styled-components';

const myTheme: DefaultTheme = {
  borderRadius: {
    basic: '3px',
    avatar: '25%',
    comment: '15px',
    authMain: '25px',
  },
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
    danger: '#F44336',
    info: '#f39c12',
    blue: '#3897f0',
    aside: ({ r = '0', g = '0', b = '0' }: { r?: string; g?: string; b?: string } = {}) =>
      `rgb(${242 + Number(r)}, ${245 + Number(g)}, ${248 + Number(b)})`,
  },
  fontSize: {
    tiny: '0.7rem',
    small: '0.8rem',
    medium: '1rem',
    large: '1.2rem',
    huge: '1.4rem',
  },
  gap: {
    tiny: '7.5px',
    small: '10px',
    medium: '15px',
    large: '25px',
    huge: '35px',
  },
  avatarSize: {
    user: {
      xl: '160px',
      md: '120px',
    },
    userEdit: {
      xl: '200px',
      md: '160px',
    },
  },
  width: {
    max: {
      authMain: '550px',
      input: '300px',
    },
    min: {
      input: '330px',
    },
    aside: {
      xl: '200px',
      lg: '60px',
    },
    article: {
      container: '602px',
      image: '600px',
    },
  },
  height: {
    header: '48px',
    nav: '29px',
  },
  zIndex: {
    header: 1,
    black: 2,
    asideModal: 3,
  },
  boxShadow:
    '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.4)',
};

export { myTheme };
