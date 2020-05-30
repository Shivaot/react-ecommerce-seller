import React, { Component } from 'react';
import { Redirect,NavLink } from 'react-router-dom';
import { connect } from "react-redux";

import FormInput from '../UI/FormInput/FormInput';
import CustomButton from '../UI/CustomButton/CustomButton';
import * as actions from '../../store/actions/index';
import './SignIn.styles.scss';


class SignIn extends Component {
    state = {
        email: '',
        password: ''
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.email,this.state.password);
    }

    inputChangeHandler = (event) => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    }

    render() {     
        
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />
        }
        let spinner = (
            <div className="spinner-border" style={{width: "3rem", height: "3rem"}} role="status">
                <span className="sr-only">Loading...</span>
            </div>
        );
        return (
            <div className="sign-in">
                <h2>I already have an account</h2>
                {this.props.isSeller === "negative" ? <div className="alert alert-danger" role="alert">
						{"Not seller"}
					</div> : null}
                {this.props.error ? (
					<div className="alert alert-danger" role="alert">
						{this.props.error}
					</div>
				) : (
					<span>Sign In with your email and password</span>
				)}

                <form onSubmit={this.submitHandler}>
                    <FormInput name="email" type="email" label="Email" value={this.state.email} handleChange={this.inputChangeHandler} required />
                    <FormInput name="password" type="password" label="Password" value={this.state.password} handleChange={this.inputChangeHandler} required />
                    <div style={{marginLeft: "-70%",marginTop:"-10%",paddingBottom: "10%"}}><NavLink to="/forgotPassword" exact className="link" activeStyle={{ color: 'orange' }}>Forgot Password</NavLink></div>
                    {this.props.loading ? spinner : <CustomButton type="submit">Sign in</CustomButton>}
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        role: state.auth.role,
        isSeller: state.auth.isSeller
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email,password) => dispatch(actions.auth(email,password)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignIn);
