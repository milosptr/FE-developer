import React, { Component } from 'react';

import './EditUser.css';

export class EditUser extends Component {
  state = {
    id: null,
    first_name: '',
    last_name: '',
    photo: ''
  }

  componentDidMount() {
      const state = this.props.state;
      this.setState({...state});
  }

  nameHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  photoHandler = (e) => {
    //this.setState({ phone: e.target.value });
  }

  EditUser = (f) => {
    f.preventDefault();

    this.props.editUser(this.props.state.id, this.state);
    this.props.eumodal();
  }

  eumodal = () => {
    this.props.eumodal();
  }

  render() {
    return (
      <section className="CreateNewUser">
        <div className="container">
          <div className="newuserTitle">
            <h3>Edit User</h3>
            <div className="close-modal" onClick={this.eumodal}>+</div>
          </div>
          <form className="row" onSubmit={this.EditUser}>
            <div className="col-md-6">
              <input type="text" name="first_name" placeholder="First Name" onChange={this.nameHandler} />
            </div>
            <div className="col-md-6">
              <input type="text" name="last_name" placeholder="Last Name" onChange={this.nameHandler} />
            </div>
            <div className="col-md-12">
              <input type="file" name="photo" accept="image/*" onChange={this.photoHandler}/>
            </div>
            <div className="col-md-6 m-auto text-center">
              <button>Submit Edit</button>
            </div>
          </form>
        </div>
      </section>
    );
  }
}