import './LoadingBar.css';

function LoadingBar(props) {
  const isLoading = props.isLoading;

  return (
    <div>
      {isLoading && <div className="loader-back" />}
      {isLoading && <div className="loader" />}
    </div>
  ); 
}

export default LoadingBar;