import React, { useEffect, useState } from "react";
import './styles.scss';
import { useTranslation } from "react-i18next";
import { Button, Card, Col, Container, Row } from "react-bootstrap";


const sample = [
    {
        id: 0,
        image: "https://upload.wikimedia.org/wikipedia/commons/9/91/Ben_Thanh_market_2.jpg",
        price_vi: 10000000,
        price_en: 405.93,
        category_vi: "Tour châu Âu",
        category_en: "European tour",
        tours_available: 10,
        tour_title_vi: "Du Lịch Bắc Âu [Đan Mạch - Nauy - Thụy Điển - Phần Lan]",
        tour_title_en: "Nordic Travel [Denmark - Norway - Sweden - Finland]",
        tour_id: 0
    },
    {
        id: 1,
        image: "https://upload.wikimedia.org/wikipedia/commons/9/91/Ben_Thanh_market_2.jpg",
        price_vi: 10000000,
        price_en: 405.93,
        category_vi: "Tour châu Âu",
        category_en: "European tour",
        tours_available: 10,
        tour_title_vi: "Du Lịch Bắc Âu [Đan Mạch - Nauy - Thụy Điển - Phần Lan]",
        tour_title_en: "Nordic Travel [Denmark - Norway - Sweden - Finland]",
        tour_id: 1
    },
    {
        id: 2,
        image: "https://upload.wikimedia.org/wikipedia/commons/9/91/Ben_Thanh_market_2.jpg",
        price_vi: 10000000,
        price_en: 405.93,
        category_vi: "Tour châu Âu",
        category_en: "European tour",
        tours_available: 10,
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
        if (data.length === 0) {
            setData(sample);
        }
    }, [])

    return (
      <div className="top-tours my-4">
        <center>
          <h2>{t("homepage.top-tour.title")}</h2>
        </center>
        <section className="mt-5">
            <Container>
                <Row>
                    {
                        data.map((tour, index) => (
                            <Col lg={4} md={4}>
                                <Card className="top-tour-card my-3">
                                    <figure className="top-tour-figure">
                                        <Card.Img
                                            className="zoom-effect"
                                            variant="top"
                                            src="https://upload.wikimedia.org/wikipedia/commons/9/91/Ben_Thanh_market_2.jpg"
                                        />
                                        <div className="price-tour">
                                            <span className="text-price-tour">
                                                { language === 'en' ? 
                                                    `$ ${tour.price_vi.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}` :
                                                    `${tour.price_vi.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VND`
                                                }/{t('homepage.top-tour.tourist')}
                                            </span>
                                        </div>
                                    </figure>
                                    <Card.Body className="pt-0">
                                        <div className="top-details">
                                            <div className="tour-tag float-start d-flex justify-content-between w-100">
                                                <span className="tag-detail overflow-ellipsis">{language === 'en' ? tour.category_en : tour.category_vi}</span>
                                                <span className="number-detail">
                                                    {language === 'en' ? 
                                                        `${tour.tours_available} tours available` :
                                                        `có ${tour.tours_available} tour`
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                        <span className="name-tour-detail">
                                            {language === 'en' ? tour.tour_title_en : tour.tour_title_vi}
                                        </span>
                                        <Button className="action-tour">{t('homepage.top-tour.book')}</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            </Container>
        </section>
      </div>
    );
}

export default TopTours;