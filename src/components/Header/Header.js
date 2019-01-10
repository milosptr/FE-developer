import React from 'react';
import './Header.css';

import logo from '../../assets/images/logo.png';

const Header = (props) => {
    const LogOut = () => {
        props.logout();
        props.history.push("/");
    }

    const usersList = () => {
        props.history.push('/users-list/');
    }

    return (
        <section className="header">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <img src={logo} alt="" />
                    </div>
                    <div className="col-md-8 text-right">
                        <button className="usersListBtn" onClick={usersList}>Users List</button>
                        <button className="newUserBtn" onClick={() => props.cumodal()}>Create New User</button>
                        <button className="logout" onClick={LogOut}>LogOut</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Header;