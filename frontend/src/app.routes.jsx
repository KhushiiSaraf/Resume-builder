import {createBrowserRouter} from 'react-router-dom'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import Protected from './features/auth/components/Protected'
import PublicRoute from './features/auth/components/PublicRoute'

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <PublicRoute><Login /></PublicRoute>
    },
    {
        path: "/register",
        element: <PublicRoute><Register /></PublicRoute>
    },
    {
        path: "/",
        element: <Protected><h1 className='text-3xl font-bold text-center mt-20'>Home Page - Protected Route</h1></Protected>
    }
]);