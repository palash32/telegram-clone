import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2AABEE', 
      light: '#42bff5',
      dark: '#229ED9',
    },
    secondary: {
      main: '#8E8E93', 
    },
    background: {
      default: '#F0F2F5', 
      paper: '#FFFFFF', 
    },
    text: {
      primary: '#000000', 
      secondary: '#8E8E93', 
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    h6: {
      fontWeight: 500,
    },
    body1: {
      fontSize: '0.9375rem', 
    },
    body2: {
      fontSize: '0.8125rem', 
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '0.5rem',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '1.5rem',
            '&.Mui-focused': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#2AABEE',
              },
            },
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(42, 171, 238, 0.1)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: '1px solid #E9E9E9',
        },
      },
    },
  },
});

export default theme;