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

        if (!emailRegex.test(email)) {
            setError("Invalid email format.");
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/check-email", { email });

            if (response.data.isEmailTaken) {
                setError("Email is already in use.");
                setIsSubmitting(false);
            } else {
                await axios.post("http://localhost:8080/register", { email, password });
                window.location.href = "/"; // or use your custom redirect
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
            setIsSubmitting(false);
        }
    };

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
