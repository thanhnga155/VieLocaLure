import axios from 'axios'

const serverApi = process.env.REACT_APP_SERVER_API;

export const GetReportTour = async (options, startDate, endDate) => {
    let url = ''
    switch (options) {
        case 0: // all
            url = '/all'
            break;
        case 1: // monthly (this year)
            url = '/year'
            break;
        case 2: // weekly (this month)
            url = '/month'
            break;
        case 3: // daily (this week)
            url = '/week'
            break;
        case 4: // custom
            url = `/custom?start=${startDate}&end=${endDate}`
            break;
    
        default:
            url = '/month'
            break;
    }
    const config = {
        method: 'GET',
        url: `${serverApi}/report/bookings/tour` + url,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    }
    const { data } = await axios(config);
    return data
}

export const GetReportCustomer = async (options, startDate, endDate) => {
    let url = ''
    switch (options) {
        case 0: // all
            url = '/all'
            break;
        case 1: // monthly (this year)
            url = '/year'
            break;
        case 2: // weekly (this month)
            url = '/month'
            break;
        case 3: // daily (this week)
            url = '/week'
            break;
        case 4: // custom
            url = `/custom?start=${startDate}&end=${endDate}`
            break;
    
        default:
            url = '/month'
            break;
    }
    const config = {
        method: 'GET',
        url: `${serverApi}/report/bookings/customer` + url,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    }
    const { data } = await axios(config);
    return data
}

export const GetProfit = async (option) => {
    const config = {
        method: 'GET',
        url: `${serverApi}/report/profit` + option,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    }
    const { data } = await axios(config);
    return data
}

export const GetCustomerActivity = async () => {
    const config = {
        method: 'GET',
        url: `${serverApi}/report/activity/customer`,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    }
    const { data } = await axios(config);
    return data
}

export const GetBookingActivity = async () => {
    const config = {
        method: 'GET',
        url: `${serverApi}/report/activity/booking`,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    }
    const { data } = await axios(config);
    return data
}