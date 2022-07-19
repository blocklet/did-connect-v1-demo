import React from 'react';
import { create } from '@arcblock/ux/lib/Theme';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';

const defaultTheme = create();
// eslint-disable-next-line react/prop-types
export default function ThemeProvider({ children, theme = defaultTheme }) {
  return (
    // injectFirst 会影响 makeStyles 自定义样式和 mui styles 覆盖问题
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
      </MuiThemeProvider>
    </StyledEngineProvider>
  );
}
