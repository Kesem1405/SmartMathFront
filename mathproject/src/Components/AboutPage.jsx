import 'react';
import '../css/AboutPage.css';
import { FaBrain, FaGamepad, FaUsers, FaRobot } from 'react-icons/fa';
import Navbar from "./Navbar";
import shimonImage from '../images/shimonImage.jpeg'
import kesemImage from '../images/kesem.jpeg'
import elonImage from '../images/elon.jpeg'
import hilaImage from '../images/hila.jpeg'
import shiraImage from '../images/shira.jpeg'

const AboutPage = () => {
    return (

        <div className="about-container">



            <div>
                <Navbar></Navbar>
            </div>


            <div className="section">
                <h2>קצת עלינו</h2>
                <p>
                    .אנחנו קבוצה נלהבת וחדורת מוטיבציה של סטודנטים למדעי המחשב, שהתאחדנו סביב חזון משותף ונועז
                    להמציא מחדש ולחולל שינוי אמיתי בדרך שבה ילדים לומדים.
                    אנו מאמינים שהלמידה צריכה להיות חוויה מרתקת, נגישה וחכמה,
                    ולכן פיתחנו מערכת טכנולוגית חדשנית ופורצת דרך.
                    ייחודה של המערכת שלנו הוא בכך שהיא לא רק בוחנת ידע,
                    אלא מתמקדת בהבנה עמוקה של תהליך הלמידה הייחודי של כל ילד וילדה.
                    אנו מחויבים לרתום את כוחה של הטכנולוגיה כדי ליצור חוויות למידה מותאמות אישית,
                    כאלה שיציתו את הסקרנות הטבעית ויטפחו הצלחה מתמשכת.
                    מטרתנו היא להעניק לדור הבא כלים שיאפשרו להם לצמוח,
                    למצות את מלוא הפוטנציאל הטמון בהם, ולבנות יחד את עתיד החינוך. </p>
            </div>

            <div className="section">
                <h2>?איך זה עובד</h2>
                <p>
                    חוויות הלימוד עם DynoLearn היא ייחודית ודינמית ביסודה.
                    אצלנו במקום אפליקציה סטטית תקבלו שותף למידה מבוסס מערכות מתוחכמות הלומד אתכם ומתאים את עצמו באופן
                    דינמי ובזמן אמת.
                </p>
                <div className="how-it-works">
                    <div className="feature">
                        <div className="feature-icon">
                            <FaBrain/>
                        </div>
                        <b>התאמה חכמה</b>
                        <p>השאלות משתנות בהתאם לרמת הידע של הילד בזמן אמת</p>
                    </div>
                    <div className="feature">
                        <div className="feature-icon">
                            <FaRobot/>
                        </div>
                        <b>בינה מלאכותית מתקדמת</b>
                        <p>שימוש בעצי החלטה ומודלים של מרקוב כדי לדייק את הלמידה</p>
                    </div>
                    <div className="feature">
                        <div className="feature-icon">
                            <FaGamepad/>
                        </div>
                        <b>למידה מהנה</b>
                        <p>חוויית למידה אינטראקטיבית עם אלמנטים משחקיים</p>
                    </div>
                </div>
            </div>

            <div className="section">
                <h2>הצוות שלנו</h2>
                <p>מכירים את האנשים שעושים את זה לקרות</p>
                <FaUsers className="team-icon"/>

                <div className="team-members">
                    {/* Team Member 1 */}
                    <div className="team-member">
                        <img
                            src={shimonImage}
                            alt="שמעון"
                            className="member-photo"
                        />
                        <h3>דיגילוב שמעון</h3>
                        <p className="position">מנהל טכנולוגיות</p>
                    </div>

                    {/* Team Member 2 */}
                    <div className="team-member">
                        <img
                            src={kesemImage}
                            alt="קסם"
                            className="member-photo"
                        />
                        <h3>חליס קסם</h3>
                        <p className="position">מנהל מערך FRONTEND</p>
                    </div>

                    {/* Team Member 3 */}
                    <div className="team-member">
                        <img
                            src={shiraImage}
                            alt="שירה"
                            className="member-photo"
                        />
                        <h3>סלארי שירה</h3>
                        <p className="position">מנהלת מוצר</p>
                    </div>

                    {/* Team Member 4 */}
                    <div className="team-member">
                        <img
                            src={elonImage}
                            alt="אילון"
                            className="member-photo"
                        />
                        <h3>סיבוני אילון</h3>
                        <p className="position">מנהל מערך BACKEND</p>
                    </div>
                    <div className="team-member">
                        <img
                            src=""
                            alt="אילי"
                            className="member-photo"
                        />
                        <h3>ברלינסקי אילי</h3>
                        <p className="position">מנהלת שיווק</p>
                    </div>
                    <div className="team-member">
                        <img
                            src={hilaImage}
                            alt="הילה"
                            className="member-photo"
                        />
                        <h3>מלכה הילה</h3>
                        <p className="position">ראש צוות UX/UI</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AboutPage;
