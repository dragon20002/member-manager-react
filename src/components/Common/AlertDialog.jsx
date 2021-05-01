import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide } from '@material-ui/core';
import { Check } from '@material-ui/icons';

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const AlertDialog = ({ open, popupMsg, onClose }) => (
	<Dialog
		open={open}
		TransitionComponent={Transition}
		onClose={onClose}
		aria-labelledby="alert-dialog-title"
		aria-describedby="alert-dialog-description"
	>
		<DialogTitle id="alert-dialog-title">알림</DialogTitle>
		<DialogContent id="alert-dialog-description">{popupMsg}</DialogContent>
		<DialogActions>
			<Button variant="text" startIcon={<Check />} onClick={onClose}>
				확인
			</Button>
		</DialogActions>
	</Dialog>
);

AlertDialog.propTypes = {
	open: PropTypes.bool,
	popupMsg: PropTypes.string,
	onClose: PropTypes.func,
};

export default AlertDialog;
