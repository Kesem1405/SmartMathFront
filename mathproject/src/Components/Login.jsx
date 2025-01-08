import React, { useState } from "react";
import axios from "axios";

function Login({ toggleForm }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle the form submission
    const handleLogin = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await axios.post("http://localhost:8080/login", {
                email,
                password,
            });

            // Check for successful login response
            if (response.status === 200) {
                // Store token or session info in localStorage
                localStorage.setItem("userToken", response.data.token);

                // Redirect or update UI (you can also use react-router to navigate)
                window.location.href = "/"; // or use your custom redirect
            }
        } catch (err) {
            // Handle login failure
            setError("Invalid email or password.");
            setIsSubmitting(false);
        }
    };

    // Disable the sign-in button if fields are empty
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
