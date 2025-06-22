import {create} from 'zustand';


export const useThemeStore = create((set) => ({

  theme :  localStorage.getItem('theme') || 'light', // Default to 'light' theme if not set
  setTheme: (theme) => {
    localStorage.setItem('chat-theme', theme); // Save the theme to localStorage
    set({theme}); // Update the state with the new theme
  },
}));