import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import './styles.scss'
import { useLanguage } from '../../contexts/LanguageContext';
import { convertToMetaUrl } from '../../utils/convertMetaUrl';
import { GetImage } from '../../services/ImageApi';
import { GetDestination } from '../../services/DestinationApi';

const imgStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    backgroundColor: "rgba(0,0,0, 0.3)",
};

export const DestinationSection = ({areaId}) => {
    const {language} = useLanguage();
    const handleClick = (keywords) => {
        window.location.href = '/search?keywords=' + convertToMetaUrl(keywords);
    }

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchDestination = async() => {
            const provinces = await GetDestination({isFilter: true, key: 'area', value: areaId});
            const promises = [];
            for (const province of provinces) {
                province.image = province.image[0];
                const img_response = await GetImage(province.image);
                if (img_response.ok) {
                    province.image = URL.createObjectURL(await img_response.blob());
                    province.isLoaded = true;
                    promises.push(Promise.resolve());
                } else {
                    console.error(`Failed to fetch image. Status: ${img_response.status}`);
                }
            }

            setData(provinces);
        }
        fetchDestination();
    }, []);

    return (
        <>
            {
                data && data.map(destination => (
                    <Col lg={4} md={6} sm={1} onClick={() => handleClick(language == 'en' ? destination.name_en : destination.name_vi)}>
                        <div class="location-item zoom-effect">
                            <div class="thumbnail-location" >
                                <img alt={destination.name_en} src={destination.image} />
                            </div>
                            <div class="content-location">
                                <h2 class="title-tours">{language == 'en' ? destination.name_en : destination.name_vi}</h2>
                                <div class="tour-infor">
                                    <div class="location-count">{destination.numTours} Tours</div>
                                </div>
                            </div>
                        </div>
                    </Col>
                ))
            }
        </>
    )
}