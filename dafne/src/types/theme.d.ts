import { ThemeOptions } from "@mui/material";

declare module '@mui/material/styles' {
    interface PaletteColorOptions {
        main: string;
        light?: string;
        lighter?: string;
        dark?: string;
        contrastText?: string;
    }
    interface PaletteOptions {
        gray?: PaletteColorOptions;
    }
    interface Theme {
        layout?: {
            drawerWidth?: number;
        };
        palette: PaletteOptions;
    }
    interface CustomThemeOptions extends ThemeOptions {
        layout?: {
            drawerWidth?: number;
            appBarHeight?: number;
        },
        palette: PaletteOptions;
    }
    export function createTheme(options?: CustomThemeOptions): Theme;
}
