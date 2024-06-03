import React, { useEffect, useState } from "react"
import { Col, Container, Form, Row } from "react-bootstrap";
import './styles.scss'
import { useTranslation } from "react-i18next";
import { GetArea } from "../../services/AreaApi";
import { useLanguage } from "../../contexts/LanguageContext";
import { cilCamera } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { SearchTourByImage } from "../../services/TourApi";
import { useNavigate } from "react-router-dom";

const sampleAreas = [
    {
        'name_en': 'North Vietnam',
        'name_vi': 'Miền Bắc',
        'url': '/destination/north-vietnam',
        'id': 0
    },
    {
        'name_en': 'Central Vietnam',
        'name_vi': 'Miền Trung',
        'url': '/destination/central-vietnam',
        'id': 1
    },
    {
        'name_en': 'South Vietnam',
        'name_vi': 'Miền Nam',
        'url': '/destination/south-vietnam',
        'id': 2
    }
]

const sampleResult = [
    {
        'title': 'Ho Chi Minh - Nhat Le beach - Phong Nha cave (3D2N)',
        'image': 'https://vietskytourism.com.vn/wp-content/uploads/2018/03/nin-tho-truoc-2-bai-bien-dep-tua-thien-duong-chi-co-o-quang-binh1-e1691468011117.jpg',
        'destination': 'Quang Binh',
        'duration': '3 days 1 night',
        'transport': 'Airplane and car',
        'description': 'Quang Binh is one of wonderful tourist destinations in Central Vietnam, famous...',
        'price': '$25',
        'schedule': [
            '09/07/2024',
            '09/15/2024'
        ]
    },
    {
        "title": "Ho Chi Minh - Nhat Le - Dark Cave Adventure (5D4N)",
        "image": "https://image.vietgoing.com/destination/2024/03/bien-Bao-Ninh-1920x1052.jpg",
        "destination": "Quang Binh",
        "duration": "5 days 4 nights",
        "transport": "Airplane and car",
        "description": "Dive into adventure with a thrilling visit to the Dark Cave, followed by...",
        "price": "$40",
        "schedule": [
            "09/12/2024",
            "09/20/2024"
        ]
    },
    {
        'title': 'Weekend Relax at Phu Quoc Island',
        'image': 'https://letsflytravel.vn/assets/source/tour/phu-quoc/tour%20dao%20phu%20quoc%20(3).jpg',
        'destination': 'Phu Quoc',
        'duration': '2 days (Weekly Departure)',
        'transport': 'Airplane and car',
        'description': 'Discover the pristine beauty of Phu Quoc Island with this luxury...',
        'price': '$250',
        'schedule': [
            '09/05/2024',
            '09/15/2024'
        ]
    },
    {
        "title": "Weekend Getaway to Vung Tau (2D1N)",
        "image": "https://chieutour.com.vn/kcfinder/upload/images/du-lich-vung-tau-2-12-2016.jpg",
        "destination": "Vung Tau",
        "duration": "2 days 1 night",
        "transport": "Car or bus",
        "description": "Take a short break and enjoy a relaxing weekend in Vung Tau. Visit...",
        "price": "$100",
        "schedule": [
            "09/08/2024",
            "09/22/2024"
        ]
    },
    {
        "title": "Tropical Paradise Retreat in Phu Quoc Island (5D4N)",
        "image": "https://ik.imagekit.io/tvlk/blog/2023/01/du-lich-phu-quoc-thang-3-1.jpg?tr=dpr-2,w-675",
        "destination": "Phu Quoc Island",
        "duration": "5 days 4 nights",
        "transport": "Airplane and private transfer",
        "description": "Discover the pristine beauty of Phu Quoc Island with this tropical paradise retreat. Enjoy white sandy beaches, crystal-clear waters, and world-class resorts. Explore the island's rich culture, vibrant nightlife, and exquisite cuisine.",
        "price": "$470",
        "schedule": [
            "09/05/2024",
            "09/15/2024"
        ]
    }
]

const SearchBar = ({query}) => {
    const [areas, setAreas] = useState([]);
    const { language } = useLanguage();
    const navigate = useNavigate()

    const [keywords, setKeywords] = useState('')
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    const [area, setArea] = useState('')

    useEffect(() => {
        if (query) {
            setKeywords(query.keywords);
            setFromDate(query.from);
            setToDate(query.to);
            setArea(query.area);
        }
    }, [query])

    useEffect(() => {
        const fetchArea = async () => {
            try {
                setAreas(await GetArea());
            } catch (error) {
                console.error('Error fetching all areas data:', error);
            }
        };
    
        fetchArea()
    
        if (areas.length == 0) {
            setAreas(sampleAreas);
        }
    }, []);


    const [fromDateType, setFromDateType] = useState('text');
    const [toDateType, setToDateType] = useState('text');

    const handleFocusFrom = () => setFromDateType('date');
    const handleBlurFrom = () => setFromDateType('text');

    const handleFocusTo = () => setToDateType('date');
    const handleBlurTo = () => setToDateType('text');

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];

        if (!selectedFile) {
            return;
        }

        const imageUrl = URL.createObjectURL(selectedFile)

        const url = imageUrl.split('/').pop()

        navigate('/search/i/' + url, { state: { 
            resultData : sampleResult,
            imageUrl
        } });


        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await SearchTourByImage(formData);
            if (response.status === 200) {
                const imageUrl = URL.createObjectURL(selectedFile)

                const url = imageUrl.split('/').pop()

                navigate('/search/i/' + url, { state: { 
                    resultData : response.data,
                    imageUrl
                } });
            } else {
                console.log('Upload failed');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }

        
    
    }

    const { t } = useTranslation();
    return (
        <section className="search-tour-section search-browser-web" id="sessionSearchWebTour">
            <Container>
                <Row>
                    <form id="searchFormKiritmWebTour" method="get" role="form" action="/search">
                        <Col xs={12}>
                            <Row>
                                <Col md={3} sm={12}>
                                    <div className="searchFilterQuery search-box-web-tour">
                                        <input onInput={(event) => setKeywords(event.target.value)} value={keywords} type="text" className="form-control" name="keywords" id="inputSearchWebTour" autocomplete="off" placeholder="Search a tour..."/>
                                        <div className="input-group-addon">
                                            <span className="fa fa-search"></span>
                                        </div>
                                        <div id="showSuggestionWebTour" className="suggestions hidden-cls">
                                            <ul id="suggestionSearchWebTour" className="ul-suggestion">
                                            </ul>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={6} sm={12}>
                                    <div className="row">
                                        <div className="col-sm-4 col-xs-12">
                                            <div id="fromDateTypeSearchBoxWebTour" className="input-group date ed-datepicker filterDate">
                                                <input onInput={(event) => setFromDate(event.target.value)} value={fromDate} type={fromDateType} onFocus={handleFocusFrom} onBlur={handleBlurFrom} className="form-control" name="from" placeholder="From" autocomplete="off" />
                                            </div>
                                        </div>
                                        <div className="col-sm-4 col-xs-12">
                                            <div id="toDateTypeSearchBoxWebTour" className="input-group date ed-datepicker filterDate">
                                                <input onInput={(event) => setToDate(event.target.value)} value={toDate} type={toDateType} onFocus={handleFocusTo} onBlur={handleBlurTo} className="form-control" name="to" autocomplete="off" placeholder="To" />
                                            </div>
                                        </div>
                                        <div className="col-sm-4 col-xs-12">
                                            <div className="form-group tour-type">
                                                <div className="bookingDrop">
                                                    <Form.Select onChange={(event) => setArea(event.target.value)} value={area} name="area" className="sbHolder">
                                                        <option value="">All</option>
                                                        {
                                                            areas.map(area => (
                                                                <option value={area.id}>{language === 'en' ? area.name_en : area.name_vi}</option>
                                                            ))
                                                        }
                                                    </Form.Select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={3} sm={12} className="d-flex justify-content-between align-items-center">
                                    <div style={{width: "70%"}}>
                                        <button type="submit" className="main-box btn btn-block buttonCustomPrimary">
                                            Search
                                        </button>
                                    </div>
                                    <div className="file-upload-container">
                                        <label htmlFor="file-upload" className="file-upload-label"> <CIcon icon={cilCamera} size="lg" /> </label>
                                        <input type="file" id="file-upload" className="file-upload-input" accept="image/*" onChange={handleFileChange}/>
                                    </div>
                                </Col>
                                {/* <Col md={1} sm={12}>
                                </Col> */}
                            </Row>
                        </Col>
                    </form>

                </Row>
            </Container>
        </section>
    )
}

export default SearchBar;