import {Outlet, Navigate} from 'react-router-dom';

const ProtectedRoute = () => {
    const loggedinUser = true;
    return loggedinUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
