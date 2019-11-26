import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Reset } from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Helvetica, Verdana, sans-serif;
    color: #001F3F;
    padding: 8px;
    a:link {
        color: #0074D9;
    }
    a:visited {
        color: #B10DC9;
    }
  }
`;

ReactDOM.render(
    <>
        <App />
        <Reset />
        <GlobalStyle />
    </>,
    document.getElementById('root')
);
