// # Lifting State Up

/**
 * - 하향식 데이터 흐름
 *   - 자신의 State를 자식 컴포넌트에 props로 전달할 수 있다.
 *   - 자식 컴포넌트의 사용자 입력을 상위 컴포넌트에 전달할 때 Callback을 활용할 수 있다.
 *   - 장점 : 격리성 증가, (state를 가진 컴포넌트를 추적하면 되므로) 디버깅이 쉬워짐
 *   - 단점 : `보일러 플레이트` 코드 유발
 * 
 * - 기능 요약
 *   Calculator
 *   ├ TemperatureInput // 섭씨 온도 입력
 *   ├ TemperatureInput // 화씨 온도 입력
 *   └ BoilingVerdict // 현재 온도값 출력
 * 
 *   TemperatureInput 컴포넌트에 온도가 입력되면 BoilingVerdict 컴포넌트와 다른 하나의 TemperatureInput의 입력값도 동기화되어 변경되어야 한다.
 */

/*** Utils ***/

// 섭씨, 화씨 변환
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit',
};

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

/*** Components ***/

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    // Callback 함수로 다른 컴포넌트에 입력값 전달
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const scale = this.props.scale;
    const temperature = this.props.temperature;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
          onChange={this.handleChange} />
      </fieldset>
    );
  }
}

function BoilingVerdict(props) {
  if (props.celsius >= 180) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    // Source of Truth
    this.state = { scale: '', temperature: '' };
  }

  // 다른 컴포넌트로부터 호출되어 State 변경
  handleCelsiusChange(temperature) {
    this.setState({ scale: 'c', temperature });
  }

  handleFahrenheitChange(temperature) {
    this.setState({ scale: 'f', temperature });
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict celsius={parseFloat(celsius)} />
      </div>
    );
  }
}
