import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {SERVER_URL} from "./Constants.js";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

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
        const criteria = {
            minLength: pwd.length >= 8,
            specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
            capitalLetter: /[A-Z]/.test(pwd),
        };
        setPasswordCriteria(criteria);

        if (!criteria.minLength || !criteria.specialChar || !criteria.capitalLetter) {
            setError("הסיסמא חייבת להיות בעלת אורך של 8 תווים לפחות, אות אחת גדולה, ותו מיוחד.");
        } else {
            setError("");
        }
    };
    const handlePasswordChange = (e) => {
        const pwd = e.target.value;
        setPassword(pwd);
        validatePassword(pwd);
    };

    const handleFirstNameChange = (e) => {
        const fn = e.target.value;
        setFirstName(fn);
    };

    const handleLastNameChange = (e) => {
        const ln = e.target.value;
        setLastName(ln);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        if (!isFormValid()) {
            setIsSubmitting(false);
            return;
        }

        try {
            const userDto = { email, password, firstName, lastName };
            const response = await axios.post(SERVER_URL +"/api/user/register",
                userDto);

            const data = response.data;

            if (data.success) {
                localStorage.setItem("userToken", data.token);
                navigate("/dashboard", { replace: true });
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError(err.response?.data?.message || "קרתה תקלה, תנסה שוב.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFormValid = () => {
        return (
            !isSubmitting &&
            emailRegex.test(email) &&
            passwordCriteria.minLength &&
            passwordCriteria.specialChar &&
            passwordCriteria.capitalLetter
        );
    };

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);

        if (!emailRegex.test(newEmail)) {
            setError("פורמט האימייל שגוי.");
        } else {
            setError("");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">הרשמה</h2>
            <form onSubmit={handleRegister}>
                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="אימייל"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="סיסמא"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    <div className="passwordCriteria mt-2">
                        <p style={{color: passwordCriteria.minLength ? "green" : "red"}}>
                            לפחות 8 תווים {passwordCriteria.minLength ? "✔️" : "❌"}
                        </p>
                        <p style={{color: passwordCriteria.specialChar ? "green" : "red"}}>
                            תו מיוחד {passwordCriteria.specialChar ? "✔️" : "❌"}
                        </p>
                        <p style={{color: passwordCriteria.capitalLetter ? "green" : "red"}}>
                            אות גדולה{passwordCriteria.capitalLetter ? "✔️" : "❌"}
                        </p>
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="שם פרטי"
                            value={firstName}
                            onChange={handleFirstNameChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="שם משפחה"
                            value={lastName}
                            onChange={handleLastNameChange}
                            required
                        />
                    </div>

                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={!isFormValid()}
                >
                    {isSubmitting ? "נרשם.." : "הרשמה"}
                </button>
            </form>

        </div>
    );
}

export default Register;
