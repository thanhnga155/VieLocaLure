import React, { useEffect, useState } from "react";
import './styles.scss';
import { useTranslation } from "react-i18next";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { GetTour } from "../../services/TourApi";
import { useLanguage } from "../../LanguageContext";
import TourCard from "../TourCard";
import { GetImage } from "../../services/ImageApi";


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
    const { language } = useLanguage();
    const [latestTours, setLatestTours] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tours = await GetTour({isFilter: true, filterKey: 'latest', key: 'max', value: 3});
                const promises = [];
                for (const tour of tours) {
                    const img_response = await GetImage(tour.image);
                    if (img_response.ok) {
                        tour.image = URL.createObjectURL(await img_response.blob());
                        tour.isLoaded = true;
                        promises.push(Promise.resolve());
                    } else {
                        console.error(`Failed to fetch image. Status: ${img_response.status}`);
                    }
                }
                setLatestTours(tours);
            } catch (error) {
                console.error('Error fetching top tour data:', error);
            }
        };
        fetchData();
        // if (latestTours.length === 0) {
        //     setLatestTours(sample);
        // }
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
                        latestTours && latestTours.length > 0 && latestTours.map((tour) => (
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