import './styles.scss'
import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useTranslation } from 'react-i18next';
import i18n from '../../../translation/i18n';
import en from '../../../images/en.png';
import vi from '../../../images/vi.png';

const TopHeader = () => {
    const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem('language') || 'en');

    const { t } = useTranslation();

    const changeLanguage = () => {
        const newLanguage = currentLanguage === 'en' ? 'vi' : 'en';
        localStorage.setItem('language', newLanguage);
        setCurrentLanguage(newLanguage);
        i18n.changeLanguage(newLanguage);
        console.log(newLanguage)
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
                            <li><i className="me-2 fa fa-sign-in"></i> <span>{t('homepage.header.login')}</span></li>
                            <li>
                                <img width={"20px"} height={"15px"} src={currentLanguage === 'vi' ? en : vi} alt='Flag'/>
                                <span className='ms-2' onClick={() => changeLanguage()}>{t('homepage.header.language')}</span></li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </div>
    )
};

export default TopHeader;
