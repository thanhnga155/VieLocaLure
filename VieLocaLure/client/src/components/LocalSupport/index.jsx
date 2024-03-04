import React from "react";
import styled from 'styled-components';
import scene from '../../images/scene.jpg';
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

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

    return (
        <DestinationBanner>
            <Container>
                <Row>
                    <Col>
                        <h2 class="font-semibold leading-tight mb-5 text-28">
                            Ready to travel and discover
                            <br/>
                            Vietnam?
                        </h2>
                        
                        <h3 class="font-semibold mb-6 text-16">
                            <Link to="https://tailormade.roughguides.com/" target="_blank">
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