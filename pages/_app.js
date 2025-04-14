import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme();

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
