import './loader.css';

function Loader(): JSX.Element {
  return (
    <div className="container">
      <p className="visually-hidden">Loading</p>
      <div className="lds-dual-ring"></div>
    </div>
  );
}

export default Loader;
