import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import menus from '../../configs/headerMenu';
import { Link, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: '1.6rem',
		marginBottom: '1.6rem',
	},
	menuItem: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	menuLink: { cursor: 'pointer' },
}));

const HeaderMenu = () => {
	const classes = useStyles();
	const history = useHistory();

	const [selIdx, setSelIdx] = useState(0);

	return (
		<div className={classes.root}>
			{menus.map((menu, key) => (
				<span key={key} className={classes.menuItem}>
					<Link
						className={classes.menuLink}
						component="span"
						variant="h6"
						color={selIdx === key ? 'primary' : 'inherit'}
						onClick={() => {
							setSelIdx(key);
							history.push(menu.path);
						}}
					>
						{menu.name}
					</Link>
					{key < menus.length - 1 && '｜'}
				</span>
			))}
		</div>
	);
};

HeaderMenu.propTypes = {
	menus: PropTypes.arrayOf(PropTypes.object),
};

export default HeaderMenu;
