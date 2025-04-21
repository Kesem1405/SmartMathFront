import { useState } from "react";
import axios from "axios";

function ForgotPasswordForm({ onBack }) {
    const [email, setEmail] = useState("");
    const [step, setStep] = useState(1); // 1: enter email, 2: enter code, 3: new password
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleEmailSubmit = async () => {
        try {
            await axios.post("http://localhost:8080/api/user/forgot-password", null, {
                params: { email }
            });
            setStep(2);
            setMessage("✅ קוד האימות נשלח אליך לאימייל.");
        } catch (error) {
            setMessage("❌ שליחת הקוד נכשלה. נסה שוב.");
            console.error("Error in forgot password:", error);
        }
    };

    const handleCodeSubmit = async () => {

        try {
            const response = await axios.post("http://localhost:8080/api/user/code-verification", {
                email: email,
                code: code
            });

            if (response.data) {
                setStep(3);
                setMessage("✅ הקוד אומת בהצלחה. כעת תוכל לשנות את הסיסמה.");
            } else {
                setMessage("❌ הקוד שגוי. נסה שוב.");
            }
        } catch (err) {
            setMessage("❌ שגיאה באימות הקוד. נסה שוב.");
            console.error("Error in code verification:", err);
        }
    };

    const handlePasswordReset = async () => {
        try {
            await axios.post("http://localhost:8080/api/user/reset-password", {
                email: email,
                newPassword: password
            });
            setMessage("✅ הסיסמה עודכנה בהצלחה! חזור להתחברות.");
            setTimeout(() => onBack(), 2000);
        } catch (err) {
            setMessage("❌ שגיאה בעדכון הסיסמה. נסה שוב.");
            console.error("קרתה בעיה בשינוי הסיסמא:", err);
        }
    };

    return (
        <div>
            <h4 className="text-center text-secondary mb-3">שחזור סיסמה</h4>

            {step === 1 && (
                <>
                    <input
                        type="email"
                        placeholder="הכנס אימייל"
                        className="form-control mb-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button className="btn btn-primary w-100 mb-2" onClick={handleEmailSubmit}>
                        שלח קוד
                    </button>
                </>
            )}

            {step === 2 && (
                <>
                    <input
                        type="text"
                        placeholder="הכנס קוד אימות"
                        className="form-control mb-2"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                    <button className="btn btn-success w-100 mb-2" onClick={handleCodeSubmit}>
                        אמת קוד
                    </button>
                </>
            )}

            {step === 3 && (
                <>
                    <input
                        type="password"
                        placeholder="בחר סיסמה חדשה"
                        className="form-control mb-2"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="btn btn-warning w-100 mb-2" onClick={handlePasswordReset}>
                        אפס סיסמה
                    </button>
                </>
            )}

            {message && <div className="alert alert-info mt-2">{message}</div>}

            <button className="btn btn-link w-100 mt-2" onClick={onBack}>
                🔙 חזרה לדף ההתחברות
            </button>
        </div>
    );
}

export default ForgotPasswordForm;