import React, { useRef, useState } from 'react';
import Counter from '../components/Counter';
import Style from './About.module.css';
import QrReader from 'react-qr-scanner';
import QRCode from 'react-qr-code';
import { Box, Button, Chip } from '@material-ui/core';

const EXPECTED_DATA = 'abcd123123';

const About = () => {
	/**
	 * canvas: canvas
	 * format: 11
	 * numBits: 152
	 * rawBytes:
	 * Uint8Array(19)
	 * [64, 166, 22, 38, 54, 67, 19, 35, 51, 19, 35, 48, 236, 17, 236, 17, 236, 17, 236]
	 * resultMetadata: Map(2) {2 => Array(1), 3 => "L"}
	 * resultPoints: (3) [{x: 269, y: 362.5, estimatedModuleSize: 10.642857142857142, count: 2}, {x: 262, y: 222.5, estimatedModuleSize: 10.214285714285715, count: 2}, {x: 407.5, y: 218.5, estimatedModuleSize: 10, count: 6}]
	 * text: "abcd123123"
	 * timestamp: 1630624165287
	 * __proto__: Object
	 */
	const [data, setData] = useState();
	const [error, setError] = useState();

	// const qrReaderRef = useRef();

	console.log(data);
	// console.log(qrReaderRef);

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

			<Box boxShadow={2} border={1} borderRadius={4} margin={1}>
				<QrReader
					delay={500}
					onError={setError}
					onScan={setData}
					// legacyMode
					// ref="reader"
					// onImageLoad={}
				/>
			</Box>

			{/* <Button
				variant="outlined"
				size="small"
				color="primary"
				onClick={() => {
					console.log(qrReaderRef);
					if (qrReaderRef && qrReaderRef.current) {
						qrReaderRef.current.openImageDialog();
					}
				}}
			>
				이미지 선택
			</Button> */}

			{/* <div>data: {data}</div> */}
			<div>err: {error && error.message}</div>
			<Chip label={data && data.text === EXPECTED_DATA ? 'success!' : 'failed!'} />

			<Box boxShadow={2} border={1} borderRadius={4} margin={1} padding={1}>
				<QRCode value={EXPECTED_DATA} />
			</Box>
		</div>
	);
};

export default About;
