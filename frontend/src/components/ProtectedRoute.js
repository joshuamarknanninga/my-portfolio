// frontend/src/components/ProtectedRoute.js

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Loader } from 'semantic-ui-react';

const ProtectedRoute = ({ component: Component, adminOnly, ...rest }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader active inline="centered" />;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          adminOnly && !user.isAdmin ? (
            <Redirect to="/" />
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
