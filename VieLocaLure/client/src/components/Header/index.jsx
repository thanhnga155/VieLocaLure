import React, { useEffect, useState } from "react";
import TopHeader from "./topheader";
import MainHeader from "./mainheader";
import styled from 'styled-components';

const Header = () => {
    const HeaderElement = styled.div`
        position: ${props => (props.showTopHeader ? 'absolute' : 'fixed')};
        background-color: ${props => (props.showTopHeader ? 'transparent' : 'white')};
        padding: ${props => (!props.showTopHeader ? '10px 0px' : '')};
        width: 100%;
        z-index: 1000;
        box-shadow: 0 -6px 10px 5px rgba(0,0,0,0.5);
    `;

    const [showTopHeader, setShowTopHeader] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            setShowTopHeader(window.scrollY === 0);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <HeaderElement showTopHeader={showTopHeader}>
            {showTopHeader ? <TopHeader /> : null}
            <MainHeader showTopHeader={showTopHeader}/>
        </HeaderElement>
    )
};

export default Header;