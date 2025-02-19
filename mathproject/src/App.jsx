import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Components/Dashboard.jsx";
import Profile from "./Components/Profile";
import AuthPage from "./Components/AuthPage.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<Navigate to="/auth" />} />
            </Routes>
        </Router>
    );
}

export default App;