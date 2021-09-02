import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../context/Auth";

const ProtectedComponent = ({ component: Component, ...rest }) => {
  const { setErrMsg, currentUser } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (currentUser) {
          return <Component {...props} />;
        } else {
          setErrMsg("Please login first!");
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default ProtectedComponent;
