import { useState, useEffect, useRef } from 'react';
import '../css/DynoLearnHome.css';
import Navbar from './Navbar.jsx';
import Testimonials from './Testimonials.jsx';

const DynoLearnHome = () => {
    const [activeEquation, setActiveEquation] = useState(0);
    const [floatingShapes, setFloatingShapes] = useState([]);
    const [heroAnimation, setHeroAnimation] = useState(0);
    const equationContainerRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(0);

    const equations = [
        "2 + 2 = 4",

        "3 × 5 = 15",
        "x² + y² = z²",
        "π ≈ 3.14159",
        "a² + b² = c²",
        "e^(iπ) + 1 = 0",
        "1 + 2 + 3 + ... + n = n(n+1)/2",
        "E = mc²",
        "F = ma",
        "PV = nRT",
        "V = IR",
        "A = πr²",
        "C = 2πr",
        "V = (4/3)πr³",
        "sin²(θ) + cos²(θ) = 1",
        "tan(θ) = sin(θ) / cos(θ)",
        "d/dx (x^n) = nx^(n-1)",
        "∫ x^n dx = (x^(n+1))/(n+1) + C",
        "∫ (1/x) dx = ln|x| + C",
        "lim (x→0) sin(x)/x = 1",
        "e ≈ 2.71828",
        "n! = 1 × 2 × 3 × ... × n",
        "∑_{k=0}^∞ ar^k = a / (1-r), |r|<1",

    ];


    useEffect(() => {
        if (equationContainerRef.current) {
            const tempElement = document.createElement('div');
            tempElement.style.position = 'absolute';
            tempElement.style.visibility = 'hidden';
            tempElement.style.whiteSpace = 'nowrap';
            tempElement.style.fontSize = '3rem';
            tempElement.style.fontFamily = 'Courier New, monospace';
            document.body.appendChild(tempElement);

            let maxWidth = 0;
            equations.forEach(eq => {
                tempElement.textContent = eq;
                maxWidth = Math.max(maxWidth, tempElement.offsetWidth);
            });

            document.body.removeChild(tempElement);
            setContainerWidth(maxWidth-108); // Add some padding
        }
    }, []);

    // Generate random floating shapes
    useEffect(() => {
        const shapes = [];
        const types = ['circle', 'square', 'triangle', 'pentagon', 'hexagon', 'star'];

        for (let i = 0; i < 15; i++) {
            shapes.push({
                id: i,
                type: types[Math.floor(Math.random() * types.length)],
                size: Math.random() * 30 + 20,
                left: Math.random() * 100,
                top: Math.random() * 100,
                rotation: Math.random() * 360,
                color: `hsl(${Math.random() * 360}, 70%, 60%)`,
                speed: Math.random() * 2 + 0.5
            });
        }

        setFloatingShapes(shapes);
    }, []);

    // Cycle through equations
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveEquation((prev) => (prev + 1) % equations.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Hero animation cycle
    useEffect(() => {
        const interval = setInterval(() => {
            setHeroAnimation((prev) => (prev + 1) % 4);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="dyno-learn-home">
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            {/* Animated background elements */}
            <div className="floating-shapes-container">
                {floatingShapes.map(shape => (
                    <div
                        key={shape.id}
                        className={`floating-shape ${shape.type}`}
                        style={{
                            width: `${shape.size}px`,
                            height: `${shape.size}px`,
                            left: `${shape.left}%`,
                            top: `${shape.top}%`,
                            transform: `rotate(${shape.rotation}deg)`,
                            backgroundColor: shape.color,
                            animation: `float ${shape.speed}s infinite ease-in-out alternate`
                        }}
                    />
                ))}
            </div>

            {/* Hero section */}
            <header className="hero">
                <div className={`hero-content animation-${heroAnimation}`}>
                    <h1>
                        <span className="title-dyno">Dyno</span>
                        <span className="title-learn">Learn</span>
                    </h1>
                    <div>
                        <Navbar/>
                    </div>

                    <div

                        className="equation-display"
                        ref={equationContainerRef}
                        style={{width: containerWidth ? `${containerWidth}px` : 'auto'}}
                    >
                        <div className="equation">{equations[activeEquation]}</div>
                        <div className="equation-sub">Powered by smart algorithms!</div>
                    </div>
                </div>

            </header>

            {/* Main content */}
            <main className="content">
                <Testimonials />
            </main>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-equation">
                    <span>Learning</span>
                    <span className="operator">+</span>
                    <span>Fun</span>
                    <span className="operator">=</span>
                    <span className="highlight">Success!</span>
                </div>

                <div className="copyright">
                    © {new Date().getFullYear()} DynoLearn. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default DynoLearnHome;