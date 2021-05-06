import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

// ----- Render App ------------------------------------------//

ReactDOM.render(<App />, document.getElementById('root'));

// reportWebVitals();
reportWebVitals(console.log); // measuring performance
