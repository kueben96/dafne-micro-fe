// pages/_app.js (for Next.js 12)
import { ThemeProvider, createTheme } from '@mui/material';
import App from 'next/app';
import dynamic from 'next/dynamic';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const appProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    // Load the remote theme here and add it to appProps
    const remoteTheme = await import('theme/theme');
    appProps.remoteTheme = remoteTheme.default;

    return { ...appProps };
  }

  render() {
    const { Component, pageProps, remoteTheme } = this.props;
    const customTheme = createTheme(remoteTheme);
    console.log(customTheme)
    return (
      <ThemeProvider theme={customTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}

export default MyApp;
