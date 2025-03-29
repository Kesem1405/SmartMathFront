import 'react';
import '../App.css'

const Feedback = (feedback ) => {

    return (
        feedback && (
            // eslint-disable-next-line react/prop-types
            <p className={feedback.includes("נכונה") ? "text-success" : "text-danger"}
               style={{border: '1px solid red'}}>  {/* Temporary debug border */}
                {feedback}
            </p>
        )
    );
};

export default Feedback;