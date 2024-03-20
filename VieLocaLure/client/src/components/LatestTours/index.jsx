import React, { useEffect, useState } from "react";
import './styles.scss';
import { useTranslation } from "react-i18next";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { GetTour } from "../../services/TourApi";
import { useLanguage } from "../../LanguageContext";
import TourCard from "../TourCard";


const sample = [
    {
        image: "https://upload.wikimedia.org/wikipedia/commons/9/91/Ben_Thanh_market_2.jpg",
        price_vi: 10000000,
        price_en: 405.93,
        province_vi: "TP Hồ Chí Minh",
        province_en: "Ho Chi Minh City",
        duration_en: '2 days',
        duration_vi: '2 ngày',
        tour_title_vi: "Du Lịch Bắc Âu [Đan Mạch - Nauy - Thụy Điển - Phần Lan]",
        tour_title_en: "Nordic Travel [Denmark - Norway - Sweden - Finland]",
        url: '/tour/nordic-travel-denmark-norway'
    },
    {
        image: "https://upload.wikimedia.org/wikipedia/commons/9/91/Ben_Thanh_market_2.jpg",
        price_vi: 10000000,
        price_en: 405.93,
        province_vi: "TP Hồ Chí Minh",
        province_en: "Ho Chi Minh City",
        duration_en: '2 days',
        duration_vi: '2 ngày',
        tour_title_vi: "Du Lịch Bắc Âu [Đan Mạch - Nauy - Thụy Điển - Phần Lan]",
        tour_title_en: "Nordic Travel [Denmark - Norway - Sweden - Finland]",
        url: '/tour/nordic-travel-denmark-norway'
    },
    {
        image: "https://upload.wikimedia.org/wikipedia/commons/9/91/Ben_Thanh_market_2.jpg",
        price_vi: 10000000,
        price_en: 405.93,
        province_vi: "TP Hồ Chí Minh",
        province_en: "Ho Chi Minh City",
        duration_en: '2 days',
        duration_vi: '2 ngày',
        tour_title_vi: "Du Lịch Bắc Âu [Đan Mạch - Nauy - Thụy Điển - Phần Lan]",
        tour_title_en: "Nordic Travel [Denmark - Norway - Sweden - Finland]",
        url: '/tour/nordic-travel-denmark-norway'
    }
];



const TopTours = () => {
    const { t } = useTranslation();
    const { language, changeLanguage } = useLanguage();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setData(await GetTour({isFilter: true, filterKey: 'lattest', key: 'max', value: 3}));
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
                                <TourCard tour={tour}/>
                            </Col>
                        ))
                    }
                </Row>
                <Row>
                    <Col className="d-flex justify-content-center mt-5">
                        <a href='/tour' className="btn main-box py-2 px-5">{t('homepage.latest-tour.see-all')}</a>
                    </Col>
                </Row>
            </Container>
        </section>
      </div>
    );
}

export default TopTours;