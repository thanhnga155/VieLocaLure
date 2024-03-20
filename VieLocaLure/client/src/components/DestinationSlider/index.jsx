import React, { useEffect, useRef, useState } from 'react'
import './styles.scss';
import { useTranslation } from 'react-i18next';
import { Col, Container, Row } from 'react-bootstrap';
import vietnam from '../../images/vietnam.png';
import { useLanguage } from '../../LanguageContext';
import { GetProvince } from '../../services/ProvinceApi';
import { GetDestination } from '../../services/DestinationApi';


const sampleProvince = [
    {
        name_en: 'Ha Noi',
        name_vi: 'Hà Nội'
    },
    {
        name_en: 'Ha Noi',
        name_vi: 'Hà Nội'
    },
    {
        name_en: 'Ha Noi',
        name_vi: 'Hà Nội'
    },
    {
        name_en: 'Ha Noi',
        name_vi: 'Hà Nội'
    }
]

const sampleDestinations = [
    {
        image: "https://www.vinhomescentralpark.co/wp-content/uploads/2021/04/landmark81-2.jpeg",
        title: "Landmark 81",
        id: 0
    },
    {
        image: "https://imagevietnam.vnanet.vn//MediaUpload/Org/2023/11/14/dong-phong-nha-ke-bang-dep-den-choang-ngop14-9-50-19.jpg",
        title: "Phong Nha - Ke Bang",
        id: 1
    },
    {
        image: "https://ik.imagekit.io/tvlk/blog/2022/10/kinh-nghiem-du-lich-vinh-ha-long-1.jpg?tr=dpr-2,w-675",
        title: "Vinh Ha Long",
        id: 2
    },
    {
        image: "https://statics.vinpearl.com/cho-noi-cai-rang-2_1624262882.jpg",
        title: "Cho Noi Cai Rang",
        id: 3
    },
    {
        image:"https://www.gotadi.com/tour/wp-content/uploads/2021/12/quang-truong-lam-vien-da-lat.png",
        title: "Da Lat",
        id: 4
    },
    {
        image:"https://static.vinwonders.com/production/ho-hoan-kiem-2.jpg",
        title: "Ha Noi",
        id: 5
    },
    {
        image:"https://vcdn1-dulich.vnecdn.net/2022/04/18/dulichSaPa-1650268886-1480-1650277620.png?w=0&h=0&q=100&dpr=2&fit=crop&s=JTUw8njZ_Glkqf1itzjObg",
        title:"Sapa",
        id: 6
    },
];

const DestinationSlider = () => {

    const { t } = useTranslation();

    const [provinces, setProvinces] = useState([]);
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        const fetchProvinceData = async () => {
            try {
                setProvinces(await GetProvince());
            } catch (error) {
                console.error('Error fetching all areas data:', error);
            }
        };

        fetchProvinceData();
        if (provinces.length === 0) {
            setProvinces(sampleProvince);
        }

        const fetchDestinationData = async () => {
            try {
                let data = await GetDestination();
                const uniqueMap = data.reduce((uniqueMap, item) => {
                    uniqueMap[item.id] = item;
                    return uniqueMap;
                }, {});

                const uniqueArray = Object.values(uniqueMap);

                data = uniqueArray.slice(0, 8);
                setProvinces(data);
            } catch (error) {
                console.error('Error fetching all areas data:', error);
            }
        };

        fetchDestinationData();

        if (slides.length == 0) {
            setSlides(sampleDestinations);
        }
    }, []);

    const { language } = useLanguage();

    const [slideNumber, setSlideNumber] = useState(0);
    const sliderRef = useRef(null);
    const nextArrow = useRef(null);

    const navigationHandle = (direction) => {
        let newSlideNumber;
        const totalNoofSlides = sliderRef.current.children.length - 1;
        direction === "left"
        ? (newSlideNumber = slideNumber === 0 ? totalNoofSlides : slideNumber - 1)
        : (newSlideNumber =
            slideNumber === totalNoofSlides ? 0 : slideNumber + 1);
        setSlideNumber(newSlideNumber);

        // adding/removing active class from slides
        Array.from(sliderRef.current.children).forEach((slide) =>
        slide.classList.remove("active")
        );
        sliderRef.current.children[newSlideNumber].classList.add("active");

        // setting current slide's bg image as body background image
        document.getElementsByClassName('destinations')[0].style.backgroundImage = `url(${slides[newSlideNumber].image})`;
    };

    // autoplay
    useEffect(() => {
        const interval = setInterval(() => {
            nextArrow.current.click();
        }, 5000);
        return () => {
            clearInterval(interval);
        };
    }, []);


    return (
        <div className='destinations my-4'>
            <h2>Destinations</h2>

            <Container className='mt-5'>
                <Row>
                    <Col lg={4} sm={12} className='destination-category'>
                        <img alt="Vietnam map" src={vietnam} />
                        <Container>
                            <Row>
                                {
                                    provinces.map((province, index)=> (
                                        <Col className='destination-item' md={6} sm={12}> 
                                            { language === 'en' ? province.name_en : province.name_vi }
                                        </Col>
                                    ))
                                }                                
                            </Row>
                        </Container>
                    </Col>
                    <Col lg={8} sm={12} className='destination-slides'>
                        <div className="sliderWrapper">
                            {/* {title && <h3 className="sliderTitle">{title}</h3>} */}
                            
                            <button className="prevArrow" onClick={() => navigationHandle("left")}>
                                «
                            </button>

                            <div className="slider" ref={sliderRef}>
                                {slides.map((slide, index) => (
                                    <div className={`slide${index === 0 ? " active" : ""}`}>
                                        {slide.image && (
                                        <img
                                            src={slide.image}
                                            alt={slide.title}
                                            loading="lazy"
                                            draggable={false}
                                        />
                                        )}
                                        {slide.title && <h3>{slide.title}</h3>}
                                    </div>
                                ))}
                            </div>
                            <button
                                className="nextArrow"
                                onClick={() => navigationHandle("right")}
                                ref={nextArrow}
                            >
                                »
                            </button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default DestinationSlider;