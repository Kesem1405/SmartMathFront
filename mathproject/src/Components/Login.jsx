import { useState } from "react";
import PropTypes from "prop-types"; // ✅ Import PropTypes
import axios from "axios";
import {SERVER_URL, ADMIN_USERNAME, ADMIN_PASSWORD} from "./Constants.js";

function Login({ toggleForm, onAuthSuccess }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        if(email === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            localStorage.setItem("userToken", "c55fb88bfb0ef042de72760db7a80c2c");
            localStorage.setItem("ADMIN", "true"); // store as string

            onAuthSuccess();
            return;
        }

        try {
            const response = await axios.post(SERVER_URL+"/api/user/login",
                {
                email,
                password
            });

            const { status, data } = response;

            if (status === 200 && data.success) {
                localStorage.setItem("userToken", data.token);
                onAuthSuccess();
            } else {
                setError(data.message || "Login failed. Please try again.");
            }

        } catch (err) {
            setError(err.response?.data?.message || "Invalid email or password.");
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

        </form>
    );
}

Login.propTypes = {
    toggleForm: PropTypes.func.isRequired,
    onAuthSuccess: PropTypes.func.isRequired,
};

export default Login;
