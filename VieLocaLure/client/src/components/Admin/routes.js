import React from 'react'
import Area from './AreaManagement'
import Province from './ProvinceManagement'
import Destination from './DestinationManagement'
import Customer from './Customer'
import Tour from './Tour'
import ReportTour from './ReportTour'
import ReportCustomer from './ReportCustomer'

const Dashboard = React.lazy(() => import('./Dashboard'))
const Menu = React.lazy(() => import('./MenuManagement'))

const routes = [
    { path: '/admin', exact: true, name: 'Dashboard', element: Dashboard },
    { path: '/admin/dashboard', name: '', element: Dashboard },
    { path: '/admin/managements', name: 'Managements', exact: true },
    { path: '/admin/managements/menu', name: 'Menu', element: Menu },
    { path: '/admin/managements/location/area', name: 'Area', element: Area },
    { path: '/admin/managements/location/province', name: 'Province', element: Province },
    { path: '/admin/managements/location/destination', name: 'Destination', element: Destination },
    { path: '/admin/managements/customer', name: 'Customer', element: Customer },
    { path: '/admin/managements/tour', name: 'Tour', element: Tour },
    { path: '/admin/booking', name: 'Report', exact: true },
    { path: '/admin/booking/tour', name: 'Tour Bookings', element: ReportTour },
    { path: '/admin/booking/customer', name: 'Customer Bookings', element: ReportCustomer },
]

export default routes