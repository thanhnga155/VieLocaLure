import React from "react";
import Banner from "../../components/banner";
import SearchBar from "../../components/search";
import TopTours from "../../components/top_tours";

const HomePage = () => {
    return (
        <div>
            <Banner/>
            <SearchBar/>
            <TopTours/>
            <div style={{height:"200px"}}></div>
        </div>
    )
}

export default HomePage