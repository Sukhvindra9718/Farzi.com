import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Route } from "react-router-dom";

const ProtectedRoute = ({isAdmin,...rest}) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <Fragment>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              navigate("/login");
              // return <redirect to="/login" />;
            }

            if (isAdmin === true && user.role !== "admin") {
              navigate("/login");
              // return <redirect to="/login" />;
            }

            // return <element {...props} />;
          }}
        />
      )}
    </Fragment>
  );
};

export default ProtectedRoute;
