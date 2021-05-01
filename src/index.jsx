import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import store from './store';
import theme from './theme';

// ----- Render App ------------------------------------------//

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root'),
);

// reportWebVitals();
reportWebVitals(console.log); // measuring performance
