import * as React from 'react';
import { Redirect, Route } from 'react-router';

export const PrivateRoute: any = (props: any) => {
    const localStorageUser: any = localStorage.getItem('user');
    if (!localStorageUser) {
        const renderComponent = () => <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
        return <Route {...props} component={renderComponent} render={undefined} />;
    } else {
        const user = JSON.parse(localStorageUser);
        if(props.roles && !props.roles.includes(user.role)){
            console.log('========');
            console.log(props.roles);
            console.log(JSON.stringify(user));
            const renderComponent = () => <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
            return <Route {...props} component={renderComponent} render={undefined} />;
        }
        return <Route {...props} />;
    }
};
