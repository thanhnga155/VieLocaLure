import React from "react";
import Slider from "../../components/Slider";
// import SearchBar from "../../components/Search";
import LatestTours from "../../components/LatestTours";
import Destination from "../../components/Destination";
import LocalSupport from "../../components/LocalSupport";
import { useTranslation } from "react-i18next";
import './styles.scss'
import { Col, Container, Row } from "react-bootstrap";

const HomePage = () => {
    const { t } = useTranslation();
    return (
        <div>
            <Slider/>
            {/* <SearchBar/> */}
            <Container>
                <Row>
                    <Col sm={{ span: 8, offset: 2 }} xs={12}>
                        <form className="search-form">
                            <input type="text" className="textbox" placeholder={t(('homepage.search'))} />
                            <i className="search-button fa fa-search" />
                        </form>
                    </Col>
                </Row>
            </Container>
            <LatestTours/>
            <hr style={{"margin": "3rem 0"}}/>
            <Destination/>
            <LocalSupport/>
        </div>
    )
}

export default HomePage