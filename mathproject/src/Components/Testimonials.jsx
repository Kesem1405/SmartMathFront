import { useState, useEffect } from 'react';
import '../css/Testimonials.css';

const Testimonials = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    const testimonials = [
        {
            avatar: "👦",
            text: "אני ממש אוהב את DynoLearn! זה הפך את לימוד המתמטיקה למשחק כיפי!",
            name: "אלכס, בן 8"
        },
        {
            avatar: "👩",
            text: "הבת שלי השתפרה במתמטיקה בצורה מדהימה תוך כמה שבועות בלבד!",
            name: "שרה, אמא"
        },
        {
            avatar: "👨",
            text: "DynoLearn עוזר לילד שלי להבין מושגים מתמטיים בצורה אינטואיטיבית וכיפית.",
            name: "דוד, אבא"
        },
        {
            avatar: "👧",
            text: "אני אוהבת את הדינוזאורים והפרסים! עכשיו אני מחכה לשיעורי מתמטיקה!",
            name: "נועה, בת 7"
        },
        {
            avatar: "👩‍🏫",
            text: "כמורה, אני ממליצה על DynoLearn לכל התלמידים שלי. הכלי הטוב ביותר שראיתי!",
            name: "מיכל, מורה"
        },
        {
            avatar: "👨‍👦",
            text: "הבן שלי עכשיו מבקש לשחק ב-DynoLearn במקום במשחקי מחשב! לא האמנתי שזה יקרה.",
            name: "אמיר, אבא"
        },
        {
            avatar: "👩‍👧",
            text: "האלגוריתמים החכמים באמת עובדים! רמת הקושי מתאימה עצמה בצורה מושלמת.",
            name: "יעל, אמא"
        },
        {
            avatar: "🧑",
            text: "האתגרים היומיים והפרסים גורמים לי לרצות להתאמן כל יום!",
            name: "איתי, בן 10"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="testimonials">
            <h2>הורים וילדים מספרים</h2>
            <div className="testimonial-container">
                {testimonials.map((testimonial, index) => (
                    <div
                        key={index}
                        className={`testimonial-card ${index === currentTestimonial ? 'active' : ''}`}
                    >
                        <div className="testimonial-avatar">{testimonial.avatar}</div>
                        <p className="testimonial-text">"{testimonial.text}"</p>
                        <div className="testimonial-name">{testimonial.name}</div>
                    </div>
                ))}
            </div>
            <div className="testimonial-dots">
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                        onClick={() => setCurrentTestimonial(index)}
                    />
                ))}
            </div>
        </section>
    );
};

export default Testimonials;