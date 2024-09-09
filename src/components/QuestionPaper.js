import React, { useState, useEffect } from 'react';
import data from '../data.json';
import './QuestionPaper.css';

const QuestionPaper = () => {
    const [showAnswers, setShowAnswers] = useState(Array(data.length).fill(false));
    const [seenQuestions, setSeenQuestions] = useState(() => {
        const savedSeen = localStorage.getItem('seenQuestions');
        return savedSeen ? JSON.parse(savedSeen) : Array(data.length).fill(false);
    });

    const [flaggedQuestions, setFlaggedQuestions] = useState(() => {
        const savedFlagged = localStorage.getItem('flaggedQuestions');
        return savedFlagged ? JSON.parse(savedFlagged) : Array(data.length).fill(false);
    });

    const [showFlaggedOnly, setShowFlaggedOnly] = useState(false);

    useEffect(() => {
        localStorage.setItem('seenQuestions', JSON.stringify(seenQuestions));
    }, [seenQuestions]);

    useEffect(() => {
        localStorage.setItem('flaggedQuestions', JSON.stringify(flaggedQuestions));
    }, [flaggedQuestions]);

    const handleShowAnswer = (index) => {
        const newShowAnswers = Array(data.length).fill(false); // Reset all answers
        newShowAnswers[index] = true;
        setShowAnswers(newShowAnswers);

        const newSeenQuestions = [...seenQuestions];
        newSeenQuestions[index] = true;
        setSeenQuestions(newSeenQuestions);
    };

    const handleFlagQuestion = (index) => {
        const newFlaggedQuestions = [...flaggedQuestions];
        newFlaggedQuestions[index] = !newFlaggedQuestions[index];
        setFlaggedQuestions(newFlaggedQuestions);
    };

    const filteredData = showFlaggedOnly
        ? data.filter((_, index) => flaggedQuestions[index])
        : data;

    return (
        <div className="question-paper-container">
            <div className="filter-container">
                <label>
                    <input
                        type="checkbox"
                        checked={showFlaggedOnly}
                        onChange={() => setShowFlaggedOnly(!showFlaggedOnly)}
                    />
                    Show flagged only
                </label>
            </div>
            {filteredData.map((card, index) => (
                <div key={index} className="question-item">
                    <div className="index-column">
                        Question {index + 1}
                    </div>
                    <div className="question-column">
                        <div className="question">
                            {card.question}
                            {seenQuestions[index] && <span className="seen-flag">Seen</span>}
                        </div>
                    </div>
                    <div className="answer-column">
                        {showAnswers[index] ? (
                            <div className="answer">
                                {card.options.map((option, i) => (
                                    <div key={i} className={`option ${option.checked ? 'correct' : ''}`}>
                                        {option.option}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <button onClick={() => handleShowAnswer(index)}>Show Answer</button>
                        )}
                        <button onClick={() => handleFlagQuestion(index)}>
                            {flaggedQuestions[index] ? 'Unflag' : 'Flag'}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default QuestionPaper;