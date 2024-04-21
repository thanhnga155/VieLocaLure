import React from 'react'
import CIcon from '@coreui/icons-react'
import {
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
        // badge: {
        //   color: 'info',
        //   text: 'NEW',
        // },
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
        name: 'Report',
        to: '/admin/report',
        icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
    }
//   {
//     component: CNavGroup,
//     name: 'Buttons',
//     to: '/admin/buttons',
//     icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
//     items: [
//       {
//         component: CNavItem,
//         name: 'Buttons',
//         to: '/admin/buttons/buttons',
//       },
//       {
//         component: CNavItem,
//         name: 'Buttons groups',
//         to: '/admin/buttons/button-groups',
//       },
//       {
//         component: CNavItem,
//         name: 'Dropdowns',
//         to: '/admin/buttons/dropdowns',
//       },
//     ],
//   },
//   {
//     component: CNavGroup,
//     name: 'Forms',
//     icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
//     items: [
//       {
//         component: CNavItem,
//         name: 'Form Control',
//         to: '/admin/forms/form-control',
//       },
//       {
//         component: CNavItem,
//         name: 'Select',
//         to: '/admin/forms/select',
//       },
//       {
//         component: CNavItem,
//         name: 'Checks & Radios',
//         to: '/admin/forms/checks-radios',
//       },
//       {
//         component: CNavItem,
//         name: 'Range',
//         to: '/admin/forms/range',
//       },
//       {
//         component: CNavItem,
//         name: 'Input Group',
//         to: '/admin/forms/input-group',
//       },
//       {
//         component: CNavItem,
//         name: 'Floating Labels',
//         to: '/admin/forms/floating-labels',
//       },
//       {
//         component: CNavItem,
//         name: 'Layout',
//         to: '/admin/forms/layout',
//       },
//       {
//         component: CNavItem,
//         name: 'Validation',
//         to: '/admin/forms/validation',
//       },
//     ],
//   },
//   {
//     component: CNavItem,
//     name: 'Charts',
//     to: '/admin/charts',
//     icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
//   },
//   {
//     component: CNavGroup,
//     name: 'Icons',
//     icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
//     items: [
//       {
//         component: CNavItem,
//         name: 'CoreUI Free',
//         to: '/admin/icons/coreui-icons',
//         badge: {
//           color: 'success',
//           text: 'NEW',
//         },
//       },
//       {
//         component: CNavItem,
//         name: 'CoreUI Flags',
//         to: '/admin/icons/flags',
//       },
//       {
//         component: CNavItem,
//         name: 'CoreUI Brands',
//         to: '/admin/icons/brands',
//       },
//     ],
//   },
//   {
//     component: CNavGroup,
//     name: 'Notifications',
//     icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
//     items: [
//       {
//         component: CNavItem,
//         name: 'Alerts',
//         to: '/admin/notifications/alerts',
//       },
//       {
//         component: CNavItem,
//         name: 'Badges',
//         to: '/admin/notifications/badges',
//       },
//       {
//         component: CNavItem,
//         name: 'Modal',
//         to: '/admin/notifications/modals',
//       },
//       {
//         component: CNavItem,
//         name: 'Toasts',
//         to: '/admin/notifications/toasts',
//       },
//     ],
//   },
//   {
//     component: CNavItem,
//     name: 'Widgets',
//     to: '/admin/widgets',
//     icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
//     badge: {
//       color: 'info',
//       text: 'NEW',
//     },
//   },
//   {
//     component: CNavTitle,
//     name: 'Extras',
//   },
//   {
//     component: CNavGroup,
//     name: 'Pages',
//     icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
//     items: [
//       {
//         component: CNavItem,
//         name: 'Login',
//         to: '/admin/login',
//       },
//       {
//         component: CNavItem,
//         name: 'Register',
//         to: '/admin/register',
//       },
//       {
//         component: CNavItem,
//         name: 'Error 404',
//         to: '/admin/404',
//       },
//       {
//         component: CNavItem,
//         name: 'Error 500',
//         to: '/admin/500',
//       },
//     ],
//   },
//   {
//     component: CNavItem,
//     name: 'Docs',
//     href: 'https://coreui.io/react/docs/templates/installation/',
//     icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
//   },
]

export default _nav