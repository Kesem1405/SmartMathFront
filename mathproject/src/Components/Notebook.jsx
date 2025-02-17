import  { useState } from "react";
import '../App.css'
function Notebook({ onClear }) {
    const [notes, setNotes] = useState("");

    const handleChange = (event) => {
        setNotes(event.target.value); // Update the notebook content
    };

    const handleClear = () => {
        setNotes(""); // Clear the notebook content
        onClear(); // Notify the parent component (if needed)
    };

    return (
        <div className="notebook-container">
            <h4 className="text-center mb-3">Notebook</h4>
            <textarea
                className="notebook"
                value={notes}
                onChange={handleChange}
                placeholder="Write your solution here..."
                rows={10}
                style={{
                    width: "100%",
                    background: "linear-gradient(to bottom, #f9f9f9 1.5em, #ccc 1.5em, #ccc 1.6em)",
                    backgroundSize: "100% 1.6em",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "10px",
                    fontFamily: "monospace",
                    fontSize: "1rem",
                    lineHeight: "1.6em",
                    resize: "none", // Prevent resizing
                }}
            />
            <button onClick={handleClear} className="btn btn-secondary mt-3">
                Clear Notebook
            </button>
        </div>
    );
}

export default Notebook;