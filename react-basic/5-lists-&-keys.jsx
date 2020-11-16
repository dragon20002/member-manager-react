function Blog(props) {
  const content = props.posts.map((post) =>
    // 반복할 JSX
    <div key={post.id}> {/* key는 유일한 컬럼으로 사용 */}
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );

  return (
    <div>
      {content}
    </div>
  );
}

const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];
ReactDOM.render(
  <Blog posts={posts} />, // list 전달
  document.getElementById('root')
);
