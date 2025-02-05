import 'react';

const Feedback = ( feedback ) => {
    return (
        feedback && (
            <div className={`text-center mt-3 ${feedback.includes("Correct") ? "text-success" : "text-danger"}`}>
                {feedback}
            </div>
        )
    );
};

export default Feedback;