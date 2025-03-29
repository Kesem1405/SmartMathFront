import  { useEffect, useState } from 'react';
import './MathDisplay.css';

function MathDisplay({ expression, triggerAnimation }) {
    const [animationKey, setAnimationKey] = useState(0);

    useEffect(() => {
        // Reset animation when triggerAnimation changes
        setAnimationKey(prevKey => prevKey + 1);
    }, [triggerAnimation]);

    const cleanEquation = (expr) => {
        if (!expr || typeof expr !== 'string') {
            return 'Invalid expression';
        }

        let cleaned = expr
            .replace(/\s+/g, ' ')
            .replace(/·/g, '×')
            .replace(/\*/g, '×')
            .replace(/\//g, '÷')
            .replace(/([+\-×÷=()])/g, ' $1 ');

        cleaned = cleaned
            .replace(/\+\-/g, '-')
            .replace(/\-\+/g, '-')
            .replace(/\+\+/g, '+')
            .replace(/\-\-/g, '+')
            .replace(/\s+/g, ' ')
            .trim();

        const removeRedundantParentheses = (str) => {
            let result = str;
            let previous;
            do {
                previous = result;
                result = result.replace(/^\((.*)\)$/g, '$1');
                result = result.replace(/\((\d+)\)/g, '$1');
            } while (result !== previous);
            return result;
        };

        cleaned = removeRedundantParentheses(cleaned);

        cleaned = cleaned
            .replace(/\*/g, '')
            .replace(/x/gi, 'X')
            .replace(/([+\-*=()])/g, ' $1 ')
            .replace(/\s+/g, ' ')
            .trim();

        return cleaned;
    };

    try {
        const formatted = cleanEquation(expression);
        return (
            <div className="math-display animate-three" key={animationKey}>
                {formatted.split('').map((char, index) => (
                    <span
                        key={index}
                        style={{
                            animationDelay: `${index * 0.05}s`,
                            display: char === ' ' ? 'inline' : 'inline-block'
                        }}
                    >
                        {char}
                    </span>
                ))}
                <span style={{ animationDelay: `${formatted.length * 0.05}s` }}>= ?</span>
            </div>
        );
    } catch (error) {
        console.error('Error formatting equation:', error);
        return <div className="math-error">{expression}</div>;
    }
}

export default MathDisplay;