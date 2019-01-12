import React, { Component } from 'react';
import axios from 'axios';
import './EditUser.css';

export class EditUser extends Component {
  state = {
    id: null,
    first_name: '',
    last_name: '',
    avatar: '',
    uploaded: true
  }


  componentDidMount() {
    const state = this.props.state;
    this.setState({ ...state });
  }

  nameHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  photoHandler = (e) => {
    this.setState({uploaded: false})
    const cloudName = 'milosptr';
    const unsignedUploadPreset = 'milosptrpreset';
    let url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    let data = new FormData();
    data.append('upload_preset', unsignedUploadPreset);
    data.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
    data.append('file', document.querySelector('input[type=file]').files[0]);

    axios.post(url, data)
      .then((res) => {
        this.setState({ avatar: res.data.secure_url, uploaded: true });
      });
  }

  EditUser = (f) => {
    f.preventDefault();
    let state = this.state;
    delete state.uploaded;

    this.props.editUser(this.props.state.id, state);
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
              <input type="file" name="photo" accept="image/*" onChange={this.photoHandler} />
            </div>
            <div className="col-md-6 m-auto text-center">
            {this.state.uploaded ? <button >Submit Edit</button> : "Uploading avatar..."}
            </div>
          </form>
        </div>
      </section>
    );
  }
}
