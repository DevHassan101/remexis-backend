import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Get saved theme or default to 'light'
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    
    // Remove both classes to avoid conflicts
    document.documentElement.classList.remove("light", "dark");
    // Only add 'dark' class if the theme is dark
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
    
    console.log("Initial theme:", savedTheme, "Classes on <html>:", document.documentElement.className);
    
    // Cleanup on unmount
    return () => {
      document.documentElement.classList.remove("light", "dark");
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    
    // Remove both classes to avoid conflicts
    document.documentElement.classList.remove("light", "dark");
    // Only add 'dark' class if the new theme is dark
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
    
    localStorage.setItem("theme", newTheme);
    console.log("Toggled to theme:", newTheme, "Classes on <html>:", document.documentElement.className);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);