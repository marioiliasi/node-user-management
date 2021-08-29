import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../../actions';

function RegisterPage() {
    const encrypt = (text: string): string => {
        return text;
    }
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        passwordEncrypted: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const registering = useSelector((state: any) => state.registration.registering);
    const dispatch = useDispatch();

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    function handleChange(e: any) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
    }

    function handleSubmit(e: any) {
        e.preventDefault();

        setSubmitted(true);
        if (user.firstName && user.lastName && user.email && user.passwordEncrypted) {
            user.passwordEncrypted = encrypt(user.passwordEncrypted);
            dispatch(userActions.register(user));
        }
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h2>Register</h2>
            <form name="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name*</label>
                    <input type="text" name="firstName" value={user.firstName} onChange={handleChange} className={'form-control' + (submitted && !user.firstName ? ' is-invalid' : '')} />
                    {submitted && !user.firstName &&
                    <div className="invalid-feedback" style={{ color: 'red' }}>First Name is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Last Name*</label>
                    <input type="text" name="lastName" value={user.lastName} onChange={handleChange} className={'form-control' + (submitted && !user.lastName ? ' is-invalid' : '')} />
                    {submitted && !user.lastName &&
                    <div className="invalid-feedback" style={{ color: 'red' }}>Last Name is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Email*</label>
                    <input type="text" name="email" value={user.email} onChange={handleChange} className={'form-control' + (submitted && !user.email ? ' is-invalid' : '')} />
                    {submitted && !user.email &&
                    <div className="invalid-feedback" style={{ color: 'red' }}>Email is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Password*</label>
                    <input type="password" name="passwordEncrypted" value={user.passwordEncrypted} onChange={handleChange} className={'form-control' + (submitted && !user.passwordEncrypted ? ' is-invalid' : '')} />
                    {submitted && !user.passwordEncrypted &&
                    <div className="invalid-feedback" style={{ color: 'red' }}>Password is required</div>
                    }
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">
                        {registering && <span className="spinner-border spinner-border-sm mr-1"/>}
                        Register
                    </button>
                    <Link to="/login" className="btn btn-link">Cancel</Link>
                </div>
            </form>
        </div>
    );
}

export { RegisterPage };
