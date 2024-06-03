import './styles.scss'
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useTranslation } from 'react-i18next';
import en from '../../../images/en.png';
import vi from '../../../images/vi.png';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { useUser } from '../../../contexts/UserContext';

const TopHeader = () => {
    
    const { language, changeLanguage } = useLanguage();
    const {user, changeUser} = useUser();
    const { t } = useTranslation();

    const handleLogout = () => {
        changeUser(null)
        localStorage.removeItem('user');
        window.location = '/'
    }

    return (
        <div className="top-header py-2">
            <Container>
                <Row>
                    <Col>
                        <i className="me-2 fa fa-solid fa-envelope"></i>
                        <span>contact@vielocalure.vn</span>
                    </Col>
                    <Col>
                        <ul className='top-header--right-side'>
                            {
                                user ? (
                                    <>
                                        <li>
                                            {user.username}
                                        </li>
                                        <li>
                                            <span onClick={handleLogout} ><i className="me-2 fa fa-sign-out"></i> <span>{t('homepage.header.logout')}</span></span>
                                        </li>
                                    </>
                                    ) : (
                                    <li>
                                        <Link to={'/login'}><i className="me-2 fa fa-sign-in"></i> <span>{t('homepage.header.login')}</span></Link>
                                    </li>
                                )
                            }
                            <li>
                                <img width={"20px"} height={"15px"} src={language === 'vi' ? en : vi} alt='Flag'/>
                                <span className='ms-2' onClick={() => changeLanguage(language === 'en' ? 'vi' : 'en')}>{t('homepage.header.language')}</span></li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </div>
    )
};

export default TopHeader;
