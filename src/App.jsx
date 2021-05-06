import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import AppContext from './AppContext';
import routes from './configs/routeConfig';
import MainLayout from './containers/MainLayout';
import AuthContainer from './containers/AuthContainer';
import store from './store';
import theme from './theme';

const App = () => (
	<AppContext.Provider value={{ routes }}>
		<React.StrictMode>
			<Provider store={store}>
				<BrowserRouter>
					<ThemeProvider theme={theme}>
						<AuthContainer>
							<MainLayout />
						</AuthContainer>
					</ThemeProvider>
				</BrowserRouter>
			</Provider>
		</React.StrictMode>
	</AppContext.Provider>
);

export default App;
