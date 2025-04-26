import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { SERVER_URL, ADMIN_USERNAME, ADMIN_PASSWORD } from "./Constants.js";

function Login({onAuthSuccess}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        if (email === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            localStorage.setItem("userToken", ADMIN_PASSWORD);
            localStorage.setItem("ADMIN", "true");
            onAuthSuccess();
            return;
        }

        try {
            const response = await axios.post(`${SERVER_URL}/api/user/login`, {
                email,
                password,
            });

            const { status, data } = response;

            if (status === 200 && data.success) {
                localStorage.setItem("userToken", data.token);
                localStorage.setItem("ADMIN", data.isAdmin ? "true" : "false");

                onAuthSuccess();
            } else {
                setError(data.message || "התחברות נכשלה, נסה שוב.");
            }
        } catch (err) {
            setError(err.response?.data?.message || "אימייל או סיסמא שגוים.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <div className="mb-3">
                <input
                    type="email"
                    className="form-control"
                    placeholder="אימייל"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <input
                    type="password"
                    className="form-control"
                    placeholder="סיסמא"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button type="submit" className="btn btn-primary w-100" disabled={!email || !password || isSubmitting}>
                {isSubmitting ? "מתחבר.." : "התחברות"}
            </button>
        </form>
    );
}

Login.propTypes = {
    toggleForm: PropTypes.func.isRequired,
    onAuthSuccess: PropTypes.func.isRequired,
    onForgotPassword: PropTypes.func.isRequired,
};

export default Login;
