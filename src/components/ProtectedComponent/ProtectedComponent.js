import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../context/Auth";

const ProtectedComponent = ({
  currentUser: currentUser,
  component: Component,
  ...rest
}) => {
  const { setErrMsg } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (true) {
          return <Component />;
        } else {
          setErrMsg("Please login first!");
          return (
            <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
          );
        }
      }}
    />
  );
};

export default ProtectedComponent;
