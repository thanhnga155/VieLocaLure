import React from "react";
import Banner from "../../components/banner";
import SearchBar from "../../components/search";
import LatestTours from "../../components/latest_tours";
import Destination from "../../components/destination";

const HomePage = () => {
    return (
        <div>
            <Banner/>
            <SearchBar/>
            <LatestTours/>
            <Destination/>
            <div style={{height:"200px"}}></div>
        </div>
    )
}

export default HomePage