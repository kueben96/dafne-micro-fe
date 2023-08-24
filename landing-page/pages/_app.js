import { ThemeProvider, createTheme } from '@mui/material'
import '../styles/globals.css'
import dynamic from 'next/dynamic'
import React, { useState, lazy } from 'react';

function MyApp({ Component, pageProps }) {
  const PaletteShared = dynamic(() => import('theme/palette'), {
    loading: () => console.log("..... Loadig Palette... "), // Fallback component while loading
    ssr: false, // Disable server-side rendering for this component
  });


  const [theme, setTheme] = React.useState(null);

  React.useEffect(() => {
    import('theme/theme')
      .then((sharedTheme) => {
        setTheme(sharedTheme.default);
      })
      .catch((error) => {
        console.error('Error loading shared theme', error);
      });
  }, []);

  if (!theme) {
    return <div>Loading theme...</div>;
  }

  console.log("PaletteShared", PaletteShared)

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>

  )
}

export default MyApp
