import React, { useState } from 'react';
import { NavLink} from 'react-router-dom';
import axios from '../../axios';

const ChangePassword = () => {
    const [token,setToken] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [error,setError] = useState(null);
    const [success,setSuccess] = useState(false);

    const tokenChangeHandler = (e) => setToken(e.target.value);
    const passwordChangeHandler = (e) => setPassword(e.target.value);
    const confirmPasswordChangeHandler = (e) => setConfirmPassword(e.target.value);

    const formSubmitHandler = (e) => {
        e.preventDefault();
        setToken("");
        setPassword("");
        setConfirmPassword("");
        axios.put('/resetPassword',{"token":token,"pass":password,"cpass":confirmPassword})
            .then(response => {
                // console.log(response.data);
                setSuccess(true);
            })
            .catch(error => {
                console.log(error.response.data.message);
                setError(error.response.data.message);
            })
    }

    return (
        <div className="container h-100">
        <div className="row h-100">
            <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
                <div className="d-table-cell align-middle">

                    <div className="text-center mt-4">
                        <h3>
                           Update your password
                        </h3>
                    </div>

                    <div className="card" style={{marginTop: "10%"}}>
                        <div className="card-body">
                            <div className="m-sm-4">
                                <form onSubmit={formSubmitHandler}>
                                    <div className="form-group">
                                        {error ? <div className="alert alert-danger" role="alert">
						                    {error}
					                    </div> : null }
                                        {success ? <div className="alert alert-success" role="alert">
						                    {"Password Changed Successfully"}  <NavLink to="/signin" activeStyle={{ color: 'orange' }} className="link">SIGNIN</NavLink>
					                    </div> : null }
                                        <input className="form-control" style={{marginBottom: "5%"}} type="password" name="token" placeholder="Verification Code" value={token} onChange={(e) => tokenChangeHandler(e)}  required />
                                        <input className="form-control" style={{marginBottom: "5%"}} type="password" name="password" placeholder="password" value={password} onChange={(e) => passwordChangeHandler(e)}  required />
                                        <input className="form-control" style={{marginBottom: "5%"}} type="password" name="confirmPassword" placeholder="confirm password" value={confirmPassword} onChange={(e) => confirmPasswordChangeHandler(e)}  required />
                                    </div>
                                    <div className="text-center mt-3">
                                     <button type="submit" className="btn btn-lg btn-primary">Change password</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    );
};

export default ChangePassword;