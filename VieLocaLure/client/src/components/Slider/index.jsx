import React, { useEffect, useState } from "react";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import './styles.scss';
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../contexts/LanguageContext";
import { GetTour } from "../../services/TourApi";


const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    height: "500px",
    backgroundColor: "rgba(0,0,0, 0.3)",
};

const sample = [
    {
        caption1_en: "special value tour kkk",
        caption1_vi: "gói tour đặc biệt kkk",
        caption2_en: "panorama of vietnam",
        caption2_vi: "toàn cảnh việt nam",
        caption3_en: "Departing on Apr 5, 2024",
        caption3_vi: "khởi hành 05/04/2024",
        image: "https://zoomtravel.vn/upload/images/samten-hills-0.jpg",
        url: '/tour/panorama-of-vietnam',
    },
    {
        caption1_en: "once upon an old time kkk",
        caption1_vi: "vang bóng một thời kkk",
        caption2_en: "Hue Historic Citadel",
        caption2_vi: "Kinh thành Huế",
        caption3_en: "Departing on Mar 20, 2024",
        caption3_vi: "khởi hành 20/03/2024",
        image: "https://static.vinwonders.com/2023/02/dia-diem-du-lich-hue-01.jpg",
        url: '/tour/panorama-of-vietnam',
    }
];


const Slider = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setData(await GetTour({isFilter: true, filterKey: 'hottest', key: 'max', value:3}));
            } catch (error) {
                console.error('Error fetching hottest tours:', error);
            }
        };
        fetchData();
        if (data.length === 0) {
            setData(sample)
        }
      }, []);

    const { t } = useTranslation();

    const { language, changeLanguage } = useLanguage();
    
    
    return (
        <div className="slide-container">
            <Slide>
                {data.map((tour, index)=> (
                    <div key={index}>
                        <div style={{ ...divStyle, 'backgroundImage': `url(${tour.image})` }}>
                            <center className="visible banner-text-center" style={{marginTop: "4rem"}}>
                                <span className="caption caption-1">{language === 'en' ? tour.caption1_en : tour.caption1_vi}</span> <br />
                                <p><b className="caption caption-2">{language === 'en' ? tour.caption2_en : tour.caption2_vi}</b></p> 
                                <p className="caption caption-3"> {language === 'en' ? tour.caption3_en : tour.caption3_vi} </p>
                                <a className="btn btn-readmore" href={tour.url}>{t('homepage.banner')}</a>
                            </center>
                        </div>
                    </div>
                ))} 
            </Slide>
        </div>
    )
};

export default Slider;
