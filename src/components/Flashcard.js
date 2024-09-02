// src/components/Flashcard.js
import React, { useState } from 'react';
import './Flashcard.css';

const Flashcard = ({ question, options, getNextCard }) => {
    const [showAnswer, setShowAnswer] = useState(false);

    const handleCardClick = () => {
        setShowAnswer(true);
    };

    const handleNextCard = () => {
        setShowAnswer(false);
        getNextCard();
    };

    return (
        <div className="flashcard">
            <div className="question" onClick={handleCardClick}>
                {question}
            </div>
            {showAnswer && (
                <div className="answer">
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className={`option ${option.checked ? 'correct' : ''}`}
                        >
                            {option.option}
                        </div>
                    ))}
                </div>
            )}
            {showAnswer && (
                <button className="next-button" onClick={handleNextCard}>
                    Next
                </button>
            )}
        </div>
    );
};

export default Flashcard;
