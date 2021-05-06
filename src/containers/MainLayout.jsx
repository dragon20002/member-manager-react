import { makeStyles } from '@material-ui/core';
import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { renderRoutes } from 'react-router-config';
import LoadingProgress from '../components/Common/LoadingProgress';
import HeaderMenu from '../components/Header/HeaderMenu';
import HeaderTop from '../components/Header/HeaderTop';
import routes from '../configs/routeConfig';

const useStyles = makeStyles(() => ({
	root: {
		fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
		textAlign: 'center',
	},
	header: {
		padding: '3rem',
	},
	footer: {
		marginTop: '10rem',
		padding: '3rem',
		textAlign: 'center',
		backgroundColor: '#eeeeee',
	},
}));

const MainLayout = () => {
	const classes = useStyles();
	const { isLoading } = useSelector(({ loading }) => ({
		isLoading: loading.count > 0,
	}));

	return (
		<div className={classes.root}>
			<div className={classes.header}>
				<HeaderTop />
				<HeaderMenu />
				<Suspense fallback="" /* 로딩화면 */>
					{/* {renderRoutes(routes)} */}
					<Switch>
						{routes[0].routes.map((route, key) => (
							<Route
								key={key}
								path={route.path}
								component={route.component}
								render={route.render}
								auth={route.authCheck}
							/>
						))}
						<Route path="/">
							<Redirect to="/home" />
						</Route>
					</Switch>
				</Suspense>
			</div>
			<div className={classes.footer}>&copy;2021</div>
			{isLoading && <LoadingProgress />}
		</div>
	);
};

export default MainLayout;
