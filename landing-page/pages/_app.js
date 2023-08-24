import { ThemeProvider, createTheme } from '@mui/material'
import '../styles/globals.css'
import dynamic from 'next/dynamic'
import { useState } from 'react';

function MyApp({ Component, pageProps }) {
  // const SharedTheme = dynamic(() => import('theme/shared-theme'));
  // const [palette, setPalette] =
  //   useState(null);

  // const Palette = dynamic(
  //   () => {
  //     const mod = import('theme/palette');
  //     return mod;
  //   }
  // );

  // useEffect(() => {

  //   Palette.then((sharedPalette) => {
  //     setPalette(sharedPalette.default);
  //     console.log(sharedPalette.default)
  //   })
  //     .catch((error) => console.error('Error loading shared palette', error));
  // }, []);
  const theme = createTheme({
    palette: {
      primary: {
        main: '#6CC1B5',
        dark: '#3C9085',
        light: '#A9DBD4',
        lighter: '#E2F3F1'
      },
      secondary: {
        main: '#E08542',
        dark: '#C2631E',
        light: '#E9A372',
        lighter: '#F1CBB0'
      },
      common: {
        black: '#1D201F',
        white: '#FFFFFF',
      },
      gray: {
        main: '#656565',
        light: '#B9B9B9',
        lighter: '#EDEDED'
      },
      error: {
        main: '#FF4D4F'
      },
      success: {
        main: '#52C41A'
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>

  )
}

export default MyApp
