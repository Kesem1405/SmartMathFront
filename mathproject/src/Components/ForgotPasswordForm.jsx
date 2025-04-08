import { useState } from "react";
import axios from "axios";
import sha256 from "crypto-js/sha256";

function ForgotPasswordForm({ onBack }) {
    const [email, setEmail] = useState("");
    const [step, setStep] = useState(1); // 1: enter email, 2: enter code, 3: new password
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleEmailSubmit = async () => {
        try {
            await axios.post("/api/user/forgotpassword", { email });
            setStep(2);
            setMessage("✅ קוד האימות נשלח אליך לאימייל.");
        } catch (error) {
            setMessage("❌ שליחת הקוד נכשלה. נסה שוב.");
        }
    };

    const handleCodeSubmit = async () => {
        const hashedCode = sha256(code).toString();
        console.log(code + " Original code");
        console.log(hashedCode + " Hash code")
        try {
            await axios.post("/api/user/verifycode", {
                email,
                code: hashedCode,
            });
            setStep(3); // Move to password reset step
            setMessage("✅ הקוד אומת בהצלחה. כעת תוכל לשנות את הסיסמה.");
        } catch (err) {
            setMessage("❌ הקוד שגוי. נסה שוב.");
        }
    };

    const handlePasswordReset = async () => {
        const hashedPassword = sha256(password).toString();
        try {
            await axios.post("/api/user/resetpassword", {
                email,
                newPassword: hashedPassword,
            });
            setMessage("✅ הסיסמה עודכנה בהצלחה! חזור להתחברות.");
            setTimeout(() => onBack(), 2000); // Back to login after 2s
        } catch (err) {
            setMessage("❌ שגיאה בעדכון הסיסמה. נסה שוב.");
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
