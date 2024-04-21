import React, { useEffect, useState } from "react";
import Slider from "../../components/Slider";
import LatestTours from "../../components/LatestTours";
import LocalSupport from "../../components/LocalSupport";
import { useTranslation } from "react-i18next";
import './styles.scss'
import { Col, Container, Row } from "react-bootstrap";
import DestinationSlider from "../../components/DestinationSlider";
import { GetDescription } from "../../services/DescriptionApi";

const description = {
    'title': 'Vietnam, a top tourist destination',
    'content': ` 
        <p>Let yourself be enchanted by Vietnam, a land of contrast with <strong>exceptional natural beauty and rich historical heritage!</strong> Despite years of war, the country has managed to recover and preserve its traditions, while being resolutely focused on the future. It has become a haven of peace, but full of life, and has opened up to tourism without losing its soul or authenticity.</p>
        <p>Vietnam is also known as the “<strong>country of the dragon”</strong>. Its particular shape recalls that of this mythical animal, highly revered in Asia, symbol of luck and prosperity. Its vast territory stretches from north to south, over 1400 kilometres, between Cambodia, Laos and the South China Sea.</p>
        <p>One of Vietnam’s strengths is the <strong>great diversity of its landscapes:</strong> mountains, highlands, lush jungles, rice fields and lagoons succeed each other to delight your eyes! Here, no monotony! Along its 3,200 kilometres of coastline, you’ll find bays dotted with jagged shapes, such as the <strong>famous Halong Bay,</strong> and <strong>dream beaches</strong> lined with coconut trees.</p>
        <p>Vietnam is also a<strong> millennial culture,</strong> particularly rich and diverse. How can you not be dazzled by the splendour and elegance of the <strong>Hue Imperial Palace,</strong> by the <strong>old town of Hoi An</strong>, with its temples and pagodas, or by the<strong> sanctuary of My Son,</strong> surrounded by the jungle? Among the countries of South-East Asia, Vietnam is the one with the most <strong>sites listed in the UNESCO World Heritage!</strong></p>
        <p>Discovering Vietnam also means taking the time to savour its <strong>refined cuisine</strong>, infused with exotic flavours that delight the palate! But the charm of this endearing country lies above all in the<strong> kindness and simplicity</strong> of its inhabitants. Indeed, despite their heavy past, the Vietnamese have kept their extraordinary <strong>love for life</strong> intact, to the delight of travellers!</p>t the charm of this endearing country lies above all in the<strong> kindness and simplicity</strong> of its inhabitants. Indeed, despite their heavy past, the Vietnamese have kept their extraordinary <strong>love for life</strong> intact, to the delight of travellers!</p>
    `
}

const HomePage = () => {
    const { t } = useTranslation();
    
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                setData(await GetDescription('homepage'));
            } catch (error) {
                console.error('Error fetching description in homepage:', error);
            }
        };
        fetchData();
        if (!data.title) {
            setData(description);
        }
    }, [])

    return (
        <div>
            <Slider/>
            <Container>
                <Row>
                    <Col sm={{ span: 8, offset: 2 }} xs={12}>
                        <form className="search-form">
                            <input type="text" className="textbox" placeholder={t(('homepage.search'))} />
                            <i className="search-button fa fa-search" />
                        </form>
                    </Col>
                </Row>
            </Container>
            <LatestTours/>
            <hr style={{"margin": "3rem 0"}}/>
            <DestinationSlider />

            <div className="homepage-description">
                <h2 className="description-title">{data.title}</h2>
                <div className="description-content" dangerouslySetInnerHTML={{ __html: data.content }} />
            </div>

            <LocalSupport/>
        </div>
    )
}

export default HomePage