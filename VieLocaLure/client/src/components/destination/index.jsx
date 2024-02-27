import React from 'react'
import './styles.scss';
import { useTranslation } from 'react-i18next';

const Destination = () => {

    const { t } = useTranslation();

    return (
        <div className='destinations my-4'>
            <center>
                <h2>{t("homepage.destination.title")}</h2>
            </center>
        </div>
    )
}

export default Destination;