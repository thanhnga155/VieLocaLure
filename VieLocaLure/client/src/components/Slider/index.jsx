import React, { useEffect, useState } from "react";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import './styles.scss';
import { useTranslation } from "react-i18next";
import { GetSlider } from "../../services/SliderApi";
import { useLanguage } from "../../LanguageContext";


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
        id: 0,
        caption1_en: "special value tour kkk",
        caption1_vi: "gói tour đặc biệt kkk",
        caption2_en: "panorama of vietnam",
        caption2_vi: "toàn cảnh việt nam",
        caption3_en: "Departing on Apr 5, 2024",
        caption3_vi: "khởi hành 05/04/2024",
        image: "https://zoomtravel.vn/upload/images/samten-hills-0.jpg",
        tour_id: 0,
    },
    {
        id: 1,
        caption1_en: "once upon an old time kkk",
        caption1_vi: "vang bóng một thời kkk",
        caption2_en: "Hue Historic Citadel",
        caption2_vi: "Kinh thành Huế",
        caption3_en: "Departing on Mar 20, 2024",
        caption3_vi: "khởi hành 20/03/2024",
        image: "https://static.vinwonders.com/2023/02/dia-diem-du-lich-hue-01.jpg",
        tour_id: 1,
    }
];


const Slider = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setData(await GetSlider());
            } catch (error) {
                console.error('Error fetching banner data:', error);
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
                                <button className="btn btn-readmore">{t('homepage.banner')}</button>
                            </center>
                        </div>
                    </div>
                ))} 
            </Slide>
        </div>
    )
};

export default Slider;
