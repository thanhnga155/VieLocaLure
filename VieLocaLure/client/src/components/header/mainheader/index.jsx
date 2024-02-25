import React from "react";
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
} from "react-bootstrap";
import './styles.scss';
import { useTranslation } from 'react-i18next';
// import i18n from '../../translation/i18n';

const MainHeader = ({showTopHeader}) => {
    const { t } = useTranslation();
    return (
        <Container className={`wrapper ${!showTopHeader ? 'top' : ''}`}>
            <Row>
            <Col>
                <Navbar expand="md">
                <Container fluid>
                    <Navbar.Brand href="#">VieLocaLure</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="ms-auto my-2 my-lg-0"
                            style={{ maxHeight: "100px" }}
                            navbarScroll
                        >
                            <Nav.Link href="/">{t('homepage.header.homepage')} </Nav.Link>
                            <Nav.Link href="#action2">{t('homepage.header.explore')} </Nav.Link>
                            <Nav.Link href="#action2">{t('homepage.header.news')}  </Nav.Link>
                            <Nav.Link href="#action2">{t('homepage.header.contact')}  </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
                </Navbar>
            </Col>
            </Row>
        </Container>
    );
};

export default MainHeader;
