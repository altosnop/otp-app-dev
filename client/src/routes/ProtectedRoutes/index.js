import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const AdminRoute = ({ component: Component, ...restOfProps }) => {
  const auth = useAuth();

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        auth.user ? <Component {...props} /> : <Redirect to={'/admin-login'} />
      }
    />
  );
};

export default AdminRoute;
