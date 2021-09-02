import React, { useState } from 'react';
import Counter from '../components/Counter';
import Style from './About.module.css';
import QrReader from 'react-qr-reader';
import QRCode from 'react-qr-code';
import { Box, Chip } from '@material-ui/core';

const EXPECTED_DATA = 'abcd123123';

const About = () => {
	const [data, setData] = useState();

	return (
		<div>
			<h3 className={Style.h3}>주인장</h3>
			<p>
				mw-kim
				<br />
				mw-kim@****.net
				<br />
				010-****-****
			</p>
			<Counter />

			{!data ? (
				<Box boxShadow={2} border={2} borderRadius={4} margin={4} padding={4}>
					<QrReader delay={300} onError={(err) => alert(err)} onScan={setData} Style={{ width: 300 }} />
				</Box>
			) : (
				<Chip label={data === EXPECTED_DATA ? 'success!' : 'failed!'} />
			)}

			<Box boxShadow={2} border={2} borderRadius={4} margin={4} padding={4}>
				<QRCode value={EXPECTED_DATA} />
			</Box>

			<div>data: {data}</div>
		</div>
	);
};

export default About;
