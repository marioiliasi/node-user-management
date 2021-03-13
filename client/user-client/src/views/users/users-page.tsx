import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../../actions'
import {User} from "../../services/user";

function UsersPage() {
    const users = useSelector((state: any) => state.users);
    const user = useSelector((state: any) => state.authentication.user);
    console.log('#####' + JSON.stringify(user));

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getAllExternal());
    }, []);


    return (
        <div className="col-lg-8 offset-lg-2">
            <h1>Hi {user.firstName}!</h1>
            <h3>All external registered users:</h3>
            {users.loading && <em>Loading users...</em>}
            {users.error && <span className="text-danger">ERROR: {users.error}</span>}
            {users.items &&
            <ul>
                {users.items.map((user: User, index: number) =>
                    <li key={user._id}>
                        {user.firstName + ' ' + user.lastName}
                    </li>
                )}
            </ul>
            }
            <p>
                <Link to="/login">Logout</Link>
            </p>
        </div>
    );
}

export { UsersPage };