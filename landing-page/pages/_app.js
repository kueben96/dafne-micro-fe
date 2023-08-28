// pages/_app.js (for Next.js 12)
import { ThemeProvider, createTheme } from '@mui/material';
import dynamic from 'next/dynamic';
import App from 'next/app';
import { lazy } from 'react';

function MyApp({ Component, pageProps, users, theme }) {

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
  const remoteTheme = await import('theme/palette');
  return { users: data, theme: remoteTheme }
}

export default MyApp;
