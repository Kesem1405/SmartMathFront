import React, { useState } from "react";
import axios from "axios";

function Register({ toggleForm }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [passwordCriteria, setPasswordCriteria] = useState({
        minLength: false,
        specialChar: false,
        capitalLetter: false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const validatePassword = (pwd) => {
        const minLength = pwd.length >= 8;
        const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
        const capitalLetter = /[A-Z]/.test(pwd);

        setPasswordCriteria({
            minLength,
            specialChar,
            capitalLetter,
        });
    };

    const handlePasswordChange = (e) => {
        const pwd = e.target.value;
        setPassword(pwd);
        validatePassword(pwd);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            // Validate email format
            if (!emailRegex.test(email)) {
                setError("Invalid email format.");
                setIsSubmitting(false);
                return;
            }

            // Validate password criteria
            if (!passwordCriteria.minLength || !passwordCriteria.specialChar || !passwordCriteria.capitalLetter) {
                setError("Password must be at least 8 characters long, contain a capital letter, and a special character.");
                setIsSubmitting(false);
                return;
            }

            const response = await axios.post("http://localhost:8080/user/register", null, {
                params: { email, password } // Send parameters as query params
            });

            if (response.status === 200) {
                window.location.href = "/"; // Redirect to home page
            }
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data);
            } else {
                setError("An error occurred. Please try again.");
            }
            setIsSubmitting(false);
        }
    };

    const isFormValid = emailRegex.test(email) && passwordCriteria.minLength && passwordCriteria.specialChar && passwordCriteria.capitalLetter;

    return (
        <form onSubmit={handleRegister}>
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
                    onChange={handlePasswordChange}
                    required
                />
                <div className="passwordCriteria mt-2">
                    <p style={{ color: passwordCriteria.minLength ? "green" : "red" }}>
                        Minimum 8 characters {passwordCriteria.minLength ? "✔️" : "❌"}
                    </p>
                    <p style={{ color: passwordCriteria.specialChar ? "green" : "red" }}>
                        Special character {passwordCriteria.specialChar ? "✔️" : "❌"}
                    </p>
                    <p style={{ color: passwordCriteria.capitalLetter ? "green" : "red" }}>
                        Capital letter {passwordCriteria.capitalLetter ? "✔️" : "❌"}
                    </p>
                </div>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={!isFormValid || isSubmitting}
            >
                {isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>
        </form>
    );
}

export default Register;