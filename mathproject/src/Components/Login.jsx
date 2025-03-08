import { useState } from "react";
import PropTypes from "prop-types"; // ✅ Import PropTypes
import axios from "axios";

function Login({ toggleForm, onAuthSuccess }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            const response = await axios.post("http://localhost:8080/user/login", null, {
                params: { email, password }
            });

            const { status, data } = response;

            if (status === 200 && data.success && data.token) {
                localStorage.setItem("userToken", data.token);
                onAuthSuccess();
            } else {
                setError(getErrorMessage(data.errorCode));
            }

        } catch (err) {
            setError(err.response?.data || "Invalid email or password.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const getErrorMessage = (errorCode) => {
        switch (errorCode) {
            case 104:
                return "User does not exist. Please check your email and password.";
            case -1:
                return "Please fill in all required fields.";
            default:
                return "An unexpected error occurred. Please try again.";
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <div className="mb-3">
                <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button type="submit" className="btn btn-primary w-100" disabled={!email || !password || isSubmitting}>
                {isSubmitting ? "Signing In..." : "Sign In"}
            </button>
            <button type="button" className="btn btn-link w-100 mt-2" onClick={toggleForm}>
                Don&#39;t have an account? Sign Up
            </button>
        </form>
    );
}

Login.propTypes = {
    toggleForm: PropTypes.func.isRequired,
    onAuthSuccess: PropTypes.func.isRequired,
};

export default Login;
