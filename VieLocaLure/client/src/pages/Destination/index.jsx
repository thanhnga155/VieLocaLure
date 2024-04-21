import React, { useEffect, useState } from 'react'
import Banner from '../../components/Banner'
import destination from '../../images/scene.jpg'
import { DestinationSection } from '../../components/DestinationSection'
import { GetArea } from '../../services/AreaApi'
import { Col, Container, Row } from 'react-bootstrap'
import { useLanguage } from '../../contexts/LanguageContext'

const description = "Embark on a journey with us and let Vietnam's beauty unfold before you. Your dream destination is just a click away, promising memories that will last a lifetime. Start exploring today!"

const sampleData = [
    {
        'area': 'North Vietnam',
        'destinations': [
            {
                'name': 'Hanoi',
                'numTours': 8,
                'image': 'https://ik.imagekit.io/tvlk/blog/2017/06/kham-pha-cac-dia-diem-du-lich-o-ha-noi-ma-ban-khong-the-bo-qua-3.jpg?tr=dpr-2,w-675'
            },
            {

                'name': 'Halong Bay',
                'numTours': 4,
                'image': 'https://travelhalong.com.vn/UserFiles/images/halong-bay.jpg'
            }
        ]
    },
    {
        'area': 'Central Vietnam',
        'destinations': [
            {
                'name': 'Phong Nha - Ke Bang',
                'numTours': 2,
                'image': 'https://image.nhandan.vn/w800/Uploaded/2023/dwkoudxkedwwyqdw/2023_06_30/hang-son-doong-963.jpg'
            },
            {
                'name': 'Nha Trang',
                'numTours': 4,
                'image': 'https://static.vinwonders.com/production/nha-trang-o-dau-1.jpg'
            }
        ]
    },
    {
        'area': 'South Vietnam',
        'destinations': [
            {
                'name': 'Sala Park',
                'numTours': 1,
                'image': 'https://seenee.vn/wp-content/uploads/2022/09/cong-vien-khu-do-thi-sala-3.jpg'
            },
        ]
    },
]

const Destination = () => {
    const [data, setData] = useState([]);
    const {language} = useLanguage();

    useEffect(() => {
        const fetchArea = async () => {
            try {
                const areas = await GetArea();
                setData(areas);
                console.log(areas)
            } catch (error) {
                console.error('Error fetching area data:', error);
            }
        };
    
        fetchArea();
        // if (data.length == 0) {
        //     setData(sampleData)
        // }
    }, []);


    return (
        <>
            <Banner image={destination} title={"Our destinations"} description={description}/>
            {
                data && data.length > 0 && (
                    <Container>
                        { data.map((dataItem, index) => (
                            <Row className='area'>
                                <Col>
                                    <h2 className='mt-5 mb-2 title'> {language == 'en' ? dataItem.name_en : dataItem.name_vi} </h2>
                                    <Container>
                                        <Row>
                                            <Col className='px-3'>
                                                <div dangerouslySetInnerHTML={{ __html: dataItem.content }} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <DestinationSection areaId = {dataItem.id}/>
                                        </Row>
                                        <Row>
                                        <Col className='mt-4 d-flex justify-content-center'>
                                            <a href={dataItem.url} className='btn main-box'>See all</a>
                                        </Col>
                                        </Row>
                                    </Container>
                                    <div className='mt-4'></div>
                                </Col>
                            </Row>
                        )) }
                    </Container>
                )
            }
        </>
    )
}

export default Destination;