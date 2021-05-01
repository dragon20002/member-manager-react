import { Button, Checkbox, FormControlLabel, makeStyles, TextField } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initForm } from '../../reducers/Auth/Auth';

const useStyles = makeStyles(() => ({
	inputLogin: {
		width: '100%',
		marginBottom: '1rem',
	},
	btnLogin: {
		width: '100%',
		marginBottom: '1rem',
	},
}));

const Login = () => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const { form } = useSelector(({ auth }) => ({
		form: auth.login,
	}));

	useEffect(() => {
		dispatch(initForm('login'));

		const userId = localStorage.getItem('userId') || '';
		if (userId) {
			dispatch(changeField({ form: 'login', key: 'saveUserId', value: userId }));
			dispatch(changeField({ form: 'login', key: 'userId', value: userId }));
		}
	}, [dispatch]);

	const onChange = (e) => {
		const { name, value } = e.target;
		dispatch(changeField({ form: 'login', key: name, value }));
	};

	const handleKeyUp = (e) => {
		if (e.keyCode === 13) onSubmit(e);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const { userId, password } = form;
		dispatch({
			type: 'login',
			payload: { loginType: null, userId, password },
		});
	};

	return (
		<form onSubmit={(e) => e.preventDefault()}>
			<TextField
				id="user-id"
				name="userId"
				className={classes.inputLogin}
				label="아이디"
				type="text"
				maxLength="64"
				value={form.userId}
				onChange={onChange}
				onKeyUp={handleKeyUp}
			/>

			<TextField
				id="password"
				name="password"
				className={classes.inputLogin}
				label="비밀번호"
				type="password"
				maxLength="64"
				onChange={onChange}
				onKeyUp={handleKeyUp}
			/>
			<FormControlLabel
				control={
					<Checkbox
						name="saveUserId"
						checked={form.saveUserId}
						onChange={(e) => {
							dispatch(changeField({ form: 'login', key: 'saveUserId', value: e.target.checked }));
						}}
					/>
				}
				label="아이디 저장하기"
			/>
			<Button className={classes.btnLogin} onClick={onSubmit}>
				로그인
			</Button>
		</form>
	);
};

export default Login;
