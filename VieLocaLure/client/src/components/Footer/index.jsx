import { IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import './styles.scss'
import { Col, Container, Row } from 'react-bootstrap';
import offer from '../../images/offer.png';
import payment from '../../images/payment.png';
import reputation from '../../images/reputation.png';
import consultation from '../../images/consultation.png';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();
    return (
        <footer className="new_footer_area bg_color mt-5">
            <div className="new_footer_top">
                <Container className='mb-4'>
                    <Row>
                        <Col lg={3} md={6}>
                            <div className="commitment-box">
                                <div className="commitment-image">
                                    <img width="50px" className="icon-commitment" src={offer} alt={"commitment"} />
                                </div>
                                <div className="commitment-content">
                                    <span className="commitment-title">{t("homepage.footer.offer.title")} </span>
                                    <p className="commitment-description">{t("homepage.footer.offer.description")}</p>
                                </div>
                            </div>
                        </Col>
                        <Col lg={3} md={6}>
                            <div className="commitment-box">
                                <div className="commitment-image">
                                    <img width="50px" className="icon-commitment" src={payment} alt="commitment"/>
                                </div>
                                <div className="commitment-content">
                                    <span className="commitment-title">{t("homepage.footer.payment.title")}</span>
                                    <p className="commitment-description">{t("homepage.footer.consultation.description")}</p>
                                </div>
                            </div>
                        </Col>
                        <Col lg={3} md={6}>
                            <div className="commitment-box">
                                <div className="commitment-image">
                                    <img width="50px" className="icon-commitment" src={consultation} alt="commitment" />
                                </div>
                                <div className="commitment-content">
                                    <span className="commitment-title">{t("homepage.footer.consultation.title")}</span>
                                    <p className="commitment-description">{t("homepage.footer.consultation.description")}</p>
                                </div>
                            </div>
                        </Col>
                        <Col lg={3} md={6}>
                            <div className="commitment-box">
                                <div className="commitment-image">
                                    <img width="50px" className="icon-commitment" src={reputation} alt="commitment" />
                                </div>
                                <div className="commitment-content">
                                    <span className="commitment-title">{t("homepage.footer.reputation.title")}</span>
                                    <p className="commitment-description">{t("homepage.footer.reputation.description")}</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row className="m-0 w-100">
                        <Col lg={3} md={6} className="pt-3">
                            <div className="f_widget company_widget wow fadeInLeft" data-wow-delay="0.2s" style={{visibility: "visible", animationDelay: "0.2s", animationName: "fadeInLeft"}}>
                                <h3 className="f-title f_600 t_color f_size_18">{t("homepage.footer.about.title")}</h3>
                                <p>{t("homepage.footer.about.description")}</p>
                            </div>
                        </Col>
                        <Col lg={3} md={6} className="pt-3">
                            <div className="f_widget about-widget pl_70 wow fadeInLeft" data-wow-delay="0.4s" style={{visibility: "visible", animationDelay: "0.4s", animationName: "fadeInLeft"}}>
                                <h3 className="f-title f_600 t_color f_size_18">{t("homepage.footer.link")}</h3>
                                <ul className="list-unstyled f_list">
                                    <li><a href="/">Company</a></li>
                                    <li><a href="/">Android App</a></li>
                                    <li><a href="/">iOS App</a></li>
                                    <li><a href="/">Desktop</a></li>
                                </ul>
                            </div>
                        </Col>
                        <Col lg={3} md={6} className="pt-3">
                            <div className="f_widget about-widget pl_70 wow fadeInLeft" data-wow-delay="0.6s" style={{visibility: "visible", animationDelay: "0.6s", animationName: "fadeInLeft"}}>
                                <h3 className="f-title f_600 t_color f_size_18">{t("homepage.footer.support.title")}</h3>
                                <ul className="list-unstyled f_list">
                                    <li><a href="/">{t("homepage.footer.support.faq")}</a></li>
                                    <li><a href="/">{t("homepage.footer.support.term")}</a></li>
                                    <li><a href="/">{t("homepage.footer.support.report")}</a></li>
                                    <li><a href="/">{t("homepage.footer.support.documentation")}</a></li>
                                    <li><a href="/">{t("homepage.footer.support.policy")}</a></li>
                                    <li><a href="/">{t("homepage.footer.support.privacy")}</a></li>
                                </ul>
                            </div>
                        </Col>
                        <Col lg={3} md={6} className="pt-3">
                            <div className="f_widget social-widget pl_70 wow fadeInLeft" data-wow-delay="0.8s" style={{visibility: "visible", animationDelay: "0.8s", animationName: "fadeInLeft"}}>
                                <h3 className="f-title f_600 t_color f_size_18">{t("homepage.footer.social")}</h3>
                                <div className="f_social_icon">
                                    <IconButton size='large'><FacebookIcon fontSize='large'/></IconButton>
                                    <IconButton size='large'><LinkedInIcon fontSize='large'/></IconButton>
                                    <IconButton size='large'><TwitterIcon fontSize='large'/></IconButton>
                                    <IconButton size='large'><YouTubeIcon fontSize='large'/></IconButton>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <div className="footer_bg">
                    <div className="footer_bg_one"></div>
                    <div className="footer_bg_two"></div>
                </div>
            </div>
            <div className="footer_bottom mt-4 pt-3 pb-3 d-flex align-items-center">
                <Container>
                    <Row>
                        <Col>
                            <p className="mb-0 f_400">© VieLocaLure. 2024 All rights reserved.</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </footer>
    );
};
export default Footer;