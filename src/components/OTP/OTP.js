import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class OTP extends Component {
    constructor(props) {
        super(props);
        this.state = {
            otp: ""
        }
    }

    // function for storing input value to state
    otpHandler = (event) => {
        this.setState({
            otp: event.target.value
        })
    }

    // function that invokes on submitting the OTP
    validateOTPHandler = (event) => {
        event.preventDefault();
        axios.post('https://hiring.getbasis.co/candidate/users/phone/verify', {
            phoneNumber: this.props.phone,
            token: this.props.token,
            verificationCode: this.state.otp
        })
            .then((response) => {
                if (response.data.success) {
                    if (response.data.results.isLogin) {
                        const user = response.data.results.user;
                        if (user) {
                            this.props.changeState("user", user);
                        }
                        this.props.history.push("/profile");
                    }
                    else {
                        this.props.history.push("/email");
                    }
                }
            }, (error) => {
                console.log(error);
            });

    }

    render() {
        return (
            <div className="otp-screen my-5" >
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center mt-4 mb-5">
                            <h2>Welcome!</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="offset-md-3 col-md-6">
                            <div className="app-main">
                                <form onSubmit={this.validateOTPHandler}>
                                    <div className="form-group">
                                        <input type="text"
                                            placeholder="Please enter the OTP i.e, 1111"
                                            name="otp"
                                            value={this.state.otp}
                                            onChange={this.otpHandler}
                                            required />
                                    </div>
                                    <div className="form-group">
                                        <button type="submit">Verify OTP</button>
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

export default withRouter(OTP);