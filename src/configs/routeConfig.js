import React from 'react';
import MainLayout from '../containers/MainLayout';
import About from '../views/About';
import CreateMember from '../views/CreateMember';
import Home from '../views/Home';
import LoginContainer from '../views/LoginContainer';
import ShowMember from '../views/ShowMember';
import ShowMembers from '../views/ShowMembers';

const routes = [
	{
		component: MainLayout,
		routes: [
			{
				path: '/home',
				component: Home,
			},
			{
				path: '/show-members',
				render: () => <ShowMembers />,
				authCheck: true,
			},
			{
				path: '/about',
				component: About,
			},
			{
				path: '/create-member',
				component: CreateMember,
			},
			{
				path: '/login',
				render: () => <LoginContainer />,
			},
			{
				path: '/show-member',
				component: ShowMember,
				authCheck: true,
			},
			// {
			//     path: '/error',
			//     component: Error,
			// },
		],
	},
];

export default routes;
