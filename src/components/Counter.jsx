import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setColor } from '../reducers/Counter';
import utils from '../utils/utils';
import './Counter.css';

const Counter = () => {
	const dispatch = useDispatch();

	// Mapping `State` to `Props`
	const { number = 0, color = 'black' } = useSelector(({ counter }) => counter);

	// Mapping `Dispatch` to `Props`
	const onIncrement = () => dispatch({ type: 'incrementAsync' });
	const onDecrement = () => dispatch({ type: 'decrementAsync' });
	const onSetColor = () => {
		const color = utils.getRandomColor();
		dispatch(setColor(color));
	};

	return (
		<div
			className="Counter"
			onClick={onIncrement}
			onContextMenu={(e) => {
				e.preventDefault();
				onDecrement();
			}}
			onDoubleClick={onSetColor}
			style={{ backgroundColor: color }}
		>
			{number}
		</div>
	);
};

Counter.propTypes = {};

Counter.defaultProps = {};

export default Counter;
