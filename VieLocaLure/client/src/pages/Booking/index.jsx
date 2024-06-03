import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { BookingTour, GetTourDetailByUrl, GetTourFromPackage } from '../../services/TourApi';
import Banner from '../../components/Banner';
import './styles.scss'
import { GetCustomerByUserName } from '../../services/AccountApi';
import { Alert } from '@mui/material';

const sampleData = {
    'date': "03/05/2024",
    'tourCode': "STN084-2024-01314",
    'adultPrice': 20.75,
    'childrenPrice': 10.00,
    'infantPrice': 0,
    'id': 1
}

const samplePackage = {
    'id': 0,
    'tourName': "Visit of the Mekong 3 days from Ho Chi Minh",
    'duration': "2 days 1 night",
    'images': [
        "https://lp-cms-production.imgix.net/2021-01/shutterstockRF_718619590.jpg",
        "https://content.r9cdn.net/rimg/dimg/f0/b1/54455949-city-18144-167c85df43f.jpg?width=1366&height=768&xhint=1159&yhint=754&crop=true",
        "https://cdn.britannica.com/21/94521-050-247416DA/Ho-Chi-Minh-City-Peoples-Committee-Building.jpg",
        "https://www.tripsavvy.com/thmb/y82T9aDS3t3HQcBx2tBTV_iqoNc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ho-chi-minh-city-sunset-07d2ad67791b4b8fb92e590d8bf2b1fc.jpg",
    ],
    'transport': "Bus",
    'departure': "Ho Chi Minh",
    'destination': "Mekong river",
}

const userSample = {
    'name': 'Nguyen Quoc An',
    'phone': '0312424244',
    'email': 'an@gmail.com',
}

const Booking = () => {
    const { tourPack, tourId } = useParams();
    const [tourDetail, setTourDetail] = useState({});
    const [tourPackage , setPackage] = useState({});
    const [userData, setUserData] = useState({});
    const [adultTimes, setAdultTimes] = useState(3);
    const [childrenTimes, setChildrenTimes] = useState(1);
    const [infantTimes, setInfantTimes] = useState(0);
    const [payment, setPayment] = useState('');
    const [agree, setAgree] = useState(false);

    const user = JSON.parse(localStorage.getItem('user'));

    const [isFixed, setIsFixed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            setIsFixed(scrollTop >= 700);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                setPackage(await GetTourDetailByUrl(tourPack));
                setTourDetail(await GetTourFromPackage(tourId));
            } catch (error) {
                console.error('Failed fetch tour detail data:', error);
            }
        }

        fetchData();
        if (Object.keys(tourDetail).length == 0) {
            setTourDetail(sampleData);
        }

        if (Object.keys(tourPackage).length == 0) {  
            setPackage(samplePackage);
        }
    }, [tourPackage]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setUserData(await GetCustomerByUserName(user.username));
            } catch (error) {
                console.error('Failed fetch user data:', error);
            }
        }
        fetchData();

        if (Object.keys(userData).length === 0) {  
            setUserData(userSample);
        }
    }, [userData]);

    const changeAdultTimes = (e) => {
        setAdultTimes(e.target.value);
    }

    const changeChildrenTimes = (e) => {
        setChildrenTimes(e.target.value);
    }

    const changeInfantTimes = (e) => {
        setInfantTimes(e.target.value);
    }

    const handlePaymentChange = (e) => {
        setPayment(e.target.value);
    };

    const changeAgreement = () => {
        setAgree(!agree);
    }

    const navigateBack = () => {
        if (step === 1) {
            window.location = '/tour/' + tourPack
        } else {
            setStep(step - 1);
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }

    const navigateNext = () => {
        if (step !== 3 && payment !== '') {
            // able to navigate
            setStep(step + 1);
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        if (step == 3) {
            paymentRequest();
            window.location = '/'
        }
    }

    const paymentRequest = async () => {
        const data = {
            'username': userData.username,
            'tourId': tourDetail.id,
            'paymentMethod': payment,
            'numAdult': adultTimes,
            'numChildren': childrenTimes,
            'numInfant': infantTimes,
            'totalPrice': tourDetail.adultPrice*adultTimes + tourDetail.childrenPrice*childrenTimes + tourDetail.infantPrice*infantTimes
        }
        await BookingTour(data);
    }

    const [step, setStep] = useState(1);
    return (
        userData && tourPackage && tourPackage.images && (
        <section className="tour-detail-page booking-page">
          <Banner
            image={
              "https://lp-cms-production.imgix.net/2021-01/shutterstockRF_718619590.jpg"
            }
            tourDetail={tourPackage.tourName}
          />
          <Container>
            <Row>
              <Col>
                    <div className="row progress-wizard d-flex align-items-center mt-3" style={{borderBottom: "0"}}>
                        <div className={`col-sm-4 col-xs-12 progress-wizard-step ${step > 1 ? 'finish' : ''} ${step === 1 ? "active" : "disable"}`}>
                            <div className="progress">
                            <div className="progress-bar"></div>
                            </div>
                            <a href="javascript:void(0)" className="progress-wizard-dot">
                                <span style={{fontSize: "20px"}}>1</span>. Select service
                            </a>
                        </div>
                        <div className={`col-sm-4 col-xs-12 progress-wizard-step ${step > 2 ? 'finish' : ''} ${step === 2 ? "active" : "disable"}`}>
                            <div className="progress">
                            <div className="progress-bar"></div>
                            </div>
                            <a href="javascript:void(0)" className="progress-wizard-dot">
                                <span style={{fontSize: "20px"}}>2</span>. Customer's information
                            </a>
                        </div>
                        <div className={`col-sm-4 col-xs-12 progress-wizard-step ${step > 3 ? 'finish' : ''} ${step === 3 ? "active" : "disable"}`}>
                            <div className="progress">
                            <div className="progress-bar"></div>
                            </div>
                            <a href="javascript:void(0)" className="progress-wizard-dot">
                            <span style={{fontSize: "20px"}}>3</span>. Payment
                            </a>
                        </div>
                    </div>
              </Col>
            </Row>
            <Row>
                <Col sm={12} md={8}>
                    <Row>
                        <Col style={{display: step === 1 ? '' : 'none'}} className='service'>
                            <form className='num-customer py-4'>
                                <div class="no-padding">
                                    <div class="title">
                                        <h4>Number of Customers</h4>
                                    </div>
                                    <div class="row my-3">
                                        <div class="col-md-5 col-sm-5 col-xs-12 no-padding">
                                            <div class="form-group">
                                                <label>Adult (*)</label>
                                                <input style={{height: "40px", backgroundColor: "#e0e0e0", borderColor: "#888"}} type="number" name="adult" placeholder="" value={adultTimes} onChange={changeAdultTimes} class="form-control has-value" required="required" min="1" />
                                            </div>
                                        </div>
                                        <div class="col-md-7 col-sm-7 col-xs-12 no-padding">
                                        </div>
                                    </div>
                                    <div class="row my-3  d-flex align-items-center">
                                        <div class="col-md-5 col-sm-5 col-xs-12 no-padding">
                                            <div class="form-group">
                                                <label>Children </label>
                                                <input style={{height: "40px", backgroundColor: "#e0e0e0", borderColor: "#888"}} type="number" name="child" placeholder="" value={childrenTimes} onChange={(changeChildrenTimes)} class="form-control  " min="0"/>
                                            </div>
                                        </div>
                                        <div class="col-md-7 col-sm-7 col-xs-12 no-padding">
                                            <ul class="highlight-text mt-2">
                                                <li>applicable for children aged 6 to 12</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="row my-3 d-flex align-items-center">
                                        <div class="col-md-5 col-sm-5 col-xs-12 no-padding">
                                            <div class="form-group">
                                                <label> Infant </label>
                                                <input style={{height: "40px", backgroundColor: "#e0e0e0", borderColor: "#888"}} type="number" name="infant" placeholder="" value={infantTimes} onChange={changeInfantTimes} class="form-control  " min="0" />
                                            </div>
                                        </div>
                                        <div class="col-md-7 col-sm-7 col-xs-12 no-padding">
                                            <ul class="highlight-text">
                                                <li>applicable for infant aged 2 to 5</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div className='payment-method py-4'>
                                <div className="no-padding">
                                    <div class="title">
                                        <h4>Payment methods</h4>
                                    </div>
                                    <div className="row">
                                        <div className="col-12"><b>Choose one of these methods</b></div>
                                        <div className="col-12 methods">
                                            <div class="method" data-payment-type="online">
                                                <input onChange={handlePaymentChange} value="Credit Card" style= {{display: "none"}} type="radio" id="pament-method0" data-fee="0" class="payment-method" name="method" />
                                                <div class="method-content">
                                                    <label class="title" toggle="cCreditCard" for="pament-method0">
                                                        <h4 style={{margin: "0 0 10px;"}}>Credit Card</h4>
                                                        <div class="description">After successfully booking and completing the payment, VieLocaLure Travel will send your e-ticket via email.</div>
                                                        <i class="fa fa-chevron-down"></i>
                                                        <i class="fa fa-check"></i>
                                                    </label>
                                                    <div class="content" id="cCreditCard">
                                                        <p>VieLocaLure accepts payment via domestic ATM cards issued by banks in Vietnam.</p>
                                                        <p>Domestic debit cards (ATM cards): Vietcombank, Vietinbank, DongA, VIBank, Techcombank, HDBank, Tienphong Bank, Military Bank, VietA Bank, Maritime Bank, Eximbank, SHB, Sacombank, NamA Bank,... (23 banks)</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="method" data-payment-type="offline">
                                                <input onChange={handlePaymentChange} value="Cash" style= {{display: "none"}} type="radio" id="pament-method1" data-fee="0" class="payment-method" name="method" />
                                                <div class="method-content">
                                                    <label class="title" toggle="Cash" for="pament-method1" style={{width: '100%'}}>
                                                        <h4 style={{margin: "0 0 10px;"}}>Cash</h4>
                                                        <div class="description">Please visit VieLocaLure's office to make payment and receive your tickets.</div>
                                                        <i class="fa fa-chevron-down"></i>
                                                        <i class="fa fa-check"></i>
                                                    </label>
                                                    <div class="content" id="Cash">
                                                        <p>VieLocaLure office at <i>17 Nguyen Huu Tho St, Tan Phong Ward, District 7</i></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="method" data-payment-type="online">
                                                <input onChange={handlePaymentChange} value="PayPal" style= {{display: "none"}} type="radio" id="pament-method2" data-fee="0" class="payment-method" name="method" />
                                                <div class="method-content">
                                                    <label class="title" toggle="PayPal" for="pament-method2">
                                                        <h4 style={{margin: "0 0 10px;"}}>PayPal</h4>
                                                        <div class="description">After successfully booking and completing the payment, VieLocaLure Travel will send your e-ticket via email.</div>
                                                        <i class="fa fa-chevron-down"></i>
                                                        <i class="fa fa-check"></i>
                                                    </label>
                                                    <div class="content" id="PayPal">
                                                        <p>VieLocaLure accepts payments securely through PayPal, a trusted online payment service.</p>
                                                        <p>With PayPal, you can securely pay using your PayPal account or major credit/debit cards, including Visa, Mastercard, American Express, and Discover.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="method" data-payment-type="online">
                                                <input onChange={handlePaymentChange} value="Momo" style= {{display: "none"}} type="radio" id="pament-method3" data-fee="0" class="payment-method" name="method" />
                                                <div class="method-content">
                                                    <label class="title" toggle="Momo" for="pament-method3">
                                                        <h4 style={{margin: "0 0 10px;"}}>Momo E-Wallet</h4>
                                                        <div class="description">After successfully booking and completing the payment, VieLocaLure Travel will send your e-ticket via email.</div>
                                                        <i class="fa fa-chevron-down"></i>
                                                        <i class="fa fa-check"></i>
                                                    </label>
                                                    <div class="content" id="PayPal">
                                                        <p>Saigontourist accepts payment via MoMo e-wallet.</p>
                                                        <p><b>(*) The maximum limit is 20,000,000 VND</b></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col style={{display: step === 2 ? '' : 'none'}} className='customer'>
                            <div class="payment-wrap bookingForm">
                                <form class="form has-validation-callback" id="info-form">
                                    <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                                        <div class="title">
                                            <h3>THÔNG TIN LIÊN HỆ</h3>
                                        </div>
                                        
                                        <div class="row my-3">
                                            <div class="form-group col-sm-6 col-xs-12">
                                                <div class="form-group has-error">
                                                    <label>Name (*)</label>
                                                    <input type="text" placeholder="" value={userData.name} class="form-control error" required="required" readOnly={true} data-validation="required" data-validation-has-keyup-event="true" style={{borderColor: 'rgb(185, 74, 72);'}} />
                                                </div>
                                            </div>
                                            <div class="form-group col-sm-6 col-xs-12">
                                                <div class="form-group">
                                                    <label> Phone number (*)</label>
                                                    <input type="number" value={userData.phone} class="form-control" required="required" maxlength="15" data-validation="required custom length" readOnly={true} data-validation-length="max15" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row my-3">
                                            <div class="form-group col-sm-6 col-xs-12">
                                                <div class="form-group">
                                                    <label><font ><font >Email (*)</font></font></label>
                                                    <input type="email" value={userData.email} readOnly={true} class="form-control" required="required" data-validation="required email" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="condition-sgt">
                                <label>
                                    <input value={agree} onChange={changeAgreement} type="checkbox" id="agreement" name="agreement" required="required" /> I have read and agreed with <a href="https://saigontourist.net/vi/trang/dieu-khoan-thanh-toan" target="_blank"> <b>terms of use</b></a>
                                </label>
                                <br />
                                <div style={{ width: '100%', height: '250px', overflowY: 'scroll', padding: '10px', margin: 0, border: '1px solid #ccc', borderRight: '2px solid #ccc' }}>
                                    <p>This term is your agreement when using the payment service on the website <a href="http://www.saigontourist.net">VieLocaLure</a> and third-party websites. By ticking the "Agree" box and clicking on the "Accept" button, you agree to all the terms and conditions on these websites.</p>
                                    <p>&nbsp;</p>
                                    <p><strong>Explanation of terms</strong></p>
                                    <p>Terms: are the regulations between Saigontourist Travel and you.</p>
                                    <p>Third party: are the units affiliated with Saigontourist Travel (OnePay, Vietcombank) to support online payments for you.</p>
                                    <p>Electronic ticket: is the information and itinerary of your trip displayed on a sheet of paper that you can print out.</p>
                                    <p><strong>About copyright ownership</strong></p>
                                    <p>The website <a href="http://www.saigontourist.net">www.saigontourist.net</a> is owned by Saigontourist Travel and is protected by copyright law. You are only allowed to use this website for viewing information and registering for online payments for personal purposes and not for any other commercial purposes.</p>
                                    <p>When using the content for reference or as material for research, you must clearly state the source from the content of Saigontourist Travel's website. The use of Saigontourist Travel logos and trademarks in any form is not allowed without the written consent of Saigontourist Travel.</p>
                                    <p><strong>About customer information</strong></p>
                                    <p>When registering for online payment, you will be required to provide some personal information and account information.</p>
                                    <p>For personal information: This information is only used to confirm your purchase of the service and will display the necessary content on the electronic ticket. Saigontourist Travel will also use this contact information to send you events, promotional news, and special offers if you agree. Your information will be kept confidential by Saigontourist Travel and will not be disclosed to third parties except with your consent or as required by law.</p>
                                    <p>For account information: This information will be secured by Saigontourist Travel and third parties using the highest security measures provided by renowned global payment systems such as Visa and MasterCard to ensure the absolute safety of your account information.</p>
                                    <p><strong>About linked websites</strong></p>
                                    <p>Saigontourist Travel's websites contain links to third-party websites. Linking to these third-party websites is only for your convenience and does not constitute endorsement or acceptance of the content, product information on third-party websites. Saigontourist Travel is not responsible for any legal liabilities related to the information on third-party websites.</p>
                                    <p><strong>About tour cancellation</strong></p>
                                    <p>In case of tour cancellation, please send an email notification to Saigontourist Travel. Saigontourist Travel will discuss and confirm all your information. Once the information is confirmed, Saigontourist Travel will refund the money to the account you used for payment after deducting tour cancellation fees. Tour cancellation fees will depend on the specific tour you registered.</p>
                                    <p><strong>Saigontourist Travel's responsibilities</strong></p>
                                    <p>Saigontourist Travel is committed to keeping and storing your information with the highest seriousness.</p>
                                    <p>Resolve any questions, errors, or violations you encounter during the payment process if it is Saigontourist Travel's fault.</p>
                                    <p>Ensure to provide all services as per the program you registered. However, we reserve the right to change the itinerary or cancel the tour at any time if we deem it necessary for your safety.</p>
                                    <p>All changes, if any, will be promptly notified to you before the departure date or immediately after discovering any issues.</p>
                                    <p><strong>Disclaimer for Saigontourist Travel</strong></p>
                                    <p>Saigontourist Travel is not responsible for all the information you provide as we cannot easily verify the accuracy of the information you registered.</p>
                                    <p>Saigontourist Travel is not responsible if your information is stolen from your device due to a computer virus or any other cause.</p>
                                    <p>Saigontourist Travel is not responsible if your computer system is damaged during payment or interfered with due to using an external site.</p>
                                    <p>Saigontourist Travel is not responsible for the loss of your information due to objective incidents such as natural disasters, drought, fire, war, etc.</p>
                                    <p><strong>Customer responsibilities</strong></p>
                                    <p>You are fully responsible for the personal information and credit card information you declared to be truthful and accurate. If there are any mistakes, frauds, or disputes arising, Saigontourist Travel has the right to cancel your purchased tour.</p>
                                    <p>You are responsible for checking your account information promptly to report any issues to Saigontourist Travel. The deadline is within 30 days from the payment date. Saigontourist Travel will not resolve any complaints related to the payment after this period.</p>
                                    <p>You must not use the content of Saigontourist Travel's managed websites for commercial purposes without consent.</p>
                                    <p>You need to apply precautionary measures to ensure that any choice you make when using Saigontourist Travel's websites is not affected by viruses or any other external threats that could interfere or damage your computer system.</p>
                                </div>
                            </div>
                        </Col>
                        <Col style={{display: step === 3 ? '' : 'none'}} className='customer'>
                            <Alert className='m-auto' style={{width: 'fit-content'}} variant='filled' severity="success">
                                    <h4>You have chosen to pay by {payment}.</h4>
                                    <hr />
                                    {
                                        payment === 'Cash' ? (
                                            <p>Check your email at <i>{userData.email}</i> to verify if you are truth booking. After confirmation, I will send you a copy of the invoice</p>
                                        ) : (
                                            <p>Check your email at <i>{userData.email}</i> to scan the QR code. Once your payment is successful, I will send you a copy of the invoice.</p>
                                        )
                                    }
                            </Alert>
                        </Col>
                    </Row>
                    <Row className='mt-4'>
                        <Col className='d-flex justify-content-between'>
                            <button onClick={navigateBack} className='main-box-outline btn'>Back</button>
                            <button onClick={navigateNext} className='main-box btn'>{step === 3 ? 'Home' : 'Next'}</button>
                        </Col>
                    </Row>
                </Col>
                <Col sm={12} md={4}>
                    <button className='w-100 btn main-box'>Hotline: 1900 1909</button>
                    <div className={`mt-3 ${isFixed ? 'fixed-card' : ''}`}>
                        <Card>
                            <Card.Img style={{display: isFixed ? 'none': ''}} variant="top" src={tourPackage.images[0]} />
                            <Card.Body>
                                <div class="infoArea">
                                    <h5 style={{color: "var(--main-blue)"}}>{tourPackage.tourName}</h5>
                                    <hr />
                                    <ul class="list-unstyled">
                                        <li className='my-1'>
                                            <i class="fa me-2 fa-barcode" aria-hidden="true"></i>
                                            <span>Code: <b>{tourDetail.tourCode}</b> </span>
                                        </li>
                                        <li className='my-1'>
                                            <i class="fa me-2 fa-calendar" aria-hidden="true"></i>
                                            Departure date: <b>{tourDetail.date}</b>
                                        </li>
                                        <li className='my-1'>
                                            <i class="fa me-2 fa-clock" aria-hidden="true"></i>
                                            Duration: <b>{tourPackage.duration}</b>
                                        </li>
                                        <li id="liAdult" class="display-hidden my-1" style= {{display: "list-item"}}>
                                            <i class="fa me-2 fa-user-secret" aria-hidden="true"></i>
                                            Adult: 
                                            <span><strong>{tourDetail.adultPrice}</strong></span><span id="adult"> {adultTimes > 0 ? `x ${adultTimes}` : ""}</span>
                                        </li>
                                        
                                        <li id="liChild" class="display-hidden my-1" style={{ display: childrenTimes > 0 ? "" : "none" }}>
                                            <i class="fa me-2 fa-child" aria-hidden="true"></i>
                                            Children:
                                            <span><strong>{tourDetail.childrenPrice}</strong></span><span id="child"> {childrenTimes > 0 ? `x ${childrenTimes}` : ""}</span>
                                        </li>
                                        <li id="liInfant" class="display-hidden my-1" style={{ display: infantTimes > 0 ? "" : "none" }}>
                                            <i class="fa me-2 fa-user-times" aria-hidden="true"></i>
                                            Infant:
                                            <span><strong>{tourDetail.infantPrice}</strong></span><span id="infant"> {infantTimes > 0 ? `x ${infantTimes}` : ""} </span>
                                        </li>
                                        <li id="liPayment" class="display-hidden my-1" style={{ display: payment === '' ? "none" : "" }}>
                                            <i class="fa me-2 fa fa-credit-card" aria-hidden="true"></i>
                                            <span>Payment method: <strong>{payment}</strong></span>
                                        </li>
                                    </ul>
                                    <hr />
                                    <div class="priceTotal">
                                        <h3>
                                            Total: <span id="total-price" style={{color: "var(--main-red)"}}>{tourDetail.adultPrice*adultTimes + tourDetail.childrenPrice*childrenTimes + tourDetail.infantPrice*infantTimes}</span>
                                        </h3>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </Col>
            </Row>
          </Container>
          <div style={{height: "200px"}}></div>
        </section>
      )
    );
}

export default Booking;