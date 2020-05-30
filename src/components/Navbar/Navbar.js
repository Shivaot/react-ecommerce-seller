import React from "react";
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";


import classes from "./Navbar.module.css";


const Navbar = (props) => {
	if (!props.isAuthenticated) {
		return null;
	}
	return (
		<div id="navbarDiv">
			<header className={classes.header}>
				<form style={{display: "flex",marginLeft: "25%"}}>
					<input type="text" name="search" placeholder="Search.." />
					<button type="button" className="btn btn-info" style={{marginLeft: "2%",height: "40px",marginTop: "3px"}}>Search</button>
				</form>
				<ul className={classes.mainNav} style={{marginLeft: "20%"}}>
					{props.isAuthenticated ? <li> <NavLink to="/products" exact className="link" activeStyle={{ color: 'orange' }}>Products</NavLink> </li> : null}
					{props.isAuthenticated ? <li> <NavLink to="/logout" activeStyle={{ color: 'orange' }} className="link">Logout</NavLink> </li> : <li> <NavLink to="/signin" activeStyle={{ color: 'orange' }} className="link">Sign In</NavLink> </li>}
					{props.isAuthenticated ? <li> <NavLink to="/profile" exact className="link" activeStyle={{ color: 'orange' }}>Profile</NavLink> </li> : null}
				</ul>
			</header>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null,
	}
}

export default connect(mapStateToProps)(Navbar);

