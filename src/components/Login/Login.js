import React from 'react';
import userIcon from '../../assets/icons/user.svg';
import passIcon from '../../assets/icons/pass.svg';
import './Login.css';

const Login = (props) => {

  const state = {
    username: '',
    password: '',
    isAuthenticated: false,
    authToken: null
  };

  const inputFocusHandler = (e) => {
    e.currentTarget.parentElement.classList.add('active');
  }

  const inputChangeHandler = (e) => {
    e.currentTarget.parentElement.classList.add('active');
    state[e.target.name] = e.currentTarget.value;
  }

  const inputBlurHandler = (e) => {
    if (e.target.value === "")
      e.currentTarget.parentElement.classList.remove('active');
  }

  const submitHandler = (e) => {
    e.preventDefault();
    state.isAuthenticated = true;
    state.authToken = "TOKEN";
    props.login(state);
    props.history.push('/users-list/');
  }

  return (
    <section id="LoginSection">
      <div className="LoginContainer">
        <form className="LoginForm" onSubmit={submitHandler}>
          <div className="LoginTitle text-center">
            <h3 className="LoginTitle">Login to Your Account</h3>
          </div>
          <div className="LoginFormBody">
            <div className="form-group">
              <img src={userIcon} alt="" />
              <label htmlFor="username">username</label>
              <input type="text" name="username"
                onFocus={inputFocusHandler}
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
                required />
            </div>
            <div className="form-group">
              <img src={passIcon} alt="" />
              <label htmlFor="password">password</label>
              <input type="password" name="password"
                onFocus={inputFocusHandler}
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
                required />
            </div>
            <div className="form-group">
              <button>Login</button>
            </div>
          </div>
        </form>
        <div className="LoginSideImage"></div>
      </div>
    </section>
  );
}

export default Login;