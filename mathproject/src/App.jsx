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

                <Route path="/auth" element={<AuthPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/adminpanel" element={<AdminPanel />}/>
                <Route path="/aboutPage" element={<AboutPage />}/>
                <Route path="*" element={<PageNotFound />}/>
                <Route path="home" element={<HomePage />}/>
            </Routes>
        </Router>
    );
}

export default App;