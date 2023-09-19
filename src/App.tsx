import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './pages/ProtectedRoute';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<HomePage />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
