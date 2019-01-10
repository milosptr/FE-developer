import React, { Component } from 'react';
import Header from '../Header/Header';
import User from './User/User';
import { CreateUser } from '../CreateUser/CreateUser';
import Pagination from './../Pagination/Pagination';
import {EditUser} from './EditUser/EditUser';

import './UsersList.css';

export class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      totalPages: 1,
      pageLimit: 3,
      totalUsers: 0,
      APIdata: [],
      usersList: [],
      deletedUsers: [],
      isLoading: true,
      isAuthenticated: props.state.isAuthenticated,
      authToken: props.state.authToken,
      createUserModal: false,
      isEditing: false,
      isEditingUser: null
    }
  }

  mergeUsers = (local, newArray) => {
    return local.concat(newArray.filter(a => !local.find(b => b.id === a.id)));
  }

  fetchData = (p) => {
    p = parseInt(p);
    if (p === undefined || p === null)
      p = 1;

    this.setState({ page: p, isLoading: true });
    fetch('https://reqres.in/api/users?page=' + p + '')
      .then(results => results.json())
      .then(data => {
        var users = data.data.filter(
          function (e) {
            return this.indexOf(e.id) < 0;
          },
          this.state.deletedUsers
        );
        // merge with local users
        const localUsers = this.state.usersList;
        const mergedUsers = this.mergeUsers(localUsers, users);
        this.setState({
          totalUsers: mergedUsers.length,
          usersList: mergedUsers,
          totalPages: data.total_pages,
          totalAPIUsers: data.total,
          isLoading: false
        });
      });
  }

  componentWillMount = () => {
    if (!this.state.isAuthenticated)
      this.props.history.push("/");
  }

  componentDidMount = () => {
    this.fetchData(this.state.page);
  }

  sortFilter = (e) => {
    var newData = this.state.usersList.sort(function (a, b) {
      if (a[e.target.value] < b[e.target.value]) { return -1; }
      if (a[e.target.value] > b[e.target.value]) { return 1; }
      return 0;
    })
    this.setState({ usersList: newData });
  }

  createUserModal = () => {
    if (this.state.authToken !== "TOKEN") {
      alert("You don't have premission to create new user!");
      return;
    }

    const cond = this.state.createUserModal;
    this.setState({ createUserModal: !cond });
  }

  createNewUser = (usr) => {
    let users = this.state.usersList.slice();
    users.push(usr);
    let totalUsers = this.state.totalUsers + 1;
    this.setState({ totalUsers: totalUsers, usersList: users });
  }

  editUserModal = (id) => {
    if (this.state.authToken !== "TOKEN") {
      alert("You don't have premission to create new user!");
      return;
    }

    const cond = this.state.isEditing;
    const index = this.state.usersList.findIndex(u => u.id === id);
    const user = this.state.usersList[index];
    this.setState({isEditing: !cond, isEditingUser: user});
  }

  editUser = (id, edited) => {
    const index = this.state.usersList.findIndex(u => u.id === id);
      this.state.usersList[index] = edited;
      this.forceUpdate();
  }


  deleteUser = (id) => {
    if (this.state.authToken !== "TOKEN") {
      alert("You don't have premission to edit/delete user!");
      return;
    }
    let totalUsers = this.state.totalUsers - 1;
    const usersList = this.state.usersList;
    const index = usersList.findIndex(u => u.id === id);
    usersList.splice(index, 1);
    const deletedUsers = this.state.deletedUsers;
    deletedUsers.push(id);
    this.setState({ totalUsers: totalUsers, usersList: usersList, deletedUsers: deletedUsers });
  }

  render() {
    return (
      <>
        <Header logout={this.props.logout} cumodal={this.createUserModal} {...this.props} />
        <section className="container">
          <div className="row usersList">
            <div className="col-md-12 userFilter">
              Sort by:
                <select onChange={this.sortFilter}>
                <option value="id" defaultValue>id</option>
                <option value="first_name">name</option>
              </select>
            </div>

            {!this.state.isLoading ? (
              this.state.usersList.map((u, i) => {
                return <User data={u} key={i} edit={this.editUserModal} delete={this.deleteUser} />
              })
            ) : "Loading..."}
          </div>

          <Pagination totalPages={this.state.totalPages} curr={this.state.page} changePage={this.fetchData} />
        </section>

        {this.state.createUserModal ? (
          <section className="createNewUserModal">
            <CreateUser cumodal={this.createUserModal} newUser={this.createNewUser} state={this.state} />
          </section>
        ) : null}

        {this.state.isEditing ? (
          <section className="createNewUserModal">
            <EditUser eumodal={this.editUserModal} editUser={this.editUser} state={this.state.isEditingUser} />
          </section>
        ) : null}
      </>
    )
  }
}