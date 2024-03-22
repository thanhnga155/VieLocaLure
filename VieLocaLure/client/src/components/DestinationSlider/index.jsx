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
      "id": 1,
      "name_en": "Ha Noi",
      "name_vi": "Hà Nội"
    },
    {
      "id": 2,
      "name_en": "Ho Chi Minh City",
      "name_vi": "Thành phố Hồ Chí Minh"
    },
    {
      "id": 3,
      "name_en": "Quang Binh",
      "name_vi": "Quảng Bình"
    },
    {
      "id": 4,
      "name_en": "Ha Noi",
      "name_vi": "Hà Nội"
    }
]

const sampleDestinations = [
    {
      "id": 1,
      "name_en": "Landmark 81",
      "name_vi": "Tòa nhà Landmark 81",
      "image": [
        "https://www.vinhomescentralpark.co/wp-content/uploads/2021/04/landmark81-2.jpeg"
      ]
    },
    {
      "id": 2,
      "name_en": "Phong Nha - Ke Bang",
      "name_vi": "Phong Nha - Kẻ Bàng",
      "image": [
        "https://imagevietnam.vnanet.vn//MediaUpload/Org/2023/11/14/dong-phong-nha-ke-bang-dep-den-choang-ngop14-9-50-19.jpg",
        "https://cdn.tgdd.vn/Files/2021/07/05/1365760/kinh-nghiem-du-lich-kham-pha-dong-phong-nha-ke-bang-quang-binh-202107051210588725.jpg"
      ]
    },
    {
      "id": 3,
      "name_en": "One Pillar pagoda",
      "name_vi": "Chùa Một Cột",
      "image": [
        "https://images.ctfassets.net/bth3mlrehms2/6X0Vw0vJBPMbAvK8XZqJMV/65e38d3d02a8f23fcc090bb80d01744c/iStock-481711830.jpg?w=3593&h=2771&fl=progressive&q=50&fm=jpg"
      ]
    },
    {
      "id": 4,
      "name_en": "Ho Chi Minh Mausoleum",
      "name_vi": "Lăng Chủ Tịch Hồ Chí Minh",
      "image": [
        "https://hochiminh.vn/Uploads/Images/2022/11/14/6/ttxvnlangc-1589207452-48.jpg",
        "https://bizweb.dktcdn.net/100/366/377/files/lang-bac-ho.jpg?v=1699677034595"
      ]
    }
  ]

const DestinationSlider = () => {

    const { t } = useTranslation();

    const [provinces, setProvinces] = useState([]);
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        const fetchProvinceData = async () => {
            try {
                setProvinces(await GetProvince());
            } catch (error) {
                console.error('Error fetching provinces data:', error);
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

                data.map(d => {
                    d.image = d.image[0];
                })

                console.log(data)
                setSlides(data);
            } catch (error) {
                console.error('Error fetching all destination data:', error);
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
            <h2>{t("homepage.destination.title")}</h2>

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
                                        <h3>
                                            {language === 'en' ? slide.name_en : slide.name_vi}                                            
                                        </h3>
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