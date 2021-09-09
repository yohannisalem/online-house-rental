import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("landlordToken") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/landlordLogin" />
        )
      }
    />
  );
};

export default PrivateRoute;
