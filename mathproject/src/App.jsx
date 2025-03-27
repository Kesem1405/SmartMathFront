import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import AuthPage from "./Components/AuthPage.jsx";
import {AdminPanel} from './Components/AdminPanel.jsx'
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<Navigate to="/auth" />} />
                <Route path="/adminpanel" element={<AdminPanel />}/>
            </Routes>
        </Router>
    );
}

export default App;