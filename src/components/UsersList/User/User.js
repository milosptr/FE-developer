import React from 'react';
import './User.css';

const User = (props) => {

  const editUser = () => {
    props.edit(props.data.id);
  }

  const deleteUser = () => {
    props.delete(props.data.id);
  }
    return (
      <div className="single-user">
        <div className="row">
          <div className="col-md-4">
            <img src={props.data.avatar} alt="" />
          </div>
          <div className="col-md-8">
            <p className="user-info">{props.data.first_name} {props.data.last_name}</p>
            <div className="edit-buttons">
              <button className="edit" onClick={editUser}>Edit User</button>
              <button className="delete" onClick={deleteUser}>Delete User</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  export default User

