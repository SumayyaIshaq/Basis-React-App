import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Email extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            verificationCode: '',
            verified: false
        }
    }

    // function for storing input value to state
    emailHandler = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    // function for storing input value to state
    verificationCodeHandler = (event) => {
        this.setState({
            verificationCode: event.target.value
        })
    }

    // function that invokes on submitting the email
    requestEmailHandler = (event) => {
        event.preventDefault();
        axios.post('https://hiring.getbasis.co/candidate/users/email', {
            phoneNumber: this.props.phone,
            token: this.props.token,
            email: this.state.email
        })
            .then((response) => {
                this.setState({
                    verified: true
                })
            }, (error) => {
                console.log(error);
            });

    }

    // function that invokes on verifying the email by submitting the referral key
    verifyEmailHandler = (event) => {
        event.preventDefault();
        axios.post('https://hiring.getbasis.co/candidate/users/email/verify', {
            email: this.state.email,
            token: this.props.token.toString(),
            verificationToken: this.state.verificationCode
        })
            .then((response) => {
                if (response.data.success) {
                    this.props.changeState("email", this.state.email);
                    this.props.history.push('/signup');
                }
            }, (error) => {
                console.log(error);
            });
    }

    render() {


        return (
            <div className="email-screen my-5" >
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center mt-4 mb-5">
                            <h2>Welcome!</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="offset-md-3 col-md-6">
                            <div className="app-main">
                                {this.state.verified ?
                                    <VerifyMail verificationCode={this.state.verificationCode} verificationCodeHandler={this.verificationCodeHandler} verifyEmailHandler={this.verifyEmailHandler} /> :
                                    <RequestMail email={this.state.email} emailHandler={this.emailHandler} requestEmailHandler={this.requestEmailHandler} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

// RequestMail Component
const RequestMail = (props) => {
    return (
        <div className="request-email">
            <form onSubmit={props.requestEmailHandler}>
                <div className="form-group">
                    <input type="email"
                        name="email"
                        placeholder="Please enter your email"
                        value={props.email}
                        onChange={props.emailHandler}
                        required />
                </div>
                <div className="form-group">
                    <button type="submit">Verify</button>
                </div>
            </form>
        </div>
    )
}

// VerifyMail Component
const VerifyMail = (props) => {
    return (
        <div className="verify-email">
            <form onSubmit={props.verifyEmailHandler}>
                <div className="form-group">
                    <input type="text"
                        name="verification-code"
                        placeholder="Enter the verification code i.e, 112233"
                        value={props.verificationCode}
                        onChange={props.verificationCodeHandler}
                        required />
                </div>
                <div className="form-group">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default withRouter(Email);