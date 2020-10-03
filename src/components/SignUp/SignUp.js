import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            referralKey: "",
            agreeToPrivacyPolicy: false
        }
    }

    // function for storing input value to state
    firstNameHandler = (event) => {
        this.setState({
            firstname: event.target.value
        })
    }

    // function for storing input value to state
    lastNameHandler = (event) => {
        this.setState({
            lastname: event.target.value
        })
    }

    // function for storing input value to state
    referralKeyHandler = (event) => {
        this.setState({
            referralKey: event.target.value
        })
    }

    // function for storing input value to state
    agreeToPrivacyPolicyHandler = (event) => {
        this.setState({
            agreeToPrivacyPolicy: true
        })
    }

    // function that invokes on submitting the sign up form
    signUpHandler = (event) => {
        event.preventDefault();
        axios.post('https://hiring.getbasis.co/candidate/users', {
            firstName: this.state.firstname,
            lastName: this.state.lastname,
            email: this.props.email,
            phoneNumber: this.props.phone,
            referredCodeKey: this.state.referralKey,
            agreeToPrivacyPolicy: this.state.agreeToPrivacyPolicy,
            token: this.props.token,
            source: "WEB_APP"
        })
            .then((response) => {
                if (response.data.success) {
                    this.props.changeState("user", response.data.results.user);
                    this.props.history.push('/profile');
                }
            }, (error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="signup-screen my-5" >
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center mt-4 mb-5">
                            <h2>Sign Up</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="offset-md-3 col-md-6">
                            <div className="app-main">
                                <form onSubmit={this.signUpHandler}>
                                    <div className="form-group">
                                        <input type="text"
                                            name="firstname"
                                            placeholder="Please enter your first name"
                                            onChange={this.firstNameHandler}
                                            value={this.state.firstname}
                                            required />
                                    </div>
                                    <div className="form-group">
                                        <input type="text"
                                            name="lastname"
                                            placeholder="Please enter your last name"
                                            onChange={this.lastNameHandler}
                                            value={this.state.lastname}
                                            required />
                                    </div>
                                    <div className="form-group">
                                        <input type="text"
                                            name="key"
                                            placeholder="Enter the referral key i.e, U3DEAQ"
                                            value={this.state.referralKey}
                                            onChange={this.referralKeyHandler}
                                            required />
                                    </div>
                                    <div className="form-group">
                                        <input type="checkbox"
                                            name="privacy-policy"
                                            value={this.state.agreeToPrivacyPolicy}
                                            onChange={this.agreeToPrivacyPolicyHandler}
                                            required />
                                        <label htmlFor="privacy-policy">I agree to Privacy Policy</label>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default withRouter(SignUp);