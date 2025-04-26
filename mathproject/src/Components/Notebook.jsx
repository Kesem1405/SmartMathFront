import  { useState } from "react";
import '../App.css'
function Notebook({ onClear }) {
    const [notes, setNotes] = useState("");

    const handleChange = (event) => {
        setNotes(event.target.value);
    };

    const handleClear = () => {
        setNotes("");
        onClear();
    };

    return (
        <div className="notebook-container">
            <h4 className="text-center mb-2" style={{fontSize: "0.1rem"}}>מחברת עזר</h4>
            <textarea
                className="notebook"
                value={notes}
                onChange={handleChange}
                placeholder="מחברת טיוטה - כי לפעמים צריך רק מקום קטן לרשום את הבלגן בראש 😄 "
                rows={5}
                style={{
                    width: "100%",
                    background: "linear-gradient(to bottom, #f9f9f9 1.5em, #ccc 1.5em, #ccc 1.6em)",
                    backgroundSize: "100% 1.6em",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "6px",
                    fontFamily: "monospace",
                    fontSize: "1.3rem",
                    lineHeight: "1.6em",
                    resize: "none",
                }}
            />
            <button
                onClick={handleClear}
                className="btn btn-secondary mt-2"
                style={{
                    padding: "0.4rem",
                    fontSize: "0.9rem",
                    alignSelf: 'flex-end'
                }}
            >
                נקה 🗑
            </button>
        </div>
    );
}

export default Notebook;