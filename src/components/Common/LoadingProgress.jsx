import React from 'react';
import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
	root: {
		zIndex: theme.zIndex.drawer + 1,
	},
}));

const LoadingProgress = ({ open, onClose }) => {
	const classes = useStyles();
	return (
		<Backdrop className={classes.root} open={open} onClick={onClose}>
			<CircularProgress />
		</Backdrop>
	);
};

LoadingProgress.propTypes = {
	open: PropTypes.bool,
	onClose: PropTypes.func,
};

export default LoadingProgress;
