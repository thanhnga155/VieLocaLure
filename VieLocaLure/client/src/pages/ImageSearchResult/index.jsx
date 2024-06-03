import React, { useEffect, useState } from 'react'
import { SearchTour } from '../../services/TourApi';
import Banner from '../../components/Banner';
import SearchBar from '../../components/Search';
import { Col, Container, Row } from 'react-bootstrap';
import TourList from '../../components/TourList';
import { Pagination } from '@mui/material';
import tourImage from '../../images/tour.jpg';
import Sort from '../../components/Sort';
import { useLocation } from 'react-router-dom';


const ImageSearchResult = () => {
    const location = useLocation();
    const { resultData, imageUrl } = location.state || { resultData: '', imageUrl: '' };

    const [results, setResults] = useState(resultData);
    const [query, setQuery] = useState({});

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
            <Banner image={tourImage} query={"Search results: "} queryImage = {imageUrl}/>
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

export default ImageSearchResult;