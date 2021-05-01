import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Link, makeStyles } from '@material-ui/core';
import './HeaderTop.css';
import NoImage from '../../assets/user-circle-solid.svg';

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	profile: {
		width: '2.4rem',
		margin: '0rem 0.8rem 0rem 0.8rem',
		borderRadius: '50%',
	},
	menuItem: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	menuLink: { cursor: 'pointer' },
}));

const HeaderTop = ({ hasAuth, doLogout, imageUrl, name }) => {
	const classes = useStyles();
	const history = useHistory();

	if (!hasAuth) {
		imageUrl = '../assets/user-circle-solid.svg';
		name = '내 정보';
	} else if (!imageUrl) {
		imageUrl = NoImage;
	}

	const handleLogout = () => {
		doLogout();
		history.push('/');
	};

	return (
		<div className={classes.root}>
			{!hasAuth && (
				<>
					<span className={classes.menuItem}>
						<Link
							className={classes.menuLink}
							component="span"
							onClick={() => history.push('/create-member')}
						>
							회원가입
						</Link>
					</span>
					｜
					<span className={classes.menuItem}>
						<Link className={classes.menuLink} component="span" onClick={() => history.push('/login')}>
							로그인
						</Link>
					</span>
				</>
			)}
			{hasAuth && (
				<>
					<img className={classes.profile} src={imageUrl} alt="" />
					<span className={classes.menuItem}>
						<Link
							className={classes.menuLink}
							component="span"
							onClick={() => history.push('/show-member')}
						>
							{name}
						</Link>
						<span>&nbsp;님</span>
					</span>
					｜
					<span className={classes.menuItem}>
						<Link className={classes.menuLink} component="span" onClick={handleLogout}>
							로그아웃
						</Link>
					</span>
				</>
			)}
		</div>
	);
};

HeaderTop.propTypes = {
	hasAuth: PropTypes.bool,
	imageUrl: PropTypes.string,
	name: PropTypes.string,
	doLogout: PropTypes.func,
};

export default HeaderTop;
