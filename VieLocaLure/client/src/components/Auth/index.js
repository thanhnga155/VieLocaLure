import { Outlet, Navigate } from 'react-router-dom'

const Auth = () => {
	const user = localStorage.getItem('user')
	if (user) {
		return <Outlet />
	}
	return <Navigate to={'/login'} replace />
}

export default Auth;