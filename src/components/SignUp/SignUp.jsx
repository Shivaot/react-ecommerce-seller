import React, { Component } from 'react';

import './SignUp.styles.scss';
import FormInput from '../UI/FormInput/FormInput';
import CustomButton from '../UI/CustomButton/CustomButton';
import axios from '../../axios';
import Modal from '../UI/Modal/Modal';

class SignUp extends Component {
	state = {
		formData: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
			companyContact: "",
			companyName: "",
			gst: "",
			addresses: [{
				country: "",
				state: "",
				city: "",
				zipCode: "",
				address: ""
			}]
        },
        loading: false,
        error: null,
		isRegistered: false,
	};

	submitHandler = (event) => {
		event.preventDefault();
        if (this.state.formData.password !== this.state.formData.confirmPassword) {
            this.setState({ error: "Password and Confirm Password do not match"});
            return;
		}
		this.setState({ error: null});
        this.setState({ loading : true});
		axios
			.post("seller/registration", this.state.formData)
			.then((response) => {
                this.setState({ loading: false});
                this.setState({ isRegistered: true});
			})
			.catch((error) => {
                this.setState({ loading: false});
                this.setState({ error: error.response.data.message });
				console.log(error.response.data);
			});
	};

	inputChangeHandler = (event) => {
		const { name, value } = event.target;
		let formData = { ...this.state.formData };
		formData = { ...formData, [name]: value };
		this.setState({ formData });
	};
	
	addressChangeHandler = (event) => {
		const { name, value } = event.target;
		let formData = { ...this.state.formData }
		formData.addresses[0][name] = value;
		this.setState({ formData: formData });
	}
    
    modalClosedHandler = () => {
        this.setState({isRegistered: false});
        this.setState({ formData: {
				firstName: "",
				lastName: "",
				email: "",
				password: "",
				confirmPassword: "",
				companyContact: "",
				companyName: "",
				gst: "",
				addresses: [{
					country: "",
					state: "",
					city: "",
					zipCode: "",
					address: ""
				}]
			}
		});
	}

	render() {
        let spinner = (
            <div className="spinner-border" style={{width: "3rem", height: "3rem"}} role="status">
                <span className="sr-only">Loading...</span>
            </div>
        );
		return (
			<div className="sign-up">
				<h2 className="title">I do not have an account</h2>
				{this.state.error ? (
					<div className="alert alert-danger" role="alert">
						{this.state.error}
					</div>
				) : (
					<span>Sign Up with your email and password</span>
				)}
				<Modal show={this.state.isRegistered} modalClosed={this.modalClosedHandler} color="#d4edda" padding="0px">
					<div className="alert alert-success" role="alert">
						<h4 className="alert-heading">Well done!</h4>
						<p>Registration Successful We will soon activate your activate</p>
					</div>
				</Modal>
				<form className="sign-up-form" onSubmit={this.submitHandler}>
					<FormInput
						type="text"
						name="firstName"
						value={this.state.formData.firstName}
						label="First Name"
						onChange={this.inputChangeHandler}
						required
					></FormInput>
					<FormInput
						type="text"
						name="lastName"
						value={this.state.formData.lastName}
						label="Last Name"
						onChange={this.inputChangeHandler}
						required
					></FormInput>
					<FormInput
						type="email"
						name="email"
						value={this.state.formData.email}
						label="Email"
						onChange={this.inputChangeHandler}
						required
					></FormInput>
					<FormInput
						type="text"
						name="companyContact"
						value={this.state.formData.companyContact}
						label="Company Contact"
						onChange={this.inputChangeHandler}
						required
					></FormInput>
					<FormInput
						type="text"
						name="companyName"
						value={this.state.formData.companyName}
						label="Company Name"
						onChange={this.inputChangeHandler}
						required
					></FormInput>
					<FormInput
						type="text"
						name="gst"
						value={this.state.formData.gst}
						label="Gst"
						onChange={this.inputChangeHandler}
						required
					></FormInput>
					<FormInput
						type="text"
						name="country"
						value={this.state.formData.addresses[0].country}
						label="Country"
						onChange={this.addressChangeHandler}
						required
					></FormInput>
					<FormInput
						type="text"
						name="state"
						value={this.state.formData.addresses[0].state}
						label="State"
						onChange={this.addressChangeHandler}
						required
					></FormInput>
					<FormInput
						type="text"
						name="city"
						value={this.state.formData.addresses[0].city}
						label="City"
						onChange={this.addressChangeHandler}
						required
					></FormInput>
					<FormInput
						type="text"
						name="zipCode"
						value={this.state.formData.addresses[0].zipCode}
						label="Zip Code"
						onChange={this.addressChangeHandler}
						required
					></FormInput>
					<FormInput
						type="text"
						name="address"
						value={this.state.formData.addresses[0].address}
						label="Full Address"
						onChange={this.addressChangeHandler}
						required
					></FormInput>
					<FormInput
						type="password"
						name="password"
						value={this.state.formData.password}
						label="Password"
						onChange={this.inputChangeHandler}
						required
					></FormInput>
					<FormInput
						type="password"
						name="confirmPassword"
						value={this.state.formData.confirmPassword}
						label="Confirm Password"
						onChange={this.inputChangeHandler}
						required
					></FormInput>
                    {this.state.loading ? spinner : <CustomButton type="Submit">SIGN UP</CustomButton>}
				</form>
			</div>
		);
	}
}



export default SignUp;