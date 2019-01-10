import React, { Component } from 'react';
import './User.css';

export class User extends Component {
  state = {
    isEditing: false
  }
  editUser = () => {
    alert("editing");
  }

  deleteUser = () => {
    this.props.delete(this.props.data.id);
  }
  render() {
    return (
      <div className="single-user">
        <div className="row">
          <div className="col-md-4">
            <img src={this.props.data.avatar} alt="" />
          </div>
          <div className="col-md-8">
            {this.state.isEditing ? "Editing mode on..." : null}
            <p className="user-info">{this.props.data.first_name} {this.props.data.last_name}</p>
            <div className="edit-buttons">
              <button className="edit" onClick={this.editUser}>Edit User</button>
              <button className="delete" onClick={this.deleteUser}>Delete User</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

