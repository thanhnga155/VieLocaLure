import React from 'react'
import { Card } from 'react-bootstrap';
import { useLanguage } from '../../LanguageContext';
import './styles.scss';
import { useTranslation } from 'react-i18next';

const TourCard = ({tour}) => {
    const { language } = useLanguage();
    const { t } = useTranslation();
    return (
        <Card className="top-tour-card my-3 zoom-effect">
            <figure className="top-tour-figure">
                <Card.Img
                    className=""
                    variant="top"
                    src={tour.image}
                />
                <div className="price-tour">
                    <span className="text-price-tour">
                        { language === 'en' ? 
                            `$ ${tour.price_vi.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}` :
                            `${tour.price_vi.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VND`
                        }/{t('homepage.latest-tour.tourist')}
                    </span>
                </div>
            </figure>
            <Card.Body className="pt-0">
                <div className="top-details">
                    <div className="tour-tag float-start d-flex justify-content-between w-100">
                        <span className="tag-detail overflow-ellipsis">
                            <i className="fa fa-map-marker me-1" aria-hidden="true"></i>
                            {language === 'en' ? tour.province_en : tour.province_vi}
                        </span>
                        <span className="number-detail">
                            <i className="fa fa-calendar me-1" aria-hidden="true"></i> 
                            {language === 'en' ? tour.duration_en : tour.duration_vi}
                        </span>
                    </div>
                </div>
                <span className="name-tour-detail">
                    {language === 'en' ? tour.tour_title_en : tour.tour_title_vi}
                </span>
                {/* <Button className="action-tour main-box">{t('homepage.latest-tour.book')}</Button> */}
            </Card.Body>
        </Card>
    )
}

export default TourCard;