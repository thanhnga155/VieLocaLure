import React from 'react'
import { Col, Row } from 'react-bootstrap';
import './styles.scss';

const TourList = ({tour}) => {
    const navigate = () => {
        window.location.href = tour.url
    }
    return (
        <Row onClick={navigate} className='box-search-tour zoom-effect'>
            <Col md={4} sm={4} xs={12}>
                <div className="box-search-tour-image">
                    <a className="isotopeSelector image-box-relative image-box-3x2">
                        <img className="tour-image" src={tour.image} alt="Image" />
                    </a>
                </div>
            </Col>
            <Col md={8} sm={8} xs={12}>
                <Row className='box-search-tour-info'>
                    <Col md={8} sm={8} xs={12}>
                        <div className="title-tour">
                            <a className="GAproductClick">
                                {tour.title}
                            </a>
                        </div>
                        <div className="destination-tour">{tour.destination}</div>
                        <div className="detail-tour">
                            <p>
                                <strong>Duration:</strong> {tour.duration}
                            </p>
                            <p>
                                <strong>Transport:</strong> {tour.transport}
                            </p>
                            <p className='tour-description'>
                                {tour.description}
                            </p>
                        </div>
                    </Col>
                    <Col md={4} sm={4} xs={12}>
                        <Row>
                            <Col md={12} sm={12} xs={6} className="row-box-price">
                                <a className="GAproductClick main-box box-price-tour">
                                    <span className="text me-1">From price</span>
                                    <span className="price">{tour.price}</span>
                                </a>
                            </Col>
                            <Col md={12} sm={12} xs={6} className='row-box-views' style={{"display": "block"}}>
                                <div>
                                    <ul className="list-inline detailsBtn d-flex flex-column align-items-center" style={{ float: 'none' }}>
                                        {
                                            tour.schedule.slice(0, 2).map(s => (
                                                <li>
                                                    <span className="textInfo">
                                                        <i className="fa fa-calendar me-1" aria-hidden="true"></i>
                                                        {s}
                                                    </span>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                                {
                                    tour.schedule.length > 2 &&
                                    <button class="btn box-view-more select-tour-action">
                                        <i class="fa fa-calendar me-1"></i>
                                        <span class="text">Read more</span>
                                    </button>
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default TourList;