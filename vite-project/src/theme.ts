//Shades of colors

export const tokens = {
    grey: {
      300: "#645394",
      500: "#6f4685",
      600: "#551a8b",
      700: "#563c5c",
      900: "#b666d2",
    },
    primary: {
      100: "#fff0f5",
      200: "#7851a9",
      300: "#7851a9",
      400: "#41f2d3",
      500: "#645394",
      600: "#c9a0dc",
      700: "#0b8f78",
      800: "#d8bfd8",
      900: "#043028",
    },
    secondary: {
      100: "#f5c377",
      200: "#f5c377",
      300: "#f5c377",
      400: "#f5c377",
      500: "#8A0707", //
      600: "#c29044",
      700: "#916c33",
      800: "#614822",
      900: "#302411",
    },
    tertiary: {
      500: "#8884d8",
    },
    background: {
      light: "#e6e6fa",
      main: "#fff0f5",
    },
  };
  
  // mui theme settings
  export const themeSettings = {
    //overwriting default mui setting
    palette: {
      primary: {
        ...tokens.primary,
        main: tokens.primary[500],
        light: tokens.primary[400],
      },
      secondary: {
        ...tokens.secondary,
        main: tokens.secondary[500],
      },
      tertiary: {
        ...tokens.tertiary,
      },
      grey: {
        ...tokens.grey,
        main: tokens.grey[500],
      },
      background: {
        default: tokens.background.main,
        light: tokens.background.light,
      },
    },
    typography: {
      fontFamily: ["Raleway", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Raleway", "sans-serif"].join(","),
        fontSize: 32,
      },
      h2: {
        fontFamily: ["Raleway", "sans-serif"].join(","),
        fontSize: 24,
      },
      h3: {
        fontFamily: ["Raleway", "sans-serif"].join(","),
        fontSize: 20,
        fontWeight: 800,
        color: tokens.grey[700],
      },
      h4: {
        fontFamily: ["Raleway", "sans-serif"].join(","),
        fontSize: 14,
        fontWeight: 600,
        color: tokens.grey[300],
      },
      h5: {
        fontFamily: ["Raleway", "sans-serif"].join(","),
        fontSize: 12,
        fontWeight: 400,
        color: tokens.grey[500],
      },
      h6: {
        fontFamily: ["Raleway", "sans-serif"].join(","),
        fontSize: 10,
        color: tokens.grey[700],
      },
    },
  };