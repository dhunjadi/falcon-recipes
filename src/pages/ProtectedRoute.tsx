import {Outlet, Navigate} from 'react-router-dom';

const ProtectedRoute = () => {
    const loggedinUser = false;
    return loggedinUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
