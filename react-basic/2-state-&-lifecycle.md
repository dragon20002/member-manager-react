# State & Lifecycle

1. 함수형 컴포넌트
  ```js
  function Clock(props) { // Component
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }

  function tick() {
    ReactDOM.render(
      <Clock date={new Date()} />,
      document.getElementById('root')
    );
  }

  setInterval(tick, 1000);
  ```
- 함수로 구현한 Component.
- 현재 시간을 props로 주입함.

2. 클래스형 컴포넌트

- React.Component를 상속받은 Class로 Component를 구현.
- state를 가질 수 있음.
- `props`
  ```js
  class Clock extends React.Component {
    render() {
      return (
        <div>
          <h1>Hello, world!</h1>
          <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
        </div>
      );
    }
  }

  function tick() {
    ReactDOM.render(
      <Clock date={new Date()} />, // props.date 전달
      document.getElementById('root')
    );
  }

  setInterval(tick, 1000);
  ```

- `state`
  ```js
  class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = { // [State] define a state
        date: new Date(),
      };
    }

    /*** Life-cycle methods ***/

    // [Life-cycle] on inserted into DOM
    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000,
      );
    }

    // [Life-cycle] on deleted from DOM
    componentWillUnmount() {
      clearInterval(this.timerID);
    }

    /*** User methods ***/

    tick() {
      this.setState({ // [State] modify the state
        date: new Date(),
      });
    }

    /*** Overrided methods ***/

    render() {
      return (
        <div>
          <h1>Hello, world!</h1>
          <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        </div>
      );
    }
  }

  ReactDOM.render(
    <Clock />,
    document.getElementById('root'),
  );
  ```
  - 현재 시간을 state로 관리하여, Component가 직접 제어함.
  - State 추가 : 생성자에서만! <code>this.state.xx = 'yy';</code>
  - State 읽기 : <code>this.state.xx;</code>
  - State 수정
    - <code>this.setState({xx: 'zz'})</code>
    - 이전 state 또는 props를 사용하여 수정할 경우
      ```js
      this.setState((state, props) => {
        counter: this.state.counter + this.props.increment,
      });
      ```
    - state의 변수 수정 결과는 병합됨.
      ```js
      constructor(props) {
        this.state = {
          posts: ['aa', 'bb'],
          comments: ['com1', 'com2'],
        };
      }

      someMethod() {
        this.setState((state) => {
          posts: state.posts.push('cc'), // posts만 수정
        });
        // posts : ['aa', 'bb', 'cc'] -- 수정
        // comments : ['com1', 'com2'] -- 유지
      }
      ```
  - Component는 독립적으로 동작함
    ```js
    function App() {
      return (
        <div>
          <Clock /> <!-- +0.0 ms -->
          <Clock /> <!-- +0.1 ms -->
          <Clock /> <!-- +0.2 ms -->
        </div>
      );
    }

    ReactDOM.render(
      <App />,
      document.getElementById('root')
    );
    ```
