import React from 'react';
import './MathDisplay.css';

function MathDisplay({ expression }) {
    const cleanEquation = (expr) => {
        // שלב 0: בדיקת קלט בסיסית
        if (!expr || typeof expr !== 'string') {
            return 'Invalid expression';
        }

        let cleaned = expr
            .replace(/\\[a-z⋅˚]+/g, '') // מסיר תווים מיוחדים
            .replace(/\s+/g, ' ') // משאיר רווח בודד בין איברים
            .replace(/·/g, '*'); // ממיר נקודת כפל לכוכבית

        // שלב 1: ניקוי אופרטורים רצופים
        cleaned = cleaned
            .replace(/\+\-/g, '-')
            .replace(/\-\+/g, '-')
            .replace(/\+\+/g, '+')
            .replace(/\-\-/g, '+');

        // שלב 2: הסרת סוגריים מיותרים תוך שמירה על סדר פעולות
        const removeRedundantParentheses = (str) => {
            let result = str;
            let previous;

            do {
                previous = result;
                // מסיר סוגריים סביב מונח בודד שאינו דורש סדר פעולות
                result = result.replace(/\((-?\d+[a-zA-Z]?)\)/g, '$1');
                // מסיר סוגריים כפולים מיותרים
                result = result.replace(/\(\(([^()]+)\)\)/g, '($1)');
            } while (result !== previous);

            return result;
        };

        cleaned = removeRedundantParentheses(cleaned);

        // שלב 3: עיצוב סופי
        cleaned = cleaned
            .replace(/\*/g, '') // מסיר כוכביות כפל
            .replace(/x/gi, 'X') // ממיר x ל-X גדול
            // מוסיף רווחים סביב אופרטורים וסוגריים
            .replace(/([+\-*=()])/g, ' $1 ')
            .replace(/\s+/g, ' ') // מנקה רווחים כפולים
            .trim();

        return cleaned;
    };

    try {
        const formatted = cleanEquation(expression);
        return <div className="math-display">{formatted} = ?</div>;
    } catch (error) {
        console.error('Error formatting equation:', error);
        return <div className="math-error">{expression}</div>;
    }
}

export default MathDisplay;