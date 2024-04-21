import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import './styles.scss';
import { useTranslation } from 'react-i18next';
import { GetArea } from "../../../services/AreaApi";
import { useLanguage } from "../../../contexts/LanguageContext";

const sampleMenu = [
    {
        'name_en': 'North Vietnam',
        'name_vi': 'Miền Bắc',
        'url': '/destination/north-vietnam',
        'id': 0
    },
    {
        'name_en': 'Central Vietnam',
        'name_vi': 'Miền Trung',
        'url': '/destination/central-vietnam',
        'id': 1
    },
    {
        'name_en': 'South Vietnam',
        'name_vi': 'Miền Nam',
        'url': '/destination/south-vietnam',
        'id': 2
    }
]

const MainHeader = ({showTopHeader}) => {
    const { t } = useTranslation();
    const { language, changeLanguage } = useLanguage();

    const [menuItems, setMenuItems] = useState([]);
    const [dropdownActive, setDropdownActive] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setMenuItems(await GetArea());
            } catch (error) {
                console.error('Error fetching all areas data:', error);
            }
        };

        fetchData();

        if (menuItems.length == 0) {
            setMenuItems(sampleMenu);
        }
    }, []);

    const openDestination = (e) => {
        e.stopPropagation();
        window.location.href = '/destination';
    }

    return (
        <Container className={`wrapper ${!showTopHeader ? 'top' : ''}`}>
            <Row>
            <Col>
                <Navbar expand="md">
                <Container fluid>
                    <Navbar.Brand href="/">VieLocaLure</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="ms-auto my-2 my-lg-0 menu-items"
                            style={{ maxHeight: "100px" }}
                            navbarScroll
                        >
                            <Nav.Link className="menu-item" href="/">{t('homepage.header.homepage')} </Nav.Link>
                            <NavDropdown 
                                className="menu-item" 
                                title={t("homepage.header.destination")}
                                id="basic-nav-dropdown"
                                show={dropdownActive}
                                onMouseEnter={() => setDropdownActive(true)}
                                onMouseLeave={() => setDropdownActive(false)}
                                onClick={(e) => openDestination(e)}
                            >
                                {menuItems.map((menuItem, index) => (
                                    <Nav.Item className="menu-item" key={index}>
                                        <Nav.Link href={`${menuItem.url}`}>
                                            {language == 'en' ? menuItem.name_en : menuItem.name_vi}
                                        </Nav.Link>
                                    </Nav.Item>
                                ))}
                            </NavDropdown>
                            <Nav.Link className="menu-item" href="/tour">{t('homepage.header.tour')}  </Nav.Link>
                            <Nav.Link className="menu-item" href="/contact">{t('homepage.header.contact')}  </Nav.Link>
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
