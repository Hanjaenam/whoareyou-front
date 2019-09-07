import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: {
      basic: string;
      avatar: string;
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
    userAvatarSize: {
      userPage: {
        xl: string;
        md: string;
      };
      userEditPage: {
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
      aside: string;
    };
    height: {
      header: string;
      smallHeader: string;
      nav: string;
    };
  }
}
