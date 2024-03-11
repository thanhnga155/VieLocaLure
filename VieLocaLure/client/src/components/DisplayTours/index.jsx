import React from 'react';
import './styles.scss';
import Sort from '../Sort';
import TourCard from '../TourCard';
import { Col, Container, Row } from 'react-bootstrap';

const DisplayTour = () => {
    return (
        <>
            <Sort />
            <section className='tours'>
                <Container>
                    <Row>
                        <Col>
                            {
                                Array.from({ length: 5 }, (_, index) => (
                                    <TourCard key={index} />
                                ))
                            }
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default DisplayTour;