import React from "react";
import '../styles.scss'
import background from '../../../images/background.jpg';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { Col, Container, Row } from "react-bootstrap";

const Login = () => {
    return (
        <div className="login-page">
            <div className="limiter">
                <div className="container-login100" style={{"backgroundImage": `url(${background})`}}>
                    <div className="wrap-login100 p-l-110 p-r-110 p-t-62 p-b-33">
                        <form className="login100-form validate-form flex-sb flex-w">
                            <span className="login100-form-title p-b-53">
                                Sign In With
                            </span>

                            <Container>
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
                            
                            <div className="pt-3 pb-2">
                                <span className="txt1">
                                    Username
                                </span>
                            </div>
                            <div className="wrap-input100 validate-input" data-validate = "Username is required">
                                <input className="input100" type="text" name="username" />
                                <span className="focus-input100"></span>
                            </div>
                            
                            <div className="pt-3 pb-2">
                                <span className="txt1">
                                    Password
                                </span>

                                <a href="/login/forgot" className="txt2 ms-2">
                                    Forgot password?
                                </a>
                            </div>
                            <div className="wrap-input100 validate-input" data-validate = "Password is required">
                                <input className="input100" type="password" name="pass" />
                                <span className="focus-input100"></span>
                            </div>

                            <div className="container-login100-form-btn mt-4">
                                <button className="login100-form-btn fw-bold">
                                    Sign In
                                </button>
                            </div>

                            <div className="w-full text-center pt-5">
                                <span className="txt2">
                                    Not a member?
                                </span>

                                <a href="/register" className="txt2 ms-2">
                                    Sign up now
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
