import { useState, useEffect } from "react";
import axios from "axios";

function PersonalizedMessage(refreshTrigger ) {
    const [message, setMessage] = useState("בואו נתרגל כדי להתקדם!");
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        fetchPersonalizedMessage();
    }, [refreshTrigger ]);

    const fetchPersonalizedMessage = async () => {
        try {
            const token = localStorage.getItem("userToken");
            const response = await axios.get(`http://localhost:8080/api/user/behavior?token=${token}`);
            setUserData(response.data);
            generateMessage(response.data);
        } catch (err) {
            console.error("Error fetching personalized message:", err);
            setMessage("בואו נתרגל כדי להתקדם!");
        }
    };

    const generateMessage = (data) => {
        if (!data) return;

        const { clusterId, successRateAddSub, successRateMultDev } = data;

        if (clusterId === 0) {
            if (successRateAddSub < 0.7) {
                setMessage("בואו נתרגל חיבור וחיסור כדי לבנות בסיס חזק!");
            } else if (successRateMultDev < 0.7) {
                setMessage("כל הכבוד! עכשיו נתמקד בכפל וחילוק.");
            } else {
                setMessage("אתה מוכן לאתגר? ננסה משוואות!");
            }
        } else if (clusterId === 1) {
            if (successRateAddSub < 0.7) {
                setMessage("חזרה על חיבור וחיסור תעזור לך להתקדם!");
            } else if (successRateMultDev < 0.7) {
                setMessage("מעולה! בוא נתרגל כפל וחילוק.");
            } else {
                setMessage("אתה מתקדם! נתחיל עם משוואות.");
            }
        } else if (clusterId === 2) {
            if (successRateMultDev < 0.7) {
                setMessage("נחזק את הכפל והחילוק לפני משוואות.");
            } else {
                setMessage("מדהים! בוא נפתור משוואות מתקדמות!");
            }
        }
    };

    return <div className="personalized-message">{message}</div>;
}

export default PersonalizedMessage;