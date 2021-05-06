import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppContext from './AppContext';
import routes from './configs/routeConfig';
import MainLayout from './containers/MainLayout';
import history from './history';
import Auth from './reducers/Auth/Auth';
import store from './store';
import theme from './theme';

const App = () => (
	<AppContext.Provider value={{ routes }}>
		<React.StrictMode>
			<Provider store={store}>
				<BrowserRouter history={history}>
					<ThemeProvider theme={theme}>
						<Auth>
							<MainLayout />
						</Auth>
					</ThemeProvider>
				</BrowserRouter>
			</Provider>
		</React.StrictMode>
	</AppContext.Provider>
);

export default App;
