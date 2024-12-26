import { useRouteError } from "react-router-dom";
import "./style.css";

const Error = () => {
  const error = useRouteError();

  return (
    <div className="error-container">
      <h3 className="error-title">{error.status} Ops!</h3>
      <p className="error-description">{error.data}</p>
    </div>
  );
};

export default Error;
