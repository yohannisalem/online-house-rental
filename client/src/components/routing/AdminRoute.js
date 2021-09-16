import { Redirect, Route } from "react-router-dom";

const AdminRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("AdminToken") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/adminLogin" />
        )
      }
    />
  );
};

export default AdminRoute;