import React from 'react'
import Banner from '../../components/Banner';
import tourImage from '../../images/tour.jpg';
import SearchBar from '../../components/Search';
import DisplayTour from '../../components/DisplayTours';

const description = 'Book your tour today and let the magic of Vietnam unfold before you. Your adventure begins here, promising memories that will last a lifetime. Start planning your dream tour now!';

const Tour = () => {
    return (
        <>
            <Banner image={tourImage} title={"Our tours"} description={description}/>
            <SearchBar />
            <DisplayTour />
        </>
    )
}

export default Tour;