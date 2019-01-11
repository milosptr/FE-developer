import React, { Component } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import "inputmask/dist/inputmask";
import Inputmask from "inputmask/dist/inputmask";


import './CreateUser.css';

export class CreateUser extends Component {
  state = {
    id: null,
    first_name: '',
    last_name: '',
    date: new Date(),
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
    // document.querySelector('input[name=phone]').inputmask({ "mask": "(999) 999-9999" });
    Inputmask({ "mask": "(999) 999-9999" }).mask(document.querySelector('input[name=phone]'));
  }

  nameHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  emailHandler = (e) => {
    this.setState({ email: e.target.value });

  }

  phoneHandler = (e) => {
    let phone = e.target.value.split("").filter(c => {
      return !isNaN(c) && c !== " ";
    });
    phone = phone.join("");

    this.setState({ phone: phone });

  }

  dobHandler = (date) => {
    this.setState({ date: date.toLocaleDateString() });
  }

  CreateUser = (f) => {
    f.preventDefault();

    this.props.newUser(this.state);
    this.props.cumodal();
    console.log(this.state)
  }

  render() {
    const { date } = this.state;
    return (
      <section className="CreateNewUser">
        <div className="container">
          <div className="newuserTitle">
            <h3>Create New User</h3>
            <div className="close-modal" onClick={this.props.cumodal}>+</div>
          </div>
          <form className="row" onSubmit={this.CreateUser}>
            <div className="col-md-4">
              <input type="text" name="first_name" placeholder="First Name" onChange={this.nameHandler} required />
            </div>
            <div className="col-md-4">
              <input type="text" name="last_name" placeholder="Last Name" onChange={this.nameHandler} required />
            </div>
            <div className="col-md-4">
              <input type="email" name="email" placeholder="Email address" onChange={this.emailHandler} required />
            </div>
            <div className="col-md-6">
              <input type="text" name="phone" placeholder="Phone Number" onChange={this.phoneHandler} required />
            </div>
            <div className="col-md-6">
              <DayPickerInput onDayChange={this.dobHandler} required />
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