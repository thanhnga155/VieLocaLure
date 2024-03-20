import React from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import './styles.scss';

const Sort = ({ isResult, onSort, value }) => {
    const handleSort = (sortBy) => {
        onSort(sortBy);
    };


    return (
        <section className='sort-section my-3'>
            <Container className='py-3'>
                <Row>
                    <div className='sorting-option d-flex'>
                        <Col sm={1}><span className='sorting me-2'>Sort </span></Col>
                        <Col sm={11} className='option-items'>
                            <button disabled={!isResult} onClick={() => handleSort('default')} className={`mx-1 btn ${!value || value === 'default' ? 'main-box' : 'main-box-light'}`}>Best match</button>
                            <button onClick={() => handleSort('newest')} className={`mx-1 btn ${value && value === 'newest' ? 'main-box' : 'main-box-light'}`}>Newest</button>
                            <button onClick={() => handleSort('hottest')} className={`mx-1 btn ${value && value === 'hottest' ? 'main-box' : 'main-box-light'}`}>Hottest</button>
                        </Col>
                    </div>
                </Row>
            </Container>
        </section>
    )
}

export default Sort;