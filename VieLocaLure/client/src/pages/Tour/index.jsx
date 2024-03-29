import React, { useEffect, useState } from 'react'
import Banner from '../../components/Banner';
import tourImage from '../../images/tour.jpg';
import SearchBar from '../../components/Search';
import Sort from '../../components/Sort';
import { Col, Container, Row } from 'react-bootstrap';
import { Pagination } from '@mui/material';
import TourList from '../../components/TourList';
import { GetTour } from '../../services/TourApi';

const description = 'Book your tour today and let the magic of Vietnam unfold before you. Your adventure begins here, promising memories that will last a lifetime. Start planning your dream tour now!';

const sampleData = [
    {
        'title': 'Visit of the Mekong 3 days from Ho Chi Minh',
        'image': 'https://images.ctfassets.net/bth3mlrehms2/6X0Vw0vJBPMbAvK8XZqJMV/65e38d3d02a8f23fcc090bb80d01744c/iStock-481711830.jpg?w=3593&h=2771&fl=progressive&q=50&fm=jpg',
        'destination': 'Ho Chi Minh City',
        'duration': 'Half Day (Daily Departure)',
        'transport': 'Van',
        'description': 'As the most vibrant city in the country, Ho Chi Minh City is truly an...',
        'price': '820,000',
        'schedule': [
            '09/03/2024',
            '09/15/2024',
            '10/03/2024'
        ],
        'id': 0,
        'url': '/tour/visit-of-the-mekong-3-days-from-ho-chi-minh'
    },
    {
        'title': 'Ho Chi Minh City Tour PM',
        'image': 'https://images.ctfassets.net/bth3mlrehms2/6X0Vw0vJBPMbAvK8XZqJMV/65e38d3d02a8f23fcc090bb80d01744c/iStock-481711830.jpg?w=3593&h=2771&fl=progressive&q=50&fm=jpg',
        'destination': 'Ho Chi Minh City',
        'duration': 'Half Day (Daily Departure)',
        'transport': 'Van',
        'description': 'As the most vibrant city in the country, Ho Chi Minh City is truly an...',
        'price': '820,000',
        'schedule': [
            '09/03/2024',
            '10/03/2024'
        ],
        'id': 1,
        'url': '/tour/visit-of-the-mekong-4-days-from-ho-chi-minh'
    },
    {
        'title': 'Ho Chi Minh City Tour PM',
        'image': 'https://images.ctfassets.net/bth3mlrehms2/6X0Vw0vJBPMbAvK8XZqJMV/65e38d3d02a8f23fcc090bb80d01744c/iStock-481711830.jpg?w=3593&h=2771&fl=progressive&q=50&fm=jpg',
        'destination': 'Ho Chi Minh City',
        'duration': 'Half Day (Daily Departure)',
        'transport': 'Van',
        'description': 'As the most vibrant city in the country, Ho Chi Minh City is truly an...',
        'price': '820,000',
        'schedule': [
            '09/03/2024',
            '10/03/2024'
        ],
        'id': 2,
        'url': '/tour/visit-of-the-mekong-5-days-from-ho-chi-minh'
    }
]

const Tour = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setData(await GetTour({isFilter: true, filterKey: 'newest'}));
            } catch (error) {
                console.error('Error fetching all areas data:', error);
            }
        };
    
        fetchData();
        if (data.length == 0) {
            setData(sampleData);
        }
    }, [])


    const [currentSort, setCurrentSort] = useState('newest');

    const handleSort = async (sortBy) => {
        if (sortBy !== currentSort) {
            setCurrentSort(sortBy);

            try {
                setData(await GetTour({isFilter: true, filterKey: sortBy}));
            } catch (error) {
                console.error('Error fetching sort tour data:', error);
            }
            
        }
    }

    return (
        <>
            <Banner image={tourImage} title={"Our tours"} description={description}/>
            <SearchBar />
            <Sort onSort={handleSort} value={currentSort} />
            <section className='tours'>
                <Container>
                    <Row>
                        <Col>
                            {
                                data.map(tour => (
                                    <TourList tour={tour} />
                                ))
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col className='d-flex justify-content-center'>
                            <Pagination count={10} variant="outlined" shape="rounded" />
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default Tour;