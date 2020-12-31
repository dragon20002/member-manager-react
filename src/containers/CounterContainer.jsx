import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Counter from '../components/Counter';
import { incrementAsync, decrementAsync, setColor } from '../reducers/Counter';
import utils from '../utils/utils';

const CounterContainer = () => {
  const dispatch = useDispatch();

  // Mapping `State` to `Props`
  const { number, color } = useSelector(({ counter }) => {
    console.log('[mapStateToProps]', 'state', counter);
    return counter;
  });

  // Mapping `Dispatch` to `Props`
  const onIncrement = () => {
    dispatch(incrementAsync());
  };

  const onDecrement = () => dispatch(decrementAsync());

  const onSetColor = () => {
    const color = utils.getRandomColor();
    dispatch(setColor(color));
  };

  return (
    <Counter
      number={number}
      color={color}
      onIncrement={onIncrement}
      onDecrement={onDecrement}
      onSetColor={onSetColor}
    />
  );
};

// const mapStateToProps = ({ counter }) => {
//   console.log('[mapStateToProps]', 'state', counter);
//   return {
//     number: counter.number,
//     color: counter.color,
//   };
// };

// const mapDispatchToProps = (dispatch) => ({
//   onIncrement: () => {
//     console.log('[mapDispatchToProps]', 'dispatch');
//     return dispatch(increment);
//   },
//   onDecrement: () => dispatch(decrement),
//   onSetColor: () => {
//     const color = utils.getRandomColor();
//     console.log('[mapDispatchToProps]', 'onSetColor', color);
//     dispatch(setColor(color));
//   },
// });

export default CounterContainer;
