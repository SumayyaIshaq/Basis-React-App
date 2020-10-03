import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

class Phone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputPhone: '',
            isLogin: false,
            token: '',
            isLoaded: false
        }
    }

    // function for storing input value to state
    phoneHandler = (event) => {
        this.setState({
            inputPhone: event.target.value,
        })
    }

    // function that invokes on submitting the phone number
    submitPhoneHandler = (event) => {
        event.preventDefault();
        let phone = this.state.inputPhone;
        if (this.validateHandler(phone)) {
            axios.post('https://hiring.getbasis.co/candidate/users/phone/', {
                phoneNumber: phone,
            })
                .then((response) => {
                    if (response.data.success) {
                        this.setState({ isLoaded: true })
                        this.props.changeState("phone", phone);
                        this.props.changeState("token", response.data.results.token);
                        this.props.history.push("/otp");
                    }
                }, (error) => {
                    console.log(error);
                });
        }

    }

    // function for validating phone number 
    validateHandler = (phone) => {
        if (phone.trim() === "") {
            swal({
                text: "Contact is empty. Can't submit blank spaces.",
                icon: "error",
                button: "Done",
            });
            return false;
        }
        else if (typeof phone !== "undefined") {
            var pattern = new RegExp(/^[0-9\b]+$/);
            if (!pattern.test(phone)) {
                swal({
                    text: "Please enter only number. Blank spaces, alpahabets or special characters are not allowed.",
                    icon: "error",
                    button: "OK",
                });
                return false;
            }
            else if (phone.length !== 10) {
                swal({
                    text: "Please enter valid phone number.",
                    icon: "error",
                    button: "Done",
                });
                return false;
            }
            else {
                return true;
            }
        }
    }

    render() {
        return (
            <div className="phone-screen my-5" >
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center mt-4 mb-5">
                            <h2>Welcome!</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="offset-md-3 col-md-6">
                            <div className="app-main">
                                <form onSubmit={this.submitPhoneHandler}>
                                    <div className="form-group">
                                        <input type="text"
                                            name="phone"
                                            placeholder="Please enter your phone"
                                            value={this.state.phone}
                                            onChange={this.phoneHandler}
                                            required />
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

export default withRouter(Phone);