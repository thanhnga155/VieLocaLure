import React from 'react'
import './styles.scss';
import { Col, Container, Row } from 'react-bootstrap';

const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    height: "400px",
    backgroundColor: "rgba(0,0,0, 0.3)",
    position: "relative"
};

const Banner = ({image, title, description, query, tourDetail}) => {
    return (
        <div className='banner-page'>
            <div style={{ ...divStyle, 'backgroundImage': `url(${image})` }}>
                <center className="visible banner-text-center" style={{marginTop: "4rem"}}>
                    <h1 className="caption" style={{"fontSize": "5.5vw"}}> {title} </h1>
                </center>

                {
                    query && 
                    <Container className='query-result'>
                        <Row>
                            <Col xs={12}>
                                <h4>{query}</h4>
                            </Col>
                        </Row>
                    </Container>
                }

                {
                    tourDetail && 
                    <Container className='query-result'>
                        <Row>
                            <Col xs={12}>
                                <h2 className='fw-bolder'>{tourDetail}</h2>
                            </Col>
                        </Row>
                    </Container>
                }
            </div>


            {
                description &&
                <div className='description'>
                    <p> {description} </p>
                </div>
            }
        </div>
    )
}

export default Banner;