import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';  


import './App.css';
import Navbar from './components/Navbar/Navbar';
import AuthPage from './pages/AuthPage/AuthPage';
import * as actions from './store/actions/index';
import Logout from './pages/AuthPage/Logout/Logout';
import ForgotPassword from './pages/ForgotPasswordPage/ForgotPassword';
import ChangePassword from './pages/ForgotPasswordPage/ChangePassword';

function App(props) {
  const { onAutoSignIn } = props;
  
  useEffect(() => {  
    onAutoSignIn();
  }, [onAutoSignIn]);


  let routes = (
    <Switch>
      <Route exact path="/signin" component={AuthPage} />
      <Route exact path="/" component={AuthPage} />
      <Route exact path="/forgotPassword" component={ForgotPassword} />
      <Route exact path="/changePassword" component={ChangePassword} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/products" render={() => <p>products</p>} />
        <Redirect to="/products" />
    </Switch>
    );
  }
  return (
    <div className="App">
      <Navbar />
        {routes}
      </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null, 
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAutoSignIn: () => dispatch(actions.authCheckState())
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(App);
