import React, { Component } from 'react';

import './CreateUser.css';

export class CreateUser extends Component {
  state = {
    id: null,
    first_name: '',
    last_name: '',
    email: '',
    phone: ''
  }

  componentDidMount() {
    // add user id 
    var maxid = this.props.state.totalAPIUsers;
    this.props.state.usersList.map((obj) => {
      if (obj.id > maxid) maxid = obj.id;
    });
    maxid += 1;
    this.setState({ id: maxid });
  }

  nameHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  emailHandler = (e) => {
    this.setState({ email: e.target.value });
  }

  phoneHandler = (e) => {
    this.setState({ phone: e.target.value });
  }

  CreateUser = (f) => {
    f.preventDefault();

    this.props.newUser(this.state);
    this.props.cumodal();
  }

  render() {
    return (
      <section className="CreateNewUser">
        <div className="container">
          <div className="newuserTitle">
            <h3>Create New User</h3>
            <div className="close-modal" onClick={this.props.cumodal}>+</div>
          </div>
          <form className="row" onSubmit={this.CreateUser}>
            <div className="col-md-6">
              <input type="text" name="first_name" placeholder="First Name" onChange={this.nameHandler} required />
            </div>
            <div className="col-md-6">
              <input type="text" name="last_name" placeholder="Last Name" onChange={this.nameHandler} required />
            </div>
            <div className="col-md-6">
              <input type="email" name="email" placeholder="Email address" onChange={this.emailHandler} required />
            </div>
            <div className="col-md-6">
              <input type="text" name="phone" placeholder="Phone Number" onChange={this.phoneHandler} required />
            </div>
            <div className="col-md-6 m-auto text-center">
              <button>Create</button>
            </div>
          </form>
        </div>
      </section>
    );
  }
}