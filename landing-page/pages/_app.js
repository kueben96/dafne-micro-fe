// pages/_app.js (for Next.js 12)
import { ThemeProvider, createTheme } from '@mui/material';
import React, { useEffect } from 'react';

function MyApp({ Component, pageProps, remoteTheme }) {
  const themeRef = React.useRef(false);
  const [theme, setTheme] = React.useState(null);
  const createdTheme = createTheme()
  // console.log("remoteTheme")
  // console.log(remoteTheme)

  useEffect(() => {
    const loadTheme = async () => {
      if (themeRef.current === false) {
        try {
          const sharedTheme = await import('theme/theme');
          setTheme(sharedTheme.default);
        } catch (error) {
          console.error('Error loading shared theme', error);
        }
      }
      themeRef.current = true;
    };

    loadTheme();
  }, []);

  // if (!theme) {
  //   // Return a loading indicator or any other UI element while waiting for the theme to load
  //   return (
  //     <div>
  //       Loading theme...
  //     </div>
  //   );
  // }

  return (
    <ThemeProvider theme={theme ?? createdTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

// export async function getStaticProps() {
//   // const { default: remoteTheme } = await import('theme/theme');
//   let remoteTheme = null;
//   try {
//     const sharedTheme = await import('theme/theme');
//     remoteTheme = sharedTheme.default;
//   } catch (error) {
//     console.error('Error loading shared theme', error);
//   }
//   return {
//     props: {
//       remoteTheme
//     }
//   };
// }
export default MyApp;