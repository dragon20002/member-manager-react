// # JSX

/*** Create a element ***/

// -- Case 1 -> JSX
const element = (
  <h1 class="greeting">
    Hello, world!
  </h1>
);

// -- Case 2 -> React.createElement
element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!',
);

// -- Case 3 -> Tree
element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!',
  },
};

/*** Render ***/

ReactDOM.render(
  element,
  document.getElementById('root'),
);
