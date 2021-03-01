import { createMuiTheme } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

export const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: red,
    background: {
      default: '#202124',
    },
  },
});

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: red,
    background: {
      default: '#202124',
    },
  },
});
