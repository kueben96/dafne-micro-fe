// pages/_app.js (for Next.js 12)
import { ThemeProvider, createTheme } from '@mui/material';
import React from 'react'

function MyApp({ Component, pageProps }) {
  // const themeRef = React.useRef(false);
  // const [theme, setTheme] =
  //   React.useState(null);
  // React.useEffect(() => {
  //   if (themeRef.current == false) {
  //     import('theme/theme')
  //       .then((sharedTheme) =>
  //         setTheme(
  //           sharedTheme.default
  //         ),
  //       )
  //       .catch((error) =>
  //         console.error(
  //           'Error loading shared theme',
  //           error
  //         )
  //       );
  //   }
  //   themeRef.current = true;

  // }, []);

  // console.log("remoteTheme")
  // console.log(theme)

  // if (!theme) {
  //   return (
  //     <div>
  //       Loading theme...
  //     </div>
  //   );
  // }
  return (
    // <ThemeProvider theme={theme}>
    <Component {...pageProps} />
    // </ThemeProvider>
  );
}


export default MyApp;
