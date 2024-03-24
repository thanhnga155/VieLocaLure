import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Banner from '../../../components/Banner';
import './styles.scss';
import TourCard from '../../../components/TourList';
import { GetDescription } from '../../../services/DescriptionApi';
import { GetProvince } from '../../../services/ProvinceApi';
import { GetTour } from '../../../services/TourApi';
import { GetArea } from '../../../services/AreaApi';
import { useLanguage } from '../../../LanguageContext';

const image = 'https://www.dulichrongachau.vn/image/cache/catalog/2019/Hinh%20danh%20muc%20tour/du%20lich%20sapa-cr-1920x500.jpg'

const sampleDescription = {
    'name_en': 'North Vietnam',
    'name_vi': 'Miền Bắc',
    'image': 'https://asianwaytravel.com/wp-content/uploads/2018/12/ba-be-lake.jpg',
    'content': `
        <p>Fascinating and stunning region of beauty, North Vietnam is a country of mountains, rice terraces and karst peaks.</p>

        <p>Follow us in the region of Sapa, Moc Chau, Mai Chau and Mu Cang Chai, meeting ethnic minorities during hikes from villages to villages to admire the exceptional landscapes and discover the local traditions during a stay with the inhabitant. </p>

        <p>Discover the local flora and fauna of Pu Luong National Park. Admire the incredible landscapes drawn by the many sugarloaves that emerge from the ocean and rice fields during a cruise in the famous Halong Bay and along the water in the Ninh Binh region. </p>

        <p>Soak up the unique atmosphere of the administrative capital of Hanoi, a cultural city steeped in Vietnamese traditions and with a very rich gastronomy.</p>
    `
}

const sampleDestination = [
    {
        'province': 'Hanoi',
        'num_tours': 8,
        'tours': [
            {
                'title': 'Ho Hoan Kiem - Ho Tay',
                'image': 'https://images.ctfassets.net/bth3mlrehms2/6X0Vw0vJBPMbAvK8XZqJMV/65e38d3d02a8f23fcc090bb80d01744c/iStock-481711830.jpg?w=3593&h=2771&fl=progressive&q=50&fm=jpg',
                'duration': 'Half Day (Daily Departure)',
                'transport': 'Van',
                'description': 'As the most vibrant city in the country, Ho Chi Minh City is truly an electrifying metropolis that pulsates with life and energy. Formerly known as Saigon, this bustling urban center serves as the economic, cultural, and historical heart of Vietnam. With its bustling streets, modern skyscrapers, and rich cultural heritage, Ho Chi Minh City offers a captivating blend of old-world charm and contemporary dynamism.',
                'price': '820,000',
                'schedule': [
                    '09/03/2024',
                    '10/03/2024'
                ]
            },
            {
                'title': 'Chua Tran Quoc',
                'image': 'https://images.ctfassets.net/bth3mlrehms2/6X0Vw0vJBPMbAvK8XZqJMV/65e38d3d02a8f23fcc090bb80d01744c/iStock-481711830.jpg?w=3593&h=2771&fl=progressive&q=50&fm=jpg',
                'duration': 'Half Day (Daily Departure)',
                'transport': 'Van',
                'description': 'As the most vibrant city in the country, Ho Chi Minh City is truly an electrifying metropolis that pulsates with life and energy. Formerly known as Saigon, this bustling urban center serves as the economic, cultural, and historical heart of Vietnam. With its bustling streets, modern skyscrapers, and rich cultural heritage, Ho Chi Minh City offers a captivating blend of old-world charm and contemporary dynamism.',
                'price': '820,000',
                'schedule': [
                    '09/03/2024',
                    '10/03/2024'
                ]
            },
        ]
    },
    {
        'province': 'Halong Bay',
        'num_tours': 4,
        'tours': [
            {
                'title': 'Bai Chay',
                'image': 'https://images.ctfassets.net/bth3mlrehms2/6X0Vw0vJBPMbAvK8XZqJMV/65e38d3d02a8f23fcc090bb80d01744c/iStock-481711830.jpg?w=3593&h=2771&fl=progressive&q=50&fm=jpg',
                'duration': 'Half Day (Daily Departure)',
                'transport': 'Van',
                'description': 'As the most vibrant city in the country, Ho Chi Minh City is truly an electrifying metropolis that pulsates with life and energy. Formerly known as Saigon, this bustling urban center serves as the economic, cultural, and historical heart of Vietnam. With its bustling streets, modern skyscrapers, and rich cultural heritage, Ho Chi Minh City offers a captivating blend of old-world charm and contemporary dynamism.',
                'price': '820,000',
                'schedule': [
                    '09/03/2024',
                    '10/03/2024'
                ]
            }
        ]
    }
]


const Area = ({id}) => {

    const [description, setDescription] = useState({});
    const [destinations, setDestinations] = useState([]);

    const {language} = useLanguage();

    useEffect(() => {
        const fetchDescription = async () => {
            try {
                // setDescription(await GetDescription(id));
                const areas = await GetArea();
                const area = areas.find(item => item.id === id);
                console.log(area)

                setDescription({
                    name_en: area.name_en,
                    name_vi: area.name_vi,
                    content: area.content,
                    image: 'https://asianwaytravel.com/wp-content/uploads/2018/12/ba-be-lake.jpg'
                });
            } catch (error) {
                console.error('Error fetching description data:', error);
            }
        };
    
        fetchDescription();
    
        if (Object.keys(description).length == 0) {
            setDescription(sampleDescription);
        }
    }, [])


    // ///////////////////////////////////////////

    useEffect(() => {
        const fetchDestination = async () => {
            try {
                const provinces = await GetProvince({isFilter: true, key: 'area', value: id});
                provinces.map(async (province) => {
                    const provinceId = province.id;
                    const tours = await GetTour({isFilter: true, filterKey: 'province', key: 'id', value: provinceId});
                    province.tours = tours
                })
                setDestinations(provinces);
            } catch (error) {
                console.error('Error fetching description data:', error);
            }
        };
    
        // fetchDestination();
    
        if (destinations.length == 0) {
            setDestinations(sampleDestination);
        }
    }, [])


    return (
        <>
            <Banner image={image} title={language == 'en' ? description.name_en : description.name_vi}/>
            <Container className='my-4'>
                <Row className='destination-area-intro'>
                    <Col md={6} sm={12}>
                        <h3>{language == 'en' ? description.name_en : description.name_vi}</h3>
                        <div className='content' dangerouslySetInnerHTML={{ __html: description.content }} />
                    </Col>
                    <Col md={6} sm={12}>
                        <img width="100%" height="400" src={description.image} alt="Demo" />
                    </Col>
                </Row>
                <hr className='my-5'/>
                
                <Row>
                {
                    destinations.map(destination => (
                        <Col xs={12}>
                            <h3 className='my-3'> {destination.province} </h3>
                            <Row>
                                {
                                    destination.tours.map(tour => (
                                        <Col xs={12}>
                                            <TourCard tour={tour} />
                                        </Col>
                                    ))
                                }
                            </Row>
                            {
                                destination.num_tours > 3 &&
                                <div className='w-100 d-flex justify-content-center'>
                                    <button className='btn main-box px-4 py-2 my-2'>View more</button>
                                </div>
                            }
                            <hr className='my-3'/>
                        </Col>
                    ))
                }
                </Row>
            </Container>

        </>
    )
}

export default Area;