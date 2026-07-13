import { createContext, useContext } from "react";

// Central place for any theme values components need in JS (not just CSS).
// Actual color values live in index.css's @theme block — this just
// exposes them as named constants so components don't hardcode hex codes.
const theme = {
  colors: {
    primary: "#E85D25",
    primaryDark: "#C44A1A",
    secondary: "#4A4A4A",
    secondaryLight: "#8A8A8A",
    surface: "#FFFFFF",
    ink: "#1A1A1A",
  },
  brand: {
    name: "Design Factory Group",
    shortName: "DFG",
  },
};

const ThemeContext = createContext(theme);

export function ThemeProvider({ children }) {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}