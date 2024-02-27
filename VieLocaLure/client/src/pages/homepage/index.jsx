import React from "react";
import Banner from "../../components/banner";
import SearchBar from "../../components/search";
import TopTours from "../../components/top_tours";
import Destination from "../../components/destination";
import styled from "styled-components";
import destination from "../../images/destination.jpg";

const DestinationBanner = styled.section`
    background-image: url(${destination});
    margin-top: 100px;
    background-attachment: fixed;
    width: 100%;
    height: 400px;
    background-size: cover;
    background-position: center;
    color: #ffffff;
`;

const HomePage = () => {
    return (
        <div>
            <Banner/>
            <SearchBar/>
            <TopTours/>
            <DestinationBanner />
            <Destination/>
            <div style={{height:"200px"}}></div>
        </div>
    )
}

export default HomePage