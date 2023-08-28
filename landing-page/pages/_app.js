// pages/_app.js (for Next.js 12)
import { ThemeProvider, createTheme } from '@mui/material';
import dynamic from 'next/dynamic';
import App from 'next/app';
function MyApp({ Component, pageProps, users, theme }) {


  //   // Load the remote theme here and add it to appProps
  //   const remoteTheme = await import('theme/theme');
  //   appProps.remoteTheme = remoteTheme.default;

  //   return { ...appProps };
  // }

  // const { Component, pageProps, users } = this.props;
  console.log(users)
  console.log("remoteTheme")
  console.log(theme)
  const customTheme = createTheme();
  console.log(customTheme)
  return (
    <ThemeProvider theme={customTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
MyApp.getInitialProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const data = await res.json()
  const remoteTheme = await import('theme/theme');
  return { users: data, theme: remoteTheme }
}

export default MyApp;
