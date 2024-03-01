import React from 'react'
import './styles.scss';
import { useTranslation } from 'react-i18next';
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
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Destination = () => {

    const { t } = useTranslation();

    return (
        <div className='destinations my-4'>
            <DestinationBanner>
                <h2>Destination</h2>
            </DestinationBanner>
        </div>
    )
}

export default Destination;