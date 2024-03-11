import React from 'react'
import { Col, Row } from 'react-bootstrap';
import './styles.scss';

const TourCard = () => {
    return (
        <Row className='box-search-tour zoom-effect'>
            <Col md={4} sm={4} xs={12}>
                <div className="box-search-tour-image">
                    <a href="/en/daily-tour/2752/ho-chi-minh-city-tour-pm" className="isotopeSelector image-box-relative image-box-3x2">
                        <img className="tour-image" src="https://images.ctfassets.net/bth3mlrehms2/6X0Vw0vJBPMbAvK8XZqJMV/65e38d3d02a8f23fcc090bb80d01744c/iStock-481711830.jpg?w=3593&h=2771&fl=progressive&q=50&fm=jpg" alt="Image" />
                    </a>
                </div>
            </Col>
            <Col md={8} sm={8} xs={12}>
                <Row className='box-search-tour-info'>
                    <Col md={8} sm={8} xs={12}>
                        <div className="title-tour">
                            <a
                                href="/en/daily-tour/2752/ho-chi-minh-city-tour-pm"
                                className="GAproductClick"
                            >
                                Ho Chi Minh City Tour PM
                            </a>
                        </div>
                        <div className="destination-tour">Ho Chi Minh City - Ho Chi Minh City</div>
                        <div className="detail-tour">
                            <p>
                                <strong>Time:</strong> Half Day (Daily Departure)
                            </p>
                            <p>
                                <strong>Transport:</strong> Van
                            </p>
                            <p>
                                As the most vibrant city in the country, Ho Chi Minh City is truly an...
                            </p>
                        </div>
                    </Col>
                    <Col md={4} sm={4} xs={12}>
                        <Row>
                            <Col md={12} sm={12} xs={6} className="row-box-price">
                                <a
                                    href="/en/daily-tour/2752/ho-chi-minh-city-tour-pm"
                                    className="GAproductClick main-box box-price-tour"
                                >
                                    <span className="text me-1">From price</span>
                                    <span className="price">820,000</span>
                                </a>
                            </Col>
                            <Col md={12} sm={12} xs={6} className='row-box-views' style={{"display": "block"}}>
                                <div>
                                    <ul className="list-inline detailsBtn" style={{ display: 'block', float: 'none' }}>
                                        <li>
                                            <span className="textInfo">
                                                <i className="fa fa-calendar me-1" aria-hidden="true"></i>
                                                09/03/2024
                                            </span>
                                        </li>
                                        <li>
                                            <span className="textInfo">
                                                <i className="fa fa-calendar me-1" aria-hidden="true"></i>
                                                10/03/2024
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <a class="box-view-more select-tour-action">
                                    <i class="fa fa-calendar me-1"></i>
                                    <span class="text">Read more</span>
                                </a>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default TourCard;