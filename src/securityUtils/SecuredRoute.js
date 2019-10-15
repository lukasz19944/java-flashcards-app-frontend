import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const SecuredRoute = ({
  component: Component,
  security,
  role,
  ...otherProps
}) => (
  <Route
    {...otherProps}
    render={props =>
      security.valid_token === true ? (
        role && !security.user.authority.includes(role) ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      ) : (
        <Redirect to="login" />
      )
    }
  />
);

const mapStateToProps = state => ({
  security: state.security
});

export default connect(mapStateToProps)(SecuredRoute);
