import React, { Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes';

const Content = () => {
    return (
        <CContainer className="px-4" lg>
                <Suspense fallback={<CSpinner color="primary" />}>
                    
                    <Routes>
                        {routes.map((route, idx) => {
                            let path = route.path.replace('/admin', '')
                            return (
                                route.element && (
                                    <Route
                                        key={idx}
                                        path={path}
                                        exact={route.exact}
                                        name={route.name}
                                        element={<route.element />}
                                    />
                                )
                            )
                        })}
                    </Routes>
                </Suspense>
        </CContainer>
    )
}

export default React.memo(Content)