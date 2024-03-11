import React from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import './styles.scss';

const Sort = () => {
    return (
        <section className='sort-section my-3'>
            <Container className='py-3'>
                <Row>
                    <div className='sorting-option d-flex'>
                        <Col sm={1}><span className='sorting me-2'>Sort </span></Col>
                        <Col sm={11} className='option-items'>
                            <button className='mx-1 btn main-box'>Newest first</button>
                            <button className='mx-1 btn main-box-light'>Hotest first</button>
                            <Form.Select className='mx-1 price-selection'>
                                <option value={0}>Price</option>
                                <option value={0}>Highest first</option>
                                <option value={0}>Lowest first</option>
                            </Form.Select>
                        </Col>
                    </div>
                </Row>
            </Container>
        </section>
    )
}

export default Sort;