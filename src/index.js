import React from 'react';
import ReactDOM from 'react-dom';
import 'vercel-toast/dist/vercel-toast.css';
import './main.css';
import { ThemeProvider } from "./hock-context/themeContext";
import App from './containers/app.container';


ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

