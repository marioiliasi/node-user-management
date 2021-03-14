import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {alertActions, userActions} from '../../actions'
import {UserRole} from "../../services/user";

function UsersPage() {

    const users = useSelector((state: any) => state.users);
    const user = useSelector((state: any) => state.authentication.user);
    const [inputs, setInputs] = useState(new Map());

    const initialUser: any = {
        _id: '',
        email: '',
        passwordEncrypted: '',
        role: UserRole.EXTERNAL,
        firstName: '',
        lastName: '',
        editMode:true,
    };

    console.log('dgdgdsgsggds');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getAllExternal());
    }, []);

    function handleChange(id: any, e: any) {
        const { name, value } = e.target;
        // console.log(value);
        // console.log(name);
        const newInputs = new Map(inputs);
        const changedUser = newInputs.get(id);
        changedUser[name] = value;
        newInputs.set(id, changedUser);
        setInputs(newInputs);
    }

    const toggleSaveOrUpdate = (user: any) => {
        delete user.editMode;
        dispatch(userActions._delete(user));
        if(!user._id){
            if(!user.passwordEncrypted){
                dispatch(alertActions.error("Please provide a password"));
                return;
            } else {
                delete user._id;
                dispatch(userActions.create(user));
            }
        } else{
            dispatch(userActions.update(user));
        }
    }

    const toggleEdit = (user: any, mode: boolean) => {
        user.editMode = mode;
        const newInputs = new Map(inputs);
        if(!user.editMode){
            newInputs.delete(user._id);
            setInputs(newInputs)
        } else {
            newInputs.set(user._id, user);
            setInputs(newInputs);
        }
        dispatch(userActions.refresh(user));
    }

    const addUser = () => {
        const exists = users.items.filter((user: any) => user._id.length === 0).length;
        if(!exists){
            dispatch(userActions.addEmpty({...initialUser}));
            const newInputs = new Map(inputs);
            newInputs.set(initialUser._id, {...initialUser});
            setInputs(newInputs);
        } else {
            dispatch(alertActions.error("Please save the current user that you're trying to add"));
        }

    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h1>Hi {user.firstName}!</h1>
            <h3>All external registered users:</h3>
            <table>
                <thead>
                <tr>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    {
                        users.items && users.items.filter((user: any) => user.editMode).length > 0 ?
                        <th>Password</th> : ''
                    }
                    <th>Actions</th>
                </tr>
                </thead>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                <tbody>
                {users.items ?
                    users.items.map((user: any, index: number) =>
                        <tr>
                            <td key={user._id + user.email} >
                                {
                                    user.editMode ?
                                        (<input type="text" name="email" onChange={(e) => {handleChange(user._id, e)}} value={inputs.get(user._id) ? inputs.get(user._id).email : user.email}/>):
                                        (<td>{user.email}</td>)
                                }
                            </td>
                            <td key={user._id + user.firstName}>
                                {
                                    user.editMode ?
                                        (<input type="text" name="firstName" onChange={(e) => {handleChange(user._id, e)}} value={inputs.get(user._id) ? inputs.get(user._id).firstName : user.firstName}/>):
                                        (<td>{user.firstName}</td>)
                                }
                            </td>
                            <td key={user._id + user.lastName}>
                                {
                                    user.editMode ?
                                        (<input type="text" name="lastName" onChange={(e) => {handleChange(user._id, e)}} value={inputs.get(user._id) ? inputs.get(user._id).lastName : user.lastName}/>):
                                        (<td>{user.lastName}</td>)
                                }
                            </td>
                            {
                                user.editMode ?
                                <td key={user._id + user.passwordEncrypted}>
                                    <input type="text" name="passwordEncrypted" onChange={(e) => {handleChange(user._id, e)}} value={inputs.get(user._id) ? inputs.get(user._id).passwordEncrypted : ''}/>
                                </td> : ''
                            }
                            <td>
                                <button id={user._id + 'edit'} className="button muted-button" onClick={() => {user.editMode ? toggleSaveOrUpdate(inputs.get(user._id) ? inputs.get(user._id) : user) : toggleEdit(user, true)}}>{user.editMode ? 'Save' : 'Edit'}</button>
                                {
                                    user.editMode ?
                                        <button id={user._id + 'cancel'} className="button muted-button"
                                                onClick={() => toggleEdit(user, false)}>Cancel
                                        </button> : ''
                                }
                                <button id={user._id + 'delete'} className="button muted-button" onClick={() => {if(window.confirm('Delete the item?')){dispatch(userActions._delete(user._id))}}}>Delete</button>
                            </td>
                            <input
                                type="submit"
                                value="submit"
                                className="display-none"
                                style={{ display: 'none' }}
                            />
                        </tr>
                    ) : ''
                }
                <button id={user._id + 'add'} className="button muted-button" onClick={() => addUser()}>Add</button>
                </tbody>
            </table>
            <p>
                <Link to="/login">Logout</Link>
            </p>
        </div>
    );
}

export { UsersPage };
