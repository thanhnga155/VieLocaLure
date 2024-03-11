import React from 'react'
import './styles.scss';

const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    height: "400px",
    backgroundColor: "rgba(0,0,0, 0.3)",
};

const Banner = ({image, title, description}) => {
    return (
        <div className='banner-page'>
            <div style={{ ...divStyle, 'backgroundImage': `url(${image})` }}>
                <center className="visible banner-text-center" style={{marginTop: "4rem"}}>
                    <h1 className="caption" style={{"fontSize": "5.5vw"}}> {title} </h1>
                </center>
            </div>

            <div className='description'>
                <p> {description} </p>
            </div>
        </div>
    )
}

export default Banner;