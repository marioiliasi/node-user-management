import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';

export const PrivateRoute: React.FC<RouteProps> = (props) => {
    if (!localStorage.getItem('user')) {
        const renderComponent = () => <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
        return <Route {...props} component={renderComponent} render={undefined} />;
    } else {
        return <Route {...props} />;
    }
};
