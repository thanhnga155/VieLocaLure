import React from "react";
import Banner from "../../components/Banner";
import SearchBar from "../../components/Search";
import LatestTours from "../../components/LatestTours";
import Destination from "../../components/Destination";
import LocalSupport from "../../components/LocalSupport";

const HomePage = () => {
    return (
        <div>
            <Banner/>
            <SearchBar/>
            <LatestTours/>
            <hr style={{"margin": "3rem 0"}}/>
            <Destination/>
            <LocalSupport/>
        </div>
    )
}

export default HomePage