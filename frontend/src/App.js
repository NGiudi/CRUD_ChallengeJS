import React from "react";
import {createMuiTheme, ThemeProvider} from '@material-ui/core' 
import Nav from './components/Nav';

//styles
import './assets/css/styles.css';


const theme = createMuiTheme({
  palette: {
    primary: {main: '#81c784'},
    secondary: {main: '#d32f2f'}
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Nav/>
    </ThemeProvider>
  );
}

export default App;