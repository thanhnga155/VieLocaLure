import React from "react";
import './styles.scss';
import { useTranslation } from "react-i18next";

const TopTours = () => {
    const { t } = useTranslation();
    return (
        <div className="top-tours my-4">
            <center><h2>{t('homepage.top-tour')}</h2></center>
        </div>
    )
}

export default TopTours;