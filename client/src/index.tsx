import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Reset } from 'styled-reset'
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Helvetica, Verdana, sans-serif;;
  }
`

ReactDOM.render(<><Reset/><App /><GlobalStyle/></>, document.getElementById('root'));
