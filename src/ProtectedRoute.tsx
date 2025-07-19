import { Outlet } from 'react-router-dom'
import { useAuth } from './AuthContext'

export const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth()
    if (!isAuthenticated) {
        // Save the current location for redirect after auth
        const currentPath = window.location.pathname
        localStorage.setItem('redirectPath', currentPath)

        // Redirect to external auth service
        window.location.href = `${process.env.REACT_APP_AUTH_URL}?redirect_uri=${window.location.origin}/auth/callback`
        return null
    }

    return <Outlet />
}
