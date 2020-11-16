# Form

1. Controlled Component

- 양방향 바인딩
- Single source of truth : 코드로 값 변경 가능

```js
class SurveyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      essay: 'Please write an essay about your favorite DOM element.',
      flavor: 'coconut',
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEssayChange = this.handleEssayChange.bind(this);
    this.handleFlavorChange = this.handleFlavorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // 양방향 바인딩
  // -- input value가 변경되면 state의 변수 수정
  // -- state의 변수가 변경되면 input value 수정
  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleEssayChange(event) {
    this.setState({essay: event.target.value});
  }

  handleFlavorChange(event) {
    this.setState({flavor: event.target.value});
  }

  handleSubmit(event) {
    console.log('Submitted :', this.state);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={this.state.name} onChange={this.handleNameChange} />
        </label>
        <label>
          Display:
          <input type="text" name="display" value={`${this.state.name} 님`} readonly>
        </label>

        <label>
          Essay:
          <textarea name="essay" value={this.state.essay} onChange={this.handleEssayChange} />
        </label>

        <label>
          Pick your favorite flavor:
          <select name="flavor" value={this.state.flavor} onChange={this.handleFlavorChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

2. Uncontrolled Component

- (사용자 입력을 통한) 단방향 바인딩
- 코드로 값 변경 불가

```js
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.nameInput = React.createRef();
    this.fileInput = React.createRef();
  }

  handleSubmit(event) {
    console.log('A name was submitted: ', this.nameInput.current.value);
    console.log('A file was submitted: ', this.fileInput.current.files[0].name);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {/* 단방향 바인딩 */}
        <label>
          Name:
          <input type="text" ref={this.nameInput} />
        </label>

        {/* defaultValue / defaultChecked */}
        <label>
          Display:
          <input type="text" ref={this.nameInput} defaultValue="Bob" />
        </label>

        <label>
          Profile Image:
          <input type="file" ref={this.fileInput} />

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```
