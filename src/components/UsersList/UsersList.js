import React, { Component } from 'react';
import Header from '../Header/Header';
import User from './User/User';
import { CreateUser } from '../CreateUser/CreateUser';
import Pagination from './../Pagination/Pagination';
import { EditUser } from './EditUser/EditUser';

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
    let order = [-1, 1];
    let target = e.target.value;
    if (e.target.value === "recent") {
      order = [1, -1];
      target = "id";
    }

    var newData = this.state.usersList.sort(function (a, b) {
      if (a[target] < b[target]) { return order[0]; }
      if (a[target] > b[target]) { return order[1]; }
      return 0;
    })
    this.setState({ usersList: newData, page: 1 });

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
    this.setState({ isEditing: !cond, isEditingUser: user });
  }

  editUser = (id, edited) => {
    const index = this.state.usersList.findIndex(u => u.id === id);
    this.state.usersList[index] = edited;
    this.forceUpdate();
    console.log(edited);
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

  pagination = () => {
    const state = this.state;
    const start = state.page * state.pageLimit - state.pageLimit;
    const end = state.page * state.pageLimit - 1;
    const usersList = state.usersList;

    const offset = Array(end - start + 1).fill().map((u, index) => start + index);
    let usersToDisplay = usersList.filter(
      function (u, i) {
        return this.indexOf(i) >= 0;
      },
      offset
    );

    return usersToDisplay.map((u, i) => {
      return <User data={u} key={i} edit={this.editUserModal} delete={this.deleteUser} />
    });
  }

  render() {
    return (
      <>
        <Header logout={this.props.logout} cumodal={this.createUserModal} {...this.props} />
        <section className="container">
          <div className="row usersList">
            <div className="col-md-12 userFilter">
              Sort by:
                <select onChange={this.sortFilter} id="sort">
                <option value="id">id</option>
                <option value="recent">recent</option>
                <option value="first_name">name</option>
              </select>
            </div>

            {!this.state.isLoading ? (this.pagination()) : "Loading..."}
          </div>

          <Pagination state={this.state} changePage={this.fetchData} />
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