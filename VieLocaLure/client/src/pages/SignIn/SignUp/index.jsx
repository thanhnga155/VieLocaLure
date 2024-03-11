import React from "react";
import '../styles.scss'
import background from '../../../images/background.jpg';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { Col, Container, Row } from "react-bootstrap";

const SignUp = () => {
    return (
        <div className="login-page signup">
            <div className="limiter">
                <div className="container-login100" style={{"backgroundImage": `url(${background})`}}>
                    <div className="wrap-login100">
                        <form className="login100-form validate-form flex-sb flex-w">
                            <span className="login100-form-title">
                                Sign Up With
                            </span>

                            <Container>
                                <Row>
                                    <Col>
                                        {/* Fullname */}
                                        <div className="pb-2">
                                            <span className="txt1">
                                                Fullname
                                            </span>
                                        </div>
                                        <div className="wrap-input100 validate-input" data-validate = "Username is required">
                                            <input className="input100" type="text" name="username" />
                                            <span className="focus-input100"></span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6} sm={12}>
                                        {/* Email */}
                                        <div className="pt-3 pb-2">
                                            <span className="txt1">
                                                Email
                                            </span>
                                        </div>
                                        <div className="wrap-input100 validate-input" data-validate = "Username is required">
                                            <input className="input100" type="text" name="username" />
                                            <span className="focus-input100"></span>
                                        </div>
                                    </Col>
                                    <Col md={6} sm={12}>
                                        {/* Phone number */}
                                        <div className="pt-3 pb-2">
                                            <span className="txt1">
                                                Phone number
                                            </span>
                                        </div>
                                        <div className="wrap-input100 validate-input" data-validate = "Username is required">
                                            <input className="input100" type="text" name="username" />
                                            <span className="focus-input100"></span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6} sm={12}>
                                        {/* Password */}
                                        <div className="pt-3 pb-2">
                                            <span className="txt1">
                                                Password
                                            </span>
                                        </div>
                                        <div className="wrap-input100 validate-input" data-validate = "Password is required">
                                            <input className="input100" type="password" name="pass" />
                                            <span className="focus-input100"></span>
                                        </div>
                                    </Col>
                                    <Col md={6} sm={12}>
                                        {/* Re-type password */}
                                        <div className="pt-3 pb-2">
                                            <span className="txt1">
                                                Re-type Password
                                            </span>
                                        </div>
                                        <div className="wrap-input100 validate-input" data-validate = "Password is required">
                                            <input className="input100" type="password" name="pass" />
                                            <span className="focus-input100"></span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        {/* Agree */}
                                        <div class="d-flex justify-content-between mt-2 mb-5">
                                            <label class="control control--checkbox mb-3 mb-sm-0">
                                                <span className="me-2">Agree our <a className="ms-1" href="/">Terms and Conditions</a></span>
                                                <input type="checkbox" checked="checked"/>
                                                <div class="control__indicator"></div>
                                            </label>
                                            <span class="ml-auto"><a href="/login" class="forgot-pass">Sign In</a></span> 
                                        </div>

                                        <div className="container-login100-form-btn mt-2">
                                            <button className="login100-form-btn fw-bold">
                                                Sign Up
                                            </button>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>

                            <div className="w-full text-center pt-3">
                                <span className="txt2">
                                    Or register with
                                </span>

                                <Container className="mt-2">
                                    <Row>
                                        <Col md={6} sm={12}>
                                            <a href="/facebook.com" className="btn-face m-b-20">
                                                {/* <i className="fa fa-facebook-official"></i> */}
                                                <FacebookIcon className="me-2"/>
                                                Facebook
                                            </a>
                                        </Col>
                                        <Col md={6} sm={12}>
                                            <a href="/google.com" className="btn-google m-b-20">
                                                <GoogleIcon className="me-2"/>
                                                Google
                                            </a>
                                        </Col>
                                    </Row>
                                </Container>

                                {/* <a href="/register" className="txt2 ms-2">
                                    Sign up now
                                </a> */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
