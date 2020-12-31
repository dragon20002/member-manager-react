import React from 'react';
import CounterContainer from '../containers/CounterContainer';
import Style from './About.module.css';

const About = () => (
  <div>
    <h3 className={Style.h3}>여긴 이런 사람이 만들었습니다.</h3>
    <p>
      mw-kim
      <br />
      mw-kim@****.net
      <br />
      010-****-****
    </p>
    <CounterContainer />
  </div>
);

export default About;
