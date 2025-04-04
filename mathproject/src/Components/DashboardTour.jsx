import Joyride from 'react-joyride';
import { useState } from 'react';

const DashboardTour = () => {
    const [tourRun, setTourRun] = useState(() => {
        return !localStorage.getItem("hasSeenTour");
    });
    const [tourKey, setTourKey] = useState(0);

    const steps = [
        {
            target: '.notebook-container',
            content: 'היי! ברוך הבא לסיור. נתחיל במחברת, תוכל להיעזר בה על מנת לפתור תרגילים, תוכל למחוק אותה תמיד באמצעות הכפתור "ניקוי מחברת"',
            disableBeacon: true,
        },
        {
            target: '.question-container',
            content: 'כאן יופיעו השאלות שלך, השאלות יופיע במרכז הלוח!',
        },
        {
            target: '.emoji-navbar',
            content: 'זהו התפריט שלך, בעזרתו תוכל לגשת למידע שלך, לחזור לעמוד פתירת השאלות, או להתנתק.',
        },
        {
            target: '.sidebar-progress',
            content: 'כאן תוכל לראות את המצב הנוכחי שלך, איזה נושא אתה כרגע, ובאיזה דרגת קושי אתה.',
            placement: 'left',
        },
        {
            target: '.stats-and-button-container',
            content: 'כאן תענה את התשובה שלך על כל שאלה, תראה כמה זמן לקח לך, כמה תשובות נכונות כבר עשית (נקודות), ומה הוא הרצף הנוכחי שלך!'
        }
    ];

    const startTour = () => {
        setTourRun(true);
        setTourKey(prev => prev + 1); // 👈 forces Joyride to restart
    };

    return (
        <>
            {/* Tour Info Button */}
            <button
                onClick={startTour}
                style={{
                    position: 'absolute',
                    top: 20,
                    left: -300,
                    zIndex: 10001,
                    padding: '10px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#3498db',
                    color: 'white',
                    cursor: 'pointer'
                }}
            >
                ℹ️ מידע
            </button>

            {/* Joyride Tour */}
            <Joyride
                key={tourKey} // Force re-init when restarted
                steps={steps}
                run={tourRun}
                continuous
                showSkipButton
                showProgress
                disableScrolling
                scrollToFirstStep
                disableOverlayClose
                styles={{ options: { zIndex: 10000 } }}
                locale={{
                    back: 'הקודם',
                    close: 'סגור',
                    last: 'סיום',
                    next: 'הבא',
                    skip: 'דלג',
                }}
                callback={(data) => {
                    const { status } = data;

                    if (status === 'finished' || status === 'skipped') {
                        localStorage.setItem("hasSeenTour", "true");
                        setTourRun(false);
                    }
                }}
            />
        </>
    );
};

export default DashboardTour;