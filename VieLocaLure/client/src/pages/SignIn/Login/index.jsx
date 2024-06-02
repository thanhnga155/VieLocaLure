import React, { useState } from "react";
import '../styles.scss'
import background from '../../../images/background.jpg';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { Col, Container, Row } from "react-bootstrap";
import { LoginAPI } from "../../../services/AuthApi";
import { useUser } from "../../../contexts/UserContext";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState('');

    const { saveUser, changeUser } = useUser();

    const updateUserName = (e) => {
        setUsername(e.target.value)
    }

    const updatePassword = (e) => {
        setPassword(e.target.value)
    }

    const login = async () => {
        const data = {username, password}

        try {
            const response = await LoginAPI(data);
            if (response) {
                const data = response.data;
                changeUser(data)
                if (data.accesstoken) {
                    saveUser(data);
                }
                

            }
        } catch (error) {
            const data = error.response.data
            setLoginStatus(data);
        }

    }

    return (
        <div className="login-page">
            <div className="limiter">
                <div className="container-login100" style={{"backgroundImage": `url(${background})`}}>
                    <div className="wrap-login100 p-l-110 p-r-110 p-t-62 p-b-33">
                        <div className="login100-form validate-form flex-sb flex-w">
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
                                <input className="input100" type="text" name="username" value={username} onChange={updateUserName} />
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
                                <input className="input100" type="password" name="pass" value={password} onChange={updatePassword} />
                                <span className="focus-input100"></span>
                            </div>
                            
                            <div className="mt-1">
                                <span style={{color: 'red'}}>{loginStatus}</span>
                            </div>

                            <div className="container-login100-form-btn mt-4">
                                <button type="button" className="login100-form-btn fw-bold" onClick={login}>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
