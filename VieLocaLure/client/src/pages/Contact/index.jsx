import React, { useState } from 'react'
import Banner from '../../components/Banner';
import { Col, Container, Row } from 'react-bootstrap';
import './styles.scss';

const destination = 'https://thamhiemmekong.com/wp-content/uploads/2019/12/dong-sen-thap-muoi3.jpg';
const description = 'We are at your disposal to answer all your requests for the organization of your visits to Hue and your trip to Vietnam. If your request is related to a specific tour, please mention the reference. We will contact you within 48 business hours of your email.'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        phoneNumber: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    return (
        <>
            <Banner image={destination} title={"Contact"} description={description}/>

            <section className='contact-page'>
                <Container>
                    <Row>
                        <Col md={4} sm={12}>
                            <div className='website-info'>
                                <div className="website-info--container d-flex">
                                    <div>
                                        <i class="fa fas fa-map-marker-alt"></i>
                                    </div>
                                    <div>
                                        <h5>Address</h5>
                                        <p>19 Nguyen Huu Tho Str., Tan Phong ward, District 7, Ho Chi Minh City, Vietnam</p>
                                    </div>
                                </div>
                                <div className="website-info--container d-flex">
                                    <div>
                                        <i class="fa fa-phone"></i>
                                    </div>
                                    <div>
                                        <h5>Phone</h5>
                                        <p>(028) 37 755 035</p>
                                    </div>
                                </div>
                                <div className="website-info--container d-flex">
                                    <div>
                                        <i class="fa fa-envelope"></i>
                                    </div>
                                    <div>
                                        <h5>Email</h5>
                                        <p>contact@vielocalure.com</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={8} sm={12} className='ps-md-5'>
                            <h1>Contact us</h1>
                            <form className="elementor-form mt-4" method="post" name="New Form">
                                <div className="elementor-form-fields-wrapper elementor-labels-above">
                                    <div className="elementor-field-type-text elementor-field-group elementor-column elementor-field-group-name elementor-col-100 elementor-field-required">
                                        <input
                                            size="1"
                                            type="text"
                                            name="name"
                                            id="form-field-name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="elementor-field elementor-size-sm  elementor-field-textual"
                                            placeholder="Your name*"
                                            required="required"
                                            aria-required="true"
                                        />
                                    </div>
                                    <div className="elementor-field-type-email elementor-field-group elementor-column elementor-field-group-email elementor-col-100 elementor-field-required">
                                        <input
                                            size="1"
                                            type="email"
                                            name="email"
                                            id="form-field-email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="elementor-field elementor-size-sm  elementor-field-textual"
                                            placeholder="Your email*"
                                            required="required"
                                            aria-required="true"
                                        />
                                    </div>
                                    <div className="elementor-field-type-tel elementor-field-group elementor-column elementor-field-group-message elementor-col-100 elementor-field-required">
                                        <input
                                            size="1"
                                            type="tel"
                                            name="phoneNumber"
                                            id="form-field-message"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            className="elementor-field elementor-size-sm  elementor-field-textual"
                                            placeholder="Your phone number with country code (+84 or other)"
                                            required="required"
                                            aria-required="true"
                                            pattern="[0-9()#&amp;+*-=.]+"
                                            title="Only numbers and phone characters (#, -, *, etc) are accepted."
                                        />
                                    </div>
                                    <div className="elementor-field-type-textarea elementor-field-group elementor-column elementor-field-group-field_9693f57 elementor-col-100 elementor-field-required">
                                        <textarea
                                            className="elementor-field-textual elementor-field  elementor-size-sm"
                                            name="message"
                                            id="form-field-field_9693f57"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows="5"
                                            placeholder="Your message"
                                            required="required"
                                            aria-required="true"
                                        ></textarea>
                                    </div>
                                    <div className="elementor-field-group elementor-column elementor-field-type-submit elementor-col-100 e-form__buttons">
                                    <button type="submit" className="elementor-button elementor-size-sm btn main-box px-4 py-2">
                                        <span className="elementor-button-text">Send</span>
                                    </button>
                                    </div>
                                </div>
                            </form>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.0238324593706!2d106.69718897390753!3d10.732645160002084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528b2747a81a3%3A0x33c1813055acb613!2sTon%20Duc%20Thang%20University!5e0!3m2!1sen!2s!4v1710342265421!5m2!1sen!2s" 
                                width="800" 
                                height="600" 
                                style={{ border: 0, width: '100%' }} 
                                allowfullscreen="" 
                                loading="lazy" 
                                referrerpolicy="no-referrer-when-downgrade">
                            </iframe>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default Contact;