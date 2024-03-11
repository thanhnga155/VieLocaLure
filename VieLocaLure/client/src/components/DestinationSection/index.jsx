import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import './styles.scss'

const imgStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    backgroundColor: "rgba(0,0,0, 0.3)",
};

export const DestinationSection = ({data}) => {
    return (
        <Container>
            { data.map((dataItem, index) => (
                <Row className='area'>
                    <Col>
                        <h2 className='my-5 title'> {dataItem.title} </h2>
                        <Container>
                            <Row>
                                {
                                    dataItem.destinations.map((destination, index) => (
                                        <Col lg={4} md={6} sm={1}>
                                            <div class="location-item zoom-effect">
                                                <div class="thumbnail-location" >
                                                    <img alt={destination.name} src={destination.image} />
                                                </div>
                                                <div class="content-location">
                                                    <h2 class="title-tours">{destination.name}</h2>
                                                    <div class="tour-infor">
                                                        <div class="location-count">{destination.numTours} Tours</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    ))
                                }
                            </Row>
                        </Container>
                        <div className='mt-4'></div>
                    </Col>
                </Row>
            )) }
            
        </Container>
    )
}