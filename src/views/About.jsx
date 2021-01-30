import React from 'react';
import Counter from '../components/Counter';
import Style from './About.module.css';

const About = () => (
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
  </div>
);

export default About;
