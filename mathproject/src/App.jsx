import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import AuthPage from "./Components/AuthPage.jsx";
import {AdminPanel} from './Components/AdminPanel.jsx'
import AboutPage from "./Components/AboutPage.jsx";
import PageNotFound from "./Components/PageNotFound.jsx";
import AccessibilityButton from './Components/AccessibilityButton.jsx'
import HomePage from './Components/DynoLearnHome.jsx'

function App() {
    return (
        <Router>
            <AccessibilityButton />
            <Routes>
                <Route path="/" element={<HomePage />} />

                <Route path="/auth" element={<AuthPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin-panel" element={<AdminPanel />}/>
                <Route path="/aboutPage" element={<AboutPage />}/>
                <Route path="/home" element={<HomePage />}/>

                <Route path="*" element={<PageNotFound />}/>
            </Routes>
        </Router>
    );
}

export default App;