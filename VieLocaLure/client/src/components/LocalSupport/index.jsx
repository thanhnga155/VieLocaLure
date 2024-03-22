import React from "react";
import styled from 'styled-components';
import scene from '../../images/scene.jpg';
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const DestinationBanner = styled.section`
    background-image: url(${scene});
    margin-top: 100px;
    background-attachment: fixed;
    width: 100%;
    height: 85vh;
    background-size: cover;
    background-position: center;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const LocalSupport = () => {
    const { t } = useTranslation();
    return (
        <DestinationBanner>
            <Container>
                <Row>
                    <Col>
                        <h2 className="font-semibold leading-tight mb-5 text-28">
                            Ready to travel and discover
                            <br/>
                            Vietnam?
                        </h2>
                        
                        <h3 className="font-semibold mb-6 text-16">
                            {/* <Link to="https://tailormade.roughguides.com/" target="_blank"> */}
                            <Link to="/support" target="_blank">
                                <Button className="me-2 main-box text-16 font-semibold">Get support</Button>
                            </Link>
                            from our local experts for <br/> stress-free planning &amp; worry-free travels</h3>
                    </Col>
                </Row>
            </Container>
        </DestinationBanner>
    );
}

export default LocalSupport;