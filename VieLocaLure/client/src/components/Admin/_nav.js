import React from 'react'
import CIcon from '@coreui/icons-react'
import {
    cilBarChart,
    cilBell,
    cilCalculator,
    cilChartPie,
    cilCursor,
    cilDescription,
    cilDrop,
    cilNotes,
    cilPencil,
    cilPuzzle,
    cilSpeedometer,
    cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
    {
        component: CNavItem,
        name: 'Dashboard',
        to: '/admin/dashboard',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    },
    {
        component: CNavTitle,
        name: 'Managements',
    },
    {
        component: CNavItem,
        name: 'Menu',
        to: '/admin/managements/menu',
        icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    },
    {
        component: CNavGroup,
        name: 'Location',
        to: '/admin/managements/location',
        icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
        items: [
            {
                component: CNavItem,
                name: 'Area',
                to: '/admin/managements/location/area',
            },
            {
                component: CNavItem,
                name: 'Province',
                to: '/admin/managements/location/province',
            },
            {
                component: CNavItem,
                name: 'Destination',
                to: '/admin/managements/location/destination',
            },
        ]
    },
    {
        component: CNavItem,
        name: 'Customers',
        to: '/admin/managements/customer',
        icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Tour',
        to: '/admin/managements/tour',
        icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    },
    {
        component: CNavTitle,
        name: 'Report & Statistics',
    },
    {
        component: CNavItem,
        name: 'Tour Bookings',
        to: '/admin/booking/tour',
        icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Customer Bookings',
        to: '/admin/booking/customer',
        icon: <CIcon icon={cilBarChart} customClassName="nav-icon" />,
    }
]

export default _nav