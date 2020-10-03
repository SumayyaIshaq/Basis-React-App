import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';

class Profile extends Component {

    // function that invokes on clicking the logout button
    logoutHandler = () => {
        const url = "https://hiring.getbasis.co/candidate/users/logout/" + this.props.user._id;
        const token = this.props.user._id + "," + this.props.user.token;
        axios.delete(url, {
            headers: {
                Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
        }).then((response) => {
            if (response.data.success) {
                this.props.history.push('/');
            }
        }, (error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <div className="profile-card my-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center mt-4 mb-5">
                            <h2>Welcome {this.props.user.firstName}!</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="offset-md-4 col-md-4">
                            <div className="profile-details">
                                <div className="user-image">
                                    <img src="/assets/images/user-dummy.png" alt="Avatar" />
                                </div>
                                <div className="user-details my-4">
                                    <h5>
                                        <span className="fa fa-user"></span>
                                        <span> {this.props.user.firstName} {this.props.user.lastName} </span>
                                    </h5>
                                    <p>
                                        <span className="fa fa-envelope"></span>
                                        <span>{this.props.user.email}</span>
                                    </p>
                                    <p>{this.props.user.referralMessage}</p>
                                </div>
                                <div className="logout">
                                    <button className="logout-btn" onClick={this.logoutHandler}>Logout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Profile);