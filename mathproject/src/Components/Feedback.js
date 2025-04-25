import 'react';
import '../App.css'

const Feedback = (feedback ) => {

    return (
        feedback && (

            <p className={feedback.includes("נכונה") ? "text-success" : "text-danger"}
               style={{border: '1px solid red'}}>
                {feedback}
            </p>
        )
    );
};

export default Feedback;