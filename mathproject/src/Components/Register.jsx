import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const [passwordCriteria, setPasswordCriteria] = useState({
        minLength: false,
        specialChar: false,
        capitalLetter: false,
    });

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const validatePassword = (pwd) => {
        setPasswordCriteria({
            minLength: pwd.length >= 8,
            specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
            capitalLetter: /[A-Z]/.test(pwd),
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

        // Ensure email and password criteria are valid
        if (!emailRegex.test(email)) {
            setError("Invalid email format.");
            setIsSubmitting(false);
            return;
        }

        if (!passwordCriteria.minLength || !passwordCriteria.specialChar || !passwordCriteria.capitalLetter) {
            setError("Password must be at least 8 characters long, contain a capital letter, and a special character.");
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/user/register", {
                email,  // Send email and password in the request body
                password
            });

            if (response.status === 201) {
                localStorage.setItem("userToken", response.data.token); // Store the token
                navigate("/dashboard", { replace: true }); // Make sure to use 'replace: true' to prevent going back to register
            }
        } catch (err) {
            setError(err.response?.data || "An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };




    return (
        <div className="container mt-5">
            <h2 className="mb-4">Sign Up</h2>
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
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Signing Up..." : "Sign Up"}
                </button>
            </form>
            <p className="mt-3">
                Already have an account?{" "}
                <a href="/login" className="text-primary">
                    Sign In
                </a>
            </p>
        </div>
    );
}

export default Register;
