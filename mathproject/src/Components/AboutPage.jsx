import 'react';
import '../css/AboutPage.css';
import { FaBrain, FaGamepad, FaUsers, FaRobot } from 'react-icons/fa';
import Navbar from "./Navbar";
import shimonImage from '../images/shimonImage.jpeg'
import kesemImage from '../images/kesem.jpeg'
import elonImage from '../images/elon.jpeg'
import hilaImage from '../images/hila.jpeg'
import shiraImage from '../images/shira.jpeg'
import ilayImage from '../images/ilay.jpg'

const AboutPage = () => {
    return (

        <div className="about-container">



            <div style={{top:"30%", position:"relative"}}>
                <Navbar></Navbar>
            </div>


            <div className="section">
                <h2>קצת עלינו</h2>
                <p className="vision-text">
                    <span className="vision-highlight">צוות DynoLearn</span> הוא קבוצת מפתחים צעירה וחדשנית ששואפת לשנות
                    את פני החינוך הדיגיטלי.
                    באמצעות טכנולוגיות מתקדמות ואלגוריתמים מתוחכמים, יצרנו פלטפורמה חכמה שמתאימה עצמה באופן אישי
                    לכל תלמיד - לא רק בודקת ידע, אלא <span
                    className="vision-highlight">מבינה את דרכי החשיבה</span> ומעצבת חווית למידה מותאמת אישית.
                    <br/><br/>
                    החזון שלנו פשוט אך שאפתני: להפוך כל שיעור לחוויה <span
                    className="vision-highlight">מעוררת השראה</span>, שבה כל ילד מגלה את הכוח האמיתי
                    של הלמידה - לא כחובה, אלא כמסע מרתק של גילוי וצמיחה.
                </p>
            </div>

            <div className="section">
                <h2>איך זה עובד?</h2>
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
                <p>הכירו את האנשים שגורמים לזה לקרות</p>
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
                            src={ilayImage}
                            alt="אילי"
                            className="member-photo"
                        />
                        <h3>ברלינסקי אילי</h3>
                        <p className="position">מנהל שיווק</p>
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
