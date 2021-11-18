import React from 'react';
import ReactDOM from 'react-dom';
import 'vercel-toast/dist/vercel-toast.css';
import './main.css';
import { ThemeProvider } from "./hock-context/themeContext";
import App from './containers/app.container';


ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);

