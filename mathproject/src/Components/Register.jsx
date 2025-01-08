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

    // Email validation regex (simple format check)
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Password validation checks
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

    // Handle password input change
    const handlePasswordChange = (e) => {
        const pwd = e.target.value;
        setPassword(pwd);
        validatePassword(pwd);
    };

    // Handle form submission
    const handleRegister = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Check if email is valid
        if (!emailRegex.test(email)) {
            setError("Invalid email format.");
            setIsSubmitting(false);
            return;
        }

        try {
            // Send request to the backend to check if the email is already in use
            const response = await axios.post("http://localhost:8080/check-email", { email });

            // If email is in use, show error
            if (response.data.isEmailTaken) {
                setError("Email is already in use.");
                setIsSubmitting(false);
            } else {
                // Proceed with registration (send email and password to backend)
                await axios.post("http://localhost:8080/register", { email, password });

                // If successful, redirect or update UI
                window.location.href = "/"; // or use your custom redirect
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
            setIsSubmitting(false);
        }
    };

    // Disable the button if email or password doesn't meet criteria
    const isFormValid = emailRegex.test(email) && passwordCriteria.minLength && passwordCriteria.specialChar && passwordCriteria.capitalLetter && password.length >= 8;

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

            {error && <div className="text-danger">{error}</div>}

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
