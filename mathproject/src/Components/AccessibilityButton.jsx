import { useState, useEffect } from 'react';
import '../css/AccessibilityButton.css';

const STORAGE_KEY = 'accessibilitySettings';

const AccessibilityButton = () => {
    const loadSettings = () => {
        const savedSettings = localStorage.getItem(STORAGE_KEY);
        return savedSettings
            ? JSON.parse(savedSettings)
            : {
                fontSize: 16,
                highContrast: false,
                grayscale: false,
                darkMode: false,
                underlineLinks: false,
                readableFont: false,
            };
    };

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [settings, setSettings] = useState(loadSettings());

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    }, [settings]);

    useEffect(() => {

        document.documentElement.style.fontSize = `${settings.fontSize}px`;

        if (settings.highContrast) {
            document.body.classList.add('high-contrast');
        } else {
            document.body.classList.remove('high-contrast');
        }

        if (settings.grayscale) {
            document.body.classList.add('grayscale');
        } else {
            document.body.classList.remove('grayscale');
        }

        if (settings.darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }

        if (settings.underlineLinks) {
            document.body.classList.add('underline-links');
        } else {
            document.body.classList.remove('underline-links');
        }

        if (settings.readableFont) {
            document.body.classList.add('readable-font');
        } else {
            document.body.classList.remove('readable-font');
        }
    }, [settings]);

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        if (isMenuOpen) {
            document.addEventListener('keydown', handleKeyDown);
            return () => {
                document.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [isMenuOpen]);

    const increaseFontSize = () => {
        setSettings(prev => ({
            ...prev,
            fontSize: Math.min(prev.fontSize + 2, 24)
        }));
    };

    const decreaseFontSize = () => {
        setSettings(prev => ({
            ...prev,
            fontSize: Math.max(prev.fontSize - 2, 12)
        }));
    };

    const toggleSetting = (settingName) => {
        setSettings(prev => ({
            ...prev,
            [settingName]: !prev[settingName]
        }));
    };

    const resetSettings = () => {
        setSettings({
            fontSize: 16,
            highContrast: false,
            grayscale: false,
            darkMode: false,
            underlineLinks: false,
            readableFont: false,
        });
    };

    return (
        <div className="accessibility-container">
            <button
                className="accessibility-button"
                aria-label="נגישות"
                aria-expanded={isMenuOpen}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
            </button>

            {isMenuOpen && (
                <div
                    className="accessibility-menu"
                    aria-hidden={!isMenuOpen}
                    role="dialog"
                    aria-labelledby="accessibility-menu-title"
                    aria-modal="true"
                >
                    <h3 id="accessibility-menu-title">אפשרויות נגישות</h3>

                    <div className="accessibility-option">
                        <span>גודל טקסט:</span>
                        <button
                            onClick={decreaseFontSize}
                            aria-label="הקטן גודל טקסט"
                            disabled={settings.fontSize <= 12}
                        >
                            טקסט קטן
                        </button>
                        <button
                            onClick={increaseFontSize}
                            aria-label="הגדל גודל טקסט"
                            disabled={settings.fontSize >= 24}
                        >
                            טקסט גדול
                        </button>
                    </div>

                    <div className="accessibility-option">
                        <button
                            onClick={() => toggleSetting('highContrast')}
                            aria-pressed={settings.highContrast}
                            aria-label={settings.highContrast ? "כיבוי ניגודיות גבוהה" : "הפעלת ניגודיות גבוהה"}
                        >
                            {settings.highContrast ? 'כיבוי ניגודיות גבוהה' : 'הפעלת ניגודיות גבוהה'}
                        </button>
                    </div>

                    <div className="accessibility-option">
                        <button
                            onClick={() => toggleSetting('grayscale')}
                            aria-pressed={settings.grayscale}
                            aria-label={settings.grayscale ? "כיבוי גווני אפור" : "הפעלת גווני אפור"}
                        >
                            {settings.grayscale ? 'כיבוי גווני אפור' : 'הפעלת גווני אפור'}
                        </button>
                    </div>

                    <div className="accessibility-option">
                        <button
                            onClick={() => toggleSetting('darkMode')}
                            aria-pressed={settings.darkMode}
                            aria-label={settings.darkMode ? "כיבוי מצב לילה" : "הפעלת מצב לילה"}
                        >
                            {settings.darkMode ? 'כיבוי מצב לילה' : 'הפעלת מצב לילה'}
                        </button>
                    </div>

                    <div className="accessibility-option">
                        <button
                            onClick={() => toggleSetting('underlineLinks')}
                            aria-pressed={settings.underlineLinks}
                            aria-label={settings.underlineLinks ? "כיבוי קו תחתון לקישורים" : "הפעלת קו תחתון לקישורים"}
                        >
                            {settings.underlineLinks ? 'כיבוי קו תחתון לקישורים' : 'הפעלת קו תחתון לקישורים'}
                        </button>
                    </div>

                    <div className="accessibility-option">
                        <button
                            onClick={() => toggleSetting('readableFont')}
                            aria-pressed={settings.readableFont}
                            aria-label={settings.readableFont ? "כיבוי גופן קריא" : "הפעלת גופן קריא"}
                        >
                            {settings.readableFont ? 'כיבוי גופן קריא' : 'הפעלת גופן קריא'}
                        </button>
                    </div>

                    <div className="accessibility-option">
                        <button
                            onClick={resetSettings}
                            aria-label="איפוס כל הגדרות הנגישות"
                        >
                            איפוס הגדרות
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccessibilityButton;