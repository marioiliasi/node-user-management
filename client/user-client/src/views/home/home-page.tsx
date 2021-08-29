import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../../actions'

function HomePage() {
    const currentUser = useSelector((state: any) => state.users);
    const user = useSelector((state: any) => state.authentication.user);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getById(user.id));
    }, []);


    return (
        <div className="col-lg-8 offset-lg-2">
            <div className="links">
                <Link to={`/`} className="link">Home</Link>&nbsp;
                <Link to={`/users`} className="link">Users</Link>
            </div>
            <h1>Hi {user.firstName}!</h1>
            <h3>Current User's data: </h3>
            {currentUser.loading && <em>Loading data...</em>}
            {currentUser.error && <span className="text-danger">ERROR: {currentUser.error}</span>}
            {currentUser.item &&
            <div>
              <div>First Name: {currentUser.item.firstName}</div>
              <div>Last Name: {currentUser.item.lastName}</div>
            </div>
            }
            <div>
                <Link to="/login">Logout</Link>
            </div>
        </div>
    );
}

export { HomePage };
