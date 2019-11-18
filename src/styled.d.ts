import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: {
      basic: string;
      avatar: string;
      comment: string;
      authMain: string;
    };
    breakpoints: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    colors: {
      font: string;
      main: string;
      secondary: string;
      bg: string;
      success: string;
      danger: string;
      info: string;
      blue: string;
      aside: (opts?: { r?: string; g?: string; b?: string }) => string;
    };
    fontSize: {
      tiny: string;
      small: string;
      medium: string;
      large: string;
      huge: string;
    };
    gap: {
      tiny: string;
      small: string;
      medium: string;
      large: string;
      huge: string;
    };
    avatarSize: {
      user: {
        xl: string;
        md: string;
      };
      userEdit: {
        xl: string;
        md: string;
      };
    };
    width: {
      max: {
        authMain: string;
        input: string;
      };
      min: {
        input: string;
      };
      aside: {
        xl: string;
        lg: string;
      };
      article: { container: string; image: string };
    };
    height: {
      header: string;
      nav: string;
    };
    zIndex: { header: number; black: number; asideModal: number };
    boxShadow: string;
  }
}
