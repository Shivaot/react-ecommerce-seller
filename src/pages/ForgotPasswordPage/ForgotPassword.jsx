import React, { useState } from 'react';
import axios from '../../axios';

const ForgotPassword = (props) => {
    const [email,setEmail] = useState("");
    const [error,setError] = useState(null);

   
    const formSubmitHandler = (e) => {
			e.preventDefault();
			setEmail("");
			axios
				.post("/token", { email: email })
				.then((response) => {
					console.log(response.data);
					props.history.push("/changePassword");
				})
				.catch((error) => {
					console.log(error.response.data.message);
					setError(error.response.data.message);
				});
		};
		const emailChangeHandler = (e) => {
			setEmail(e.target.value);
		};
    return (
        <div className="container h-100">
        <div className="row h-100">
            <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
                <div className="d-table-cell align-middle">

                    <div className="text-center mt-4"> <h3 > Enter your email to reset your password.</h3> </div>

                    <div className="card" style={{marginTop: "10%"}}>
                        <div className="card-body">
                            <div className="m-sm-4">
                                <form onSubmit={formSubmitHandler}>
                                    <div className="form-group">
                                        {error ? <div className="alert alert-danger" role="alert">
						                    {error}
					                    </div> : <h3>Email</h3> }
                                        <input className="form-control form-control-lg" type="email" name="email" placeholder="Enter your email" onChange={(e) => emailChangeHandler(e)} value={email} required />
                                    </div>
                                    <div className="text-center mt-3">
                                     <button type="submit" className="btn btn-lg btn-primary">Send Email</button>
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

export default ForgotPassword;