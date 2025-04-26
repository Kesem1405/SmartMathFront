import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/StreakCelebration.css";
import einstein from '../images/einstein.png'


function StreakCelebration({ streak, show, onHide }) {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (streak > 0 && streak % 5 === 0) {
            setVisible(true);
            setMessage(`מדהים! ${streak} תשובות נכונות ברצף!`);
            const timer = setTimeout(() => {
                setVisible(false);
                onHide();
            }, 3000); // Auto-hide after 3 seconds
            return () => clearTimeout(timer);
        }
    }, [streak, onHide]);

    return (
        <Modal show={visible && show} onHide={() => {
            setVisible(false);
            onHide();
        }} centered className="streak-modal">
            <Modal.Body className="text-center streak-modal-body">
                <div className="streak-content">
                    <img
                        src={einstein}
                        alt="Einstein Celebration"
                        className="einstein-image"
                    />
                    <h3 className="streak-message">{message}</h3>
                    <div className="confetti"></div>
                    <div className="confetti"></div>
                    <div className="confetti"></div>
                    <div className="confetti"></div>
                    <div className="confetti"></div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default StreakCelebration;