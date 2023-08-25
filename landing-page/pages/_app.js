import { PaletteProvider } from '../context/context';
import { ThemeProvider, createTheme } from '@mui/material'
import '../styles/globals.css'
import dynamic from 'next/dynamic'
import React, { useState, lazy } from 'react';

function MyApp({ Component, pageProps }) {



  const [theme, setTheme] = React.useState(null);
  const [palette, setPalette] = React.useState(null);

  // React.useEffect(() => {
  //   import('theme/theme')
  //     .then((sharedTheme) => {
  //       setTheme(sharedTheme.default);
  //     })
  //     .catch((error) => {
  //       console.error('Error loading shared theme', error);
  //     });
  // }, []);


  React.useEffect(() => {
    import('theme/palette')
      .then((sharedPalette) => {
        setPalette(sharedPalette.default);
        const customTheme = createTheme({
          palette: palette ??
          {
            primary: {
              dark: '#3C9085',
              main: '#6CC1B5',
            }
          }
        });
        setTheme(customTheme);
      })
      .catch((error) => {
        console.error('Error loading shared palette', error);
      });
  }, []);


  if (!theme) {
    return <div>Loading theme...</div>;
  }
  console.log("theme", theme)

  return (
    <PaletteProvider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </PaletteProvider>

  )
}

export default MyApp
