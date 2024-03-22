import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { GetTourDetailByUrl } from '../../../services/TourApi';
import Banner from '../../../components/Banner';
import { Col, Container, Row } from 'react-bootstrap';
import './styles.scss';

const sampleData = {
    'id': 0,
    'tourName': "Visit of the Mekong 3 days from Ho Chi Minh",
    'duration': "2 days 1 night",
    'images': [
        "https://lp-cms-production.imgix.net/2021-01/shutterstockRF_718619590.jpg",
        "https://content.r9cdn.net/rimg/dimg/f0/b1/54455949-city-18144-167c85df43f.jpg?width=1366&height=768&xhint=1159&yhint=754&crop=true",
        "https://cdn.britannica.com/21/94521-050-247416DA/Ho-Chi-Minh-City-Peoples-Committee-Building.jpg",
        "https://www.tripsavvy.com/thmb/y82T9aDS3t3HQcBx2tBTV_iqoNc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ho-chi-minh-city-sunset-07d2ad67791b4b8fb92e590d8bf2b1fc.jpg",
    ],
    'transport': "Bus",
    'departure': "Ho Chi Minh",
    'destination': "Mekong river",
    'details': [
        {
            'date': "03/04/2024",
            'tourCode': "STN084-2024-01312",
            'adultPrice': 22.75,
            'childrenPrice': 10.05,
            'infantPrice': 0,
            'id': 0
        },
        {
            'date': "03/05/2024",
            'tourCode': "STN084-2024-01314",
            'adultPrice': 20.75,
            'childrenPrice': 10.00,
            'infantPrice': 0,
            'id': 1
        },
        {
            'date': "03/07/2024",
            'tourCode': "STN084-2024-01315",
            'adultPrice': 20.75,
            'childrenPrice': 10.00,
            'infantPrice': 0,
            'id': 1
        }
    ],
    'description': `
        <p><span style="color: #967700;"><b>Around</b> <b>7 a.m.,</b></span> our English-speaking tour guide meets you at your hotel.</p>
        <p>In the morning, venture into the depths of the ancient <b>Cu Chi Tunnels</b> and discover these places where the Vietnamese have lived for many years.</p>
        <p><em>If you wish, you have the opportunity to learn how to shoot (not included).</em></p>
        <p>Then, take the road to the great <b>Cao Dai Temple</b> <b>of Tay Ninh</b> <b>where you will attend the daily ceremony.</b></p>
        <p>Observe this belief between Buddhism and Catholicism before returning to Ho Chi Minh in the late afternoon.</p>
        <p>&nbsp;</p>
        <p><b>Price</b> <b>2024</b></p>
        <p>2 pax: 2.300.000 VND / pax</p>
        <p>4 pax: 1.600.000 VND / pax</p>
    `
}

const TourDetail = () => {
    const { id } = useParams();
    const [tourDetail, setTourDetail] = useState({});
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                setTourDetail(await GetTourDetailByUrl(id));
            } catch (error) {
                console.error('Failed fetch tour detail data:', error);
            }
        }

        fetchData();
        console.log(Object.keys(tourDetail).length)
        if (Object.keys(tourDetail).length == 0) {
            
            setTourDetail(sampleData)
        }
    }, [tourDetail]);
    return (
        <section className='tour-detail-page'>
            <Banner image={tourDetail.images[0]} tourDetail={tourDetail.tourName}/>
            <Container className='my-5'>
                <Row className='basic-info my-4'>
                    <Col md={6} sm={12}>
                        <span className='data-label'>duration: </span>
                        <span className='data-value'> {tourDetail.duration}</span>
                    </Col>
                    <Col md={6} sm={12}>
                        <span className='data-label'>transport: </span>
                        <span className='data-value'> {tourDetail.transport}</span>
                    </Col>
                    <Col md={6} sm={12}>
                        <span className='data-label'>departure: </span>
                        <span className='data-value'> {tourDetail.departure}</span>
                    </Col>
                    <Col md={6} sm={12}>
                        <span className='data-label'>destination: </span>
                        <span className='data-value'> {tourDetail.destination}</span>
                    </Col>
                </Row>

                <Row className='tour-details-info'>
                    <Col md={12} xs={12} className="tour-detail-title-information tour-detail-header-col">
                        <Row class="row">
                            <Col md={2} sm={3} xs={12}>
                                Departure 'date's
                            </Col>
                            <Col md={2} sm={3} xs={12}>
                                Tour code
                            </Col>
                            <Col sm={2} xs={12}>
                                Adult price
                            </Col>
                            <Col sm={2} xs={12}>
                                Chilren price
                            </Col>
                            <Col sm={2} xs={12}>
                                Infant price
                            </Col>
                            <Col md={2} sm={12} xs={12}>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={12} sm={12} xs={12} className="tour-detail-content-col">
                    <div class="list-inline">
                        {
                            tourDetail.details.map((tour, index) => (
                                <Row>
                                    <Col xs={12}>
                                        <h5>Thông tin tour chi tiết thứ #{index + 1}</h5>
                                    </Col>
                                    <Col md={2} sm={3} xs={12}>
                                        <label>Ngày khởi hành</label>
                                        <strong>03/04/2024</strong>
                                    </Col>
                                    <Col md={2} sm={3} xs={12}>
                                        <label>Mã Tour</label>
                                        <strong style={{"marginLeft": "-30px"}}>STN084-2024-01312</strong>
                                    </Col>
                                    <Col md={2} sm={2} xs={12} className="price">
                                        <label>Giá</label>
                                        <strong>4.879.000</strong>
                                    </Col>
                                    <Col md={2} sm={2} xs={12} className="price">
                                        <label>Giá trẻ em</label>
                                        <strong>2.440.000</strong>
                                    </Col>
                                    <Col md={2} sm={2} xs={12} className="price">
                                        <label>Giá trẻ sơ sinh</label>
                                        <strong>0</strong>
                                    </Col>
                                    <Col md={2} sm={12} xs={12} className="packageInfo">
                                        <label>Đặt/Mua tour</label>
                                        <div class="action-book">
                                            <a class="btn btn-buy-tour" href="/booking/book-tour/pax-no/27542?type=buy">
                                                Mua Online
                                            </a>
                                        </div>
                                    </Col>
                                </Row>
                            ))
                        }
                    </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default TourDetail;