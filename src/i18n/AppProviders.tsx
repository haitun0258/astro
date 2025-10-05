import React from 'react';
import i18n from './index';
import { I18nextProvider } from 'react-i18next';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

export default function AppProviders({ children }: { children: React.ReactNode }) {
  const theme = React.useMemo(() => createTheme({}), []);
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </I18nextProvider>
  );
}