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
import { GetAllAreas } from "../../../services/DestinationApi";

const sampleMenu = [
    {
        title_en: "North Vietnam",
        title_vi: "Miền Bắc",
        url: "north",
    },
    {
        title_en: "Central Vietnam",
        title_vi: "Miền Trung",
        url: "north",
    },
    {
        title_en: "South Vietnam",
        title_vi: "Miền Nam",
        url: "south",
    }
]

const MainHeader = ({showTopHeader}) => {
    const { t } = useTranslation();

    const [menuItems, setMenuItems] = useState([]);
    const [dropdownActive, setDropdownActive] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setMenuItems(await GetAllAreas());
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
                    <Navbar.Brand href="#">VieLocaLure</Navbar.Brand>
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
                                title="Destination" 
                                id="basic-nav-dropdown"
                                show={dropdownActive}
                                onMouseEnter={() => setDropdownActive(true)}
                                onMouseLeave={() => setDropdownActive(false)}
                                onClick={(e) => openDestination(e)}
                            >
                                {menuItems.map((menuItem, index) => (
                                    <Nav.Item className="menu-item" key={index}>
                                        <Nav.Link href={`/${menuItem.url}`}>
                                            {menuItem.title_en}
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
