import { useEffect, useState } from 'react';
import '../css/MathDisplay.css';

function MathDisplay({ expression, triggerAnimation }) {
    const [animationKey, setAnimationKey] = useState(0);

    useEffect(() => {
        setAnimationKey(prevKey => prevKey + 1);
    }, [triggerAnimation]);

    const cleanEquation = (expr) => {
        if (!expr || typeof expr !== 'string') {
            return 'Invalid expression';
        }


        let cleaned = expr
            .replace(/\\left|\\right|\\[\\[\]]/g, '')
            .replace(/\s+/g, ' ')
            .replace(/[·*]/g, '×')
            .replace(/x/gi, '×')
            .replace(/\//g, '÷')
            .replace(/([+\-×÷=()\\[\]])/g, ' $1 ')
            .replace(/\s+/g, ' ')
            .trim();


        cleaned = cleaned
            .replace(/\+\s*\\-/g, ' - ')
            .replace(/\\-\s*\+/g, ' - ')
            .replace(/\+\s*\+/g, ' + ')
            .replace(/\\-\s*\\-/g, ' + ')
            .replace(/\s+/g, ' ')
            .trim();


        const removeOuterBrackets = (str) => {

            if (/^\[(.*)]$/.test(str) || /^\((.*)\)$/.test(str)) {
                const inner = str.slice(1, -1);

                if (!hasUnmatchedBrackets(inner)) {
                    return inner;
                }
            }
            return str;
        };

        const hasUnmatchedBrackets = (s) => {
            let stack = [];
            for (let c of s) {
                if (c === '[' || c === '(') stack.push(c);
                else if (c === ']') {
                    if (stack.pop() !== '[') return true;
                } else if (c === ')') {
                    if (stack.pop() !== '(') return true;
                }
            }
            return stack.length > 0;
        };

        cleaned = removeOuterBrackets(cleaned);


        cleaned = cleaned
            .replace(/\s+/g, ' ')
            .replace(/([×÷+])\s*\1+/g, '$1')
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
                <span style={{ animationDelay: `${formatted.length * 0.05}s` }}></span>
            </div>
        );
    } catch (error) {
        console.error('Error formatting equation:', error);
        return <div className="math-error">{expression}</div>;
    }
}

export default MathDisplay;