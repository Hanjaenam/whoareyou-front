import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { myTheme } from 'styles/theme';

export default createGlobalStyle`
${reset}
body{
  font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  width:100vw;
  height:100vh;
  background: ${myTheme.colors.bg};
}
*{
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
span,p,a{color: ${myTheme.colors.font}}
`;
