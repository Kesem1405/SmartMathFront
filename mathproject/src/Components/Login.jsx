import React, { useState } from "react";
import axios from "axios";

function Login({ toggleForm }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await axios.post("http://localhost:8080/user/login", {
                email,
                password,
            });

            if (response.status === 200) {
                localStorage.setItem("userToken", response.data.token);

                window.location.href = "/"; // or use your custom redirect
            }
        } catch (err) {
            // Handle login failure
            setError("Invalid email or password.");
            setIsSubmitting(false);
        }
    };

    const isFormValid = email && password;

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
            {error && <div className="text-danger">{error}</div>}
            <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={!isFormValid || isSubmitting}
            >
                {isSubmitting ? "Signing In..." : "Sign In"}
            </button>
        </form>
    );
}

export default Login;
