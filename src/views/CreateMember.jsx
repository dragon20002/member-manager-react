import React, { useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import LoadingProgress from '../components/Common/LoadingProgress';
import Client from '../utils/api/client';
import { Button, IconButton, InputAdornment, Link, makeStyles, TextField } from '@material-ui/core';
import { Check } from '@material-ui/icons';
import AlertDialog from '../components/Common/AlertDialog';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: 'auto',
		padding: '2rem',
		width: '32rem',
		textAlign: 'left',
		border: '1px solid',
		borderColor: theme.palette.primary.main,
		borderRadius: '0.5rem',
	},
	inputCreate: { width: '100%', marginBottom: '1rem' },
	btnCreate: { marginBottom: '1rem' },
	linkGrp: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	menuItem: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	menuLink: { cursor: 'pointer' },
}));

const CreateMember = () => {
	const classes = useStyles();
	const history = useHistory();

	const [userId, setUserId] = useState('');
	const [password, setPassword] = useState('');
	const [passwordRe, setPasswordRe] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [telNo, setTelNo] = useState('');
	const [address, setAddress] = useState('');
	const [isMemberDup, setIsMemberDup] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [popupMsg, setPopupMsg] = useState('');
	const [showAlertPopup, setShowAlertPopup] = useState(false);
	const [showErrors, setShowErrors] = useState(false);

	let requiredInput = new Map();

	useEffect(() => {
		requiredInput.set('userId', !!userId);
		requiredInput.set('password', !!password);
		requiredInput.set('passwordRe', !!passwordRe);
		requiredInput.set('name', !!name);
		requiredInput.set('email', !!email);
	}, [userId, password, passwordRe, name, email]);

	function show(msg) {
		setPopupMsg(msg);
		setShowAlertPopup(true);
	}

	function isInvalidUserId() {
		const hasInvalid = userId.match(/[^A-Za-z가-힣0-9\-_]+/);
		return userId.length < 6 || hasInvalid;
	}

	function isInvalidPassword() {
		const hasAlpha = password.match(/[A-Za-z]+/);
		const hasNum = password.match(/[0-9]+/);
		const hasChar = password.match(/[`~!@#$%^&*()\-_]+/);
		const hasInvalid = password.match(/[^A-Za-z0-9`~!@#$%^&*()\-_]+/);
		return password.length < 8 || !hasAlpha || !hasNum || !hasChar || hasInvalid;
	}

	/**
	 * 사용자 입력 검증
	 */
	function validateInputs() {
		setShowErrors(true);

		if (requiredInput.size === 0 || !Array.from(requiredInput.values()).every((value) => value === true)) {
			show('필수값을 입력해주세요.');
			return false;
		}

		// 2. validation 체크

		// 2.1. 아이디 중복체크 여부
		if (isMemberDup) {
			show('아이디 중복체크를 해주세요.');
			return false;
		}

		// 2.2.1 아이디와 다른 비밀번호 체크
		if (userId === password) {
			show('비밀번호는 아이디와 다르게 입력해주세요.');
			return false;
		}

		// 2.2.2 비밀번호 유효성 체크
		if (isInvalidPassword()) {
			show('비밀번호는 영문/숫자/특수문자 포함 8자 이상으로 입력해주세요.');
			return false;
		}

		// 2.2.3 비밀번호 재입력 체크
		if (password !== passwordRe) {
			show('같은 비밀번호를 입력해주세요.');
			return false;
		}

		// 2.3 전화번호 유효성 체크
		const telNoRegex = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{3,4}$/;
		if (telNo && telNo.length > 0 && !telNo.match(telNoRegex)) {
			show('올바른 전화번호를 입력해주세요.');
			return false;
		}

		return true;
	}

	/**
	 * 아이디 중복체크 요청
	 */
	function checkMemberDup() {
		if (!userId) {
			show('아이디를 입력해주세요.');
			return;
		}

		if (isInvalidUserId()) {
			show('아이디는 한글/영문/숫자 6자 이상으로 입력해주세요.');
			return;
		}

		setIsMemberDup(true);
		setIsLoading(true);
		Client()
			.post('/api/login/check-member-dup', { userId })
			.then((response) => {
				const result = Boolean(response.data);
				setIsMemberDup(result);
				if (result) {
					show('이미 사용중인 아이디 입니다.');
				} else {
					show('사용가능한 아이디 입니다.');
				}
			})
			.finally(() => setIsLoading(false));
	}

	/*
	 * 아이디 중복체크 초기화
	 */
	function clearUserId() {
		setUserId('');
		setIsMemberDup(true);
	}

	/**
	 * 계정 생성 요청
	 */
	function createMember() {
		if (!validateInputs()) {
			return;
		}

		setIsLoading(true);
		Client()
			.post('/api/login/create-member', {
				userId,
				password,
				passwordRe,
				name,
				email,
				telNo,
				address,
			})
			.then((response) => {
				const isCreated = Boolean(response.data);
				if (isCreated) {
					show('계정 생성에 성공하였습니다.');
					history.push('/');
				} else {
					show('계정 생성에 실패하였습니다. 다시 시도해 주세요.');
				}
			})
			.catch(() => {
				show('계정 생성에 실패하였습니다. 다시 시도해 주세요.');
			})
			.finally(() => setIsLoading(false));
	}

	return (
		<div className={classes.root}>
			<form onSubmit={(e) => e.preventDefault()}>
				<div className="input-wrap">
					<div className="input-group mb-2 mr-sm-2">
						<TextField
							id="user-id"
							name="userId"
							className={classes.inputCreate}
							variant="outlined"
							size="small"
							type="text"
							label="아이디"
							helperText="한글/영문 6자 이상"
							maxLength="64"
							value={userId}
							readOnly={!isMemberDup}
							required
							error={showErrors && (!userId || isMemberDup)}
							onChange={isMemberDup ? (e) => setUserId(e.target.value) : () => {}}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle"
											onClick={isMemberDup ? checkMemberDup : clearUserId}
										>
											{isMemberDup ? <Check /> : <Check color="primary" />}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
					</div>
					<TextField
						id="password"
						name="password"
						className={classes.inputCreate}
						variant="outlined"
						size="small"
						type="password"
						label="비밀번호"
						helperText="영문/숫자/특수문자 포함 8자 이상"
						maxLength="64"
						value={password}
						required
						error={showErrors && (!password || password.length === 0)}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<TextField
						id="password-re"
						className={classes.inputCreate}
						variant="outlined"
						size="small"
						type="password"
						label="비밀번호 확인"
						helperText="영문/숫자/특수문자 포함 8자 이상"
						maxLength="64"
						value={passwordRe}
						required
						error={showErrors && (!passwordRe || passwordRe.length === 0)}
						onChange={(e) => setPasswordRe(e.target.value)}
					/>
					<TextField
						id="name"
						name="name"
						className={classes.inputCreate}
						variant="outlined"
						size="small"
						type="text"
						label="이름"
						helperText="성함"
						value={name}
						required
						error={showErrors && (!name || name.length === 0)}
						onChange={(e) => setName(e.target.value)}
					/>
					<TextField
						id="email"
						name="email"
						className={classes.inputCreate}
						variant="outlined"
						size="small"
						type="text"
						label="이메일"
						helperText="your-email-id@examle.com"
						maxLength="64"
						value={email}
						required
						error={showErrors && (!email || email.length === 0)}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<TextField
						id="tel-no"
						name="telNo"
						className={classes.inputCreate}
						variant="outlined"
						size="small"
						type="text"
						label="전화번호"
						helperText="000-0000-0000"
						maxLength="64"
						value={telNo}
						onChange={(e) => setTelNo(e.target.value)}
					/>
					<TextField
						id="address"
						name="address"
						className={classes.inputCreate}
						variant="outlined"
						size="small"
						type="text"
						label="주소"
						helperText="시/도 구/군"
						maxLength="64"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					/>
				</div>
				<Button className={classes.btnCreate} fullWidth onClick={createMember}>
					회원가입
				</Button>
			</form>
			<div className={classes.linkGrp}>
				<span className={classes.menuItem}>
					<Link
						className={classes.menuLink}
						component="span"
						variant="caption"
						onClick={() => history.push('/login')}
					>
						로그인
					</Link>
				</span>
				｜
				<span className={classes.menuItem}>
					<Link
						className={classes.menuLink}
						component="span"
						variant="caption"
						onClick={() => history.push('/')}
					>
						아이디 찾기
					</Link>
				</span>
				｜
				<span className={classes.menuItem}>
					<Link
						className={classes.menuLink}
						component="span"
						variant="caption"
						onClick={() => history.push('/')}
					>
						비밀번호 찾기
					</Link>
				</span>
			</div>
			<AlertDialog open={showAlertPopup} popupMsg={popupMsg} onClose={() => setShowAlertPopup(false)} />
			<LoadingProgress open={isLoading} />
		</div>
	);
};

export default withRouter(CreateMember);
