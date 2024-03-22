import React, { useEffect, useState } from 'react'
import { SearchTour } from '../../services/TourApi';
import Banner from '../../components/Banner';
import SearchBar from '../../components/Search';
import { Col, Container, Row } from 'react-bootstrap';
import TourList from '../../components/TourList';
import { Pagination } from '@mui/material';
import tourImage from '../../images/tour.jpg';
import Sort from '../../components/Sort';

const sampleData = [
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
        ]
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
        ]
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
        ]
    }
]

const SearchResult = () => {
    const [results, setResults] = useState([]);
    const [query, setQuery] = useState({});
    useEffect(() => {
        const fetchTours = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const params = Object.fromEntries(urlParams.entries());

            setQuery(params);
            
            try {
                setResults(await SearchTour(params));
            } catch (error) {
                console.error('Error fetching queried tour data:', error);
            }
        }

        fetchTours();
        // if (results.length == 0) {
        //     setResults(sampleData);
        // }
        
      }, []);

    const [currentSort, setCurrentSort] = useState('default');

    const handleSort = async (sortBy) => {
        if (sortBy !== currentSort) {
            setCurrentSort(sortBy);
            if (sortBy !== 'default') {
                query.sort = sortBy;
            }

            try {
                setResults(await SearchTour(query));
            } catch (error) {
                console.error('Error fetching queried tour data:', error);
            }
            
        }
    }

    return (
        <>
            <Banner image={tourImage} query={"Search results: " + query.keywords}/>
            <SearchBar query={query} />
            <Sort isResult={true} onSort={handleSort} value={currentSort} />
            {
                results.length > 0 &&
                <section className='tours'>
                    <Container>
                        <Row>
                            <Col>
                                {
                                    results.map(tour => (
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
            }
        </>
    )
}

export default SearchResult;