import {Outlet, Navigate} from 'react-router-dom';
import {useAppSelector, RootState} from '../store/store';

const ProtectedRoute = () => {
    const {loggedInUser} = useAppSelector((state: RootState) => state.user);

    return loggedInUser.id ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
