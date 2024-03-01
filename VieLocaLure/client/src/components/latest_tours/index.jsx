import React, { useEffect, useState } from "react";
import './styles.scss';
import { useTranslation } from "react-i18next";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { GetLatestTour } from "../../services/TourApi";


const sample = [
    {
        id: 0,
        image: "https://upload.wikimedia.org/wikipedia/commons/9/91/Ben_Thanh_market_2.jpg",
        price_vi: 10000000,
        price_en: 405.93,
        province_vi: "TP Hồ Chí Minh",
        province_en: "Ho Chi Minh City",
        duration_en: '2 days',
        duration_vi: '2 ngày',
        tour_title_vi: "Du Lịch Bắc Âu [Đan Mạch - Nauy - Thụy Điển - Phần Lan]",
        tour_title_en: "Nordic Travel [Denmark - Norway - Sweden - Finland]",
        tour_id: 0
    },
    {
        id: 1,
        image: "https://upload.wikimedia.org/wikipedia/commons/9/91/Ben_Thanh_market_2.jpg",
        price_vi: 10000000,
        price_en: 405.93,
        province_vi: "TP Hồ Chí Minh",
        province_en: "Ho Chi Minh City",
        duration_en: '2 days',
        duration_vi: '2 ngày',
        tour_title_vi: "Du Lịch Bắc Âu [Đan Mạch - Nauy - Thụy Điển - Phần Lan]",
        tour_title_en: "Nordic Travel [Denmark - Norway - Sweden - Finland]",
        tour_id: 1
    },
    {
        id: 2,
        image: "https://upload.wikimedia.org/wikipedia/commons/9/91/Ben_Thanh_market_2.jpg",
        price_vi: 10000000,
        price_en: 405.93,
        province_vi: "TP Hồ Chí Minh",
        province_en: "Ho Chi Minh City",
        duration_en: '2 days',
        duration_vi: '2 ngày',
        tour_title_vi: "Du Lịch Bắc Âu [Đan Mạch - Nauy - Thụy Điển - Phần Lan]",
        tour_title_en: "Nordic Travel [Denmark - Norway - Sweden - Finland]",
        tour_id: 2
    }
];

const TopTours = () => {
    const { t } = useTranslation();
    const language = localStorage.getItem("language");
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setData(await GetLatestTour());
            } catch (error) {
                console.error('Error fetching top tour data:', error);
            }
        };
        fetchData();
        if (data.length === 0) {
            setData(sample);
        }
    }, [])

    return (
      <div className="top-tours my-4">
        <center>
          <h2>{t("homepage.latest-tour.title")}</h2>
        </center>
        <section className="mt-5">
            <Container>
                <Row>
                    {
                        data.map((tour, index) => (
                            <Col lg={4} md={4}>
                                <Card className="top-tour-card my-3 zoom-effect">
                                    <figure className="top-tour-figure">
                                        <Card.Img
                                            className=""
                                            variant="top"
                                            src="https://upload.wikimedia.org/wikipedia/commons/9/91/Ben_Thanh_market_2.jpg"
                                        />
                                        <div className="price-tour">
                                            <span className="text-price-tour">
                                                { language === 'en' ? 
                                                    `$ ${tour.price_vi.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}` :
                                                    `${tour.price_vi.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VND`
                                                }/{t('homepage.latest-tour.tourist')}
                                            </span>
                                        </div>
                                    </figure>
                                    <Card.Body className="pt-0">
                                        <div className="top-details">
                                            <div className="tour-tag float-start d-flex justify-content-between w-100">
                                                <span className="tag-detail overflow-ellipsis">
                                                    <i className="fa fa-map-marker me-1" aria-hidden="true"></i>
                                                    {language === 'en' ? tour.province_en : tour.province_vi}
                                                </span>
                                                <span className="number-detail">
                                                    <i className="fa fa-calendar me-1" aria-hidden="true"></i> 
                                                    {language === 'en' ? tour.duration_en : tour.duration_vi}
                                                </span>
                                            </div>
                                        </div>
                                        <span className="name-tour-detail">
                                            {language === 'en' ? tour.tour_title_en : tour.tour_title_vi}
                                        </span>
                                        <Button className="action-tour">{t('homepage.latest-tour.book')}</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
                <Row>
                    <Col className="d-flex justify-content-center mt-5">
                        <Button className="more-tour">{t('homepage.latest-tour.see-all')}</Button>
                    </Col>
                </Row>
            </Container>
        </section>
      </div>
    );
}

export default TopTours;