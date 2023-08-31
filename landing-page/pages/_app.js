// pages/_app.js (for Next.js 12)
import { ThemeProvider, createTheme } from '@mui/material';
import React from 'react'
import dynamic from 'next/dynamic';
import App from 'next/app';
import { lazy } from 'react';

function MyApp({ Component, pageProps, user }) {
  const themeRef = React.useRef(false);
  const [theme, setTheme] =
    React.useState(null);
  React.useEffect(() => {
    if (themeRef.current == false) {
      import('theme/theme')
        .then((sharedTheme) =>
          setTheme(
            sharedTheme.default
          ),
        )
        .catch((error) =>
          console.error(
            'Error loading shared theme',
            error
          )
        );
    }
    themeRef.current = true;

  }, []);

  console.log(user)
  console.log("remoteTheme")
  console.log(theme)
  const customTheme = createTheme();
  // console.log(customTheme)
  if (!theme) {
    return (
      <div>
        Loading theme...
      </div>
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
MyApp.getInitialProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const data = await res.json()

  const remoteTheme = await import('theme/theme');

  return { users: data, theme: remoteTheme.default }
  // return { users: data }
}

export default MyApp;
