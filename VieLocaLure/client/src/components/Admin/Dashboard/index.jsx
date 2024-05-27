import { cibPaypal, cilCash, cilCreditCard, cilPeople, cilUser, cilUserFemale, cilWallet } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CAvatar, CButton, CButtonGroup, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CProgress, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import React, { useEffect, useState } from 'react'
import MainChart from './mainChart';
import { GetBookingActivity, GetCustomerActivity, GetProfit } from '../../../services/StatisticsApi';

const sampleData = {
    "totalCustomer": 152,
    "newCustomer": 12,
    "bookings": 215,
    "tours": 27,
    "bookingWeekly": [
        { title: 'Monday', booking: 34, search: 78 },
        { title: 'Tuesday', booking: 56, search: 94 },
        { title: 'Wednesday', booking: 12, search: 67 },
        { title: 'Thursday', booking: 43, search: 91 },
        { title: 'Friday', booking: 22, search: 73 },
        { title: 'Saturday', booking: 53, search: 82 },
        { title: 'Sunday', booking: 9, search: 69 }, 
    ],
    "bookingGender": [ 53, 43 ], // Male and Female respectively (unit: %)
    "paymentMethod": [
        { title: 'Cash', percent: 56, value: '191,235' },
        { title: 'Credit Card', percent: 15, value: '51,223' },
        { title: 'PayPal', percent: 21, value: '37,564' },
        { title: 'Wallet', percent: 8, value: '27,319' },
    ],
}

const paymentMethodMapping = {
    'Credit Card': cilCreditCard,
    'Cash': cilCash,
    'PayPal': cibPaypal,
    'Wallet': cilWallet
}


const profitSample = [
	{"timeline": "January", "revenue": 30000, "profit": 24000},
    {"timeline": "February", "revenue": 50000, "profit": 30000},
    {"timeline": "March", "revenue": 41000, "profit": 36000},
    {"timeline": "April", "revenue": 27000, "profit": 26000},
    {"timeline": "May", "revenue": 35000, "profit": 34000},
    {"timeline": "June", "revenue": 41000, "profit": 32000},
    {"timeline": "July", "revenue": 42000, "profit": 38000},
    {"timeline": "August", "revenue": 45000, "profit": 40000},
    {"timeline": "September", "revenue": 25000, "profit": 22000},
    {"timeline": "October", "revenue": 31000, "profit": 28000},
    {"timeline": "November", "revenue": 31000, "profit": 25000},
    {"timeline": "December", "revenue": 40000, "profit": 31000}
]

const userSample = [
    {
        avatar: { src: 'avatar1', status: 'success' }, // get random in [success, info, danger, warning]
        user: {
            name: 'Yiorgos Avraamu',
            new: true, // new user or not
            registered: 'Jan 1, 2024',
        },
        usage: {
            value: 50, // the percentage of bookings of a user per total bookings of all users // the 
            color: 'success', // the same as status type
        },
        payment: 'Credit Card', // the last payment method 
        activity: '10 sec ago', // last booking time
    },
    {
        avatar: { src: 'avatar2', status: 'danger' },
        user: {
            name: 'Avram Tarasios',
            new: false,
            registered: 'Jan 1, 2023',
        },
        usage: {
            value: 22,
            color: 'info',
        },
        payment: 'Credit Card',
        activity: '5 minutes ago',
    },
    {
        avatar: { src: 'avatar3', status: 'warning' },
        user: { 
            name: 'Quintin Ed', 
            new: true, 
            registered: 'Jan 1, 2023' 
        },
        usage: {
            value: 74,
            color: 'warning',
        },
        payment: 'Cash',
        activity: '1 hour ago',
    },
    {
        avatar: { src: 'avatar4', status: 'secondary' },
        user: { 
            name: 'Enéas Kwadwo', 
            new: true, 
            registered: 'Jan 1, 2023' 
        },
        usage: {
            value: 98,
            color: 'danger',
        },
        payment: 'PayPal',
        activity: 'Last month',
    },
    {
        avatar: { src: 'avatar5', status: 'success' },
        user: {
            name: 'Agapetus Tadeáš',
            new: true,
            registered: 'Jan 1, 2023',
        },
        usage: {
            value: 22,
            color: 'primary',
        },
        payment: 'Wallet',
        activity: 'Last week',
    },
]


const Dashboard = () => {
    const [optionStats, setOptionStats] = useState('month');
    const [data, setData] = useState({});
    const [profitStat, setProfitStat] = useState([]);
    const [userBooking, setUserBooking] = useState([]);

    // booking activity
    useEffect(() => {
        const fetchData = async () => {
            try {
                setData(await GetBookingActivity());
            } catch (e) {
                console.log('Error fetch report booking activity data', e);
            }
        }

        fetchData();

        if (Object.keys(data).length === 0) {
            setData(sampleData);
        }

    }, [data]);

    // customer activity
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setUserBooking(await GetCustomerActivity());
            } catch (e) {
                console.log('Error fetch report customer activity data', e);
            }
        }

        fetchUser();

        if (userBooking.length === 0) {
            setUserBooking(userSample);
        }
    }, [userBooking]);

    // profit
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await GetProfit(optionStats);
                setProfitStat(data);
            }
            catch (e) {
                console.log('Error fetch report profit data', e);
            }
        }

        fetchData();
    }, [optionStats]);

    useEffect(() => {
        if (profitStat.length === 0) {
            setProfitStat(profitSample);
        }

    }, [profitStat]);

    const changeOptionStates = (value) => {
        setOptionStats(value.toLowerCase());
    }

    return (
        <>
            {
                Object.keys(data).length !== 0 && profitStat.length !== 0 && userBooking.length !== 0 && 
                (
                    <>
                        <CCard className="mb-4">
                            <CCardBody>
                                <CRow>
                                    <CCol sm={5}>
                                    <h4 id="traffic" className="card-title mb-0">
                                        Revenue and Profit
                                    </h4>
                                    <div className="small text-body-secondary">January - July 2023</div>
                                    </CCol>
                                    <CCol sm={7} className="d-none d-md-block">
                                    <CButtonGroup className="float-end me-3">
                                        {['Day', 'Month', 'Year'].map((value) => (
                                        <CButton
                                            color="outline-secondary"
                                            key={value}
                                            className="mx-0"
                                            active={value.toLowerCase() === optionStats}
                                            onClick={() => changeOptionStates(value)}
                                        >
                                            {value}
                                        </CButton>
                                        ))}
                                    </CButtonGroup>
                                    </CCol>
                                </CRow>
                                <MainChart profitStat={profitStat}/>
                            </CCardBody>
        
                            <CCardFooter>
                            <CRow
                                    xs={{ cols: 1, gutter: 4 }}
                                    sm={{ cols: 2 }}
                                    lg={{ cols: 2 }}
                                    xl={{ cols: 2 }}
                                    className="mb-2 text-center"
                                >
                                    <CCol>
                                        <div className="text-body-secondary">Total Revenue</div>
                                        <div className="fw-semibold text-truncate">
                                            {
                                                profitStat.reduce((total, { revenue }) => total + revenue, 0)
                                            }
                                        </div>
                                    </CCol>
                                    <CCol>
                                        <div className="text-body-secondary">Total Revenue</div>
                                        <div className="fw-semibold text-truncate">
                                            {
                                                profitStat.reduce((total, { profit }) => total + profit, 0)
                                            }
                                        </div>
                                    </CCol>
                                </CRow>
                            </CCardFooter>
                        </CCard>
        
                        <CRow>
                            <CCol xs>
                            <CCard className="mb-4">
                                <CCardHeader>Traffic {' & '} Sales</CCardHeader>
                                <CCardBody>
                                <CRow>
                                    <CCol xs={12} md={6} xl={6}>
                                        <CRow>
                                            <CCol xs={6}>
                                                <div className="border-start border-start-4 border-start-info py-1 px-3">
                                                    <div className="text-body-secondary text-truncate small">New Customers</div>
                                                    <div className="fs-5 fw-semibold"> {data.newCustomer} </div>
                                                </div>
                                            </CCol>
                                            <CCol xs={6}>
                                                <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                                                    <div className="text-body-secondary text-truncate small">
                                                        Total Customers
                                                    </div>
                                                    <div className="fs-5 fw-semibold"> { data.totalCustomer }</div>
                                                </div>
                                            </CCol>
                                        </CRow>
                                        
                                        <hr className="mt-0" />
                                        
                                        {data.bookingWeekly.map((item, index) => (
                                            <div className="progress-group mb-4" key={index}>
                                            <div className="progress-group-prepend">
                                                <span className="text-body-secondary small">{item.title}</span>
                                            </div>
                                            <div className="progress-group-bars">
                                                <CProgress thin color="info" value={item.booking} />
                                                <CProgress thin color="danger" value={item.search} />
                                            </div>
                                            </div>
                                        ))}
                                    </CCol>
                                    
                                    <CCol xs={12} md={6} xl={6}>
                                        <CRow>
                                            <CCol xs={6}>
                                            <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                                                <div className="text-body-secondary text-truncate small">Tours</div>
                                                <div className="fs-5 fw-semibold"> {data.tours} </div>
                                            </div>
                                            </CCol>
                                            <CCol xs={6}>
                                            <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                                                <div className="text-body-secondary text-truncate small">Bookings </div>
                                                <div className="fs-5 fw-semibold"> {data.bookings} </div>
                                            </div>
                                            </CCol>
                                        </CRow>
        
                                        <hr className="mt-0" />

                                        <div className="progress-group mb-4">
                                            <div className="progress-group-header">
                                                <CIcon className="me-2" icon={cilUser} size="lg" />
                                                <span>Male</span>
                                                <span className="ms-auto fw-semibold">{data.bookingGender[0]}%</span>
                                            </div>
                                            <div className="progress-group-bars">
                                                <CProgress thin color="warning" value={data.bookingGender[0]} />
                                            </div>
                                        </div>

                                        <div className="progress-group mb-4">
                                            <div className="progress-group-header">
                                                <CIcon className="me-2" icon={cilUserFemale} size="lg" />
                                                <span>Male</span>
                                                <span className="ms-auto fw-semibold">{data.bookingGender[1]}%</span>
                                            </div>
                                            <div className="progress-group-bars">
                                                <CProgress thin color="warning" value={data.bookingGender[1]} />
                                            </div>
                                        </div>
        
                                        <hr className="my-3" />
        
                                        {data.paymentMethod.map((item, index) => (
                                            <div className="progress-group" key={index}>
                                            <div className="progress-group-header">
                                                <CIcon className="me-2" icon={item.icon} size="lg" />
                                                <span>{item.title}</span>
                                                <span className="ms-auto fw-semibold">
                                                {item.value}{' '}
                                                <span className="text-body-secondary small">({item.percent}%)</span>
                                                </span>
                                            </div>
                                            <div className="progress-group-bars">
                                                <CProgress thin color="success" value={item.percent} />
                                            </div>
                                            </div>
                                        ))}
                                    </CCol>
                                </CRow>
        
                                <br />
        
                                <CTable align="middle" className="mb-0 border" hover responsive>
                                    <CTableHead className="text-nowrap">
                                        <CTableRow>
                                            <CTableHeaderCell className="bg-body-tertiary text-center">
                                            <CIcon icon={cilPeople} />
                                            </CTableHeaderCell>
                                            <CTableHeaderCell className="bg-body-tertiary">User</CTableHeaderCell>
                                            <CTableHeaderCell className="bg-body-tertiary">Usage</CTableHeaderCell>
                                            <CTableHeaderCell className="bg-body-tertiary text-center">Payment Method</CTableHeaderCell>
                                            <CTableHeaderCell className="bg-body-tertiary">Activity</CTableHeaderCell>
                                        </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                        {userBooking.map((item, index) => (
                                            <CTableRow v-for="item in tableItems" key={index}>
                                                <CTableDataCell className="text-center">
                                                    <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                                                </CTableDataCell>
                                                <CTableDataCell>
                                                    <div>{item.user.name}</div>
                                                    <div className="small text-body-secondary text-nowrap">
                                                        <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
                                                        {item.user.registered}
                                                    </div>
                                                </CTableDataCell>
                                                <CTableDataCell>
                                                    <div className="d-flex justify-content-between text-nowrap">
                                                        <div className="fw-semibold">{item.usage.value}%</div>
                                                        <div className="ms-3">
                                                            <small className="text-body-secondary">{item.user.registered + ' - now'}</small>
                                                        </div>
                                                    </div>
                                                    <CProgress thin color={item.usage.color} value={item.usage.value} />
                                                </CTableDataCell>
                                                <CTableDataCell className="text-center">
                                                    <CIcon icon={paymentMethodMapping[item.payment]} />
                                                    {/* {paymentMethodMapping[item.payment]} */}
                                                </CTableDataCell>
                                                <CTableDataCell>
                                                    <div className="small text-body-secondary text-nowrap">Last booking</div>
                                                    <div className="fw-semibold text-nowrap">{item.activity}</div>
                                                </CTableDataCell>
                                            </CTableRow>
                                        ))}
                                    </CTableBody>
                                </CTable>
                                </CCardBody>
                            </CCard>
                            </CCol>
                        </CRow>
                    </>
                )
            }
        </>
    )
}

export default Dashboard;