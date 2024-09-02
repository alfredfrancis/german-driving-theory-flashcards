// src/App.js
import React, { useState, useEffect } from 'react';
import Flashcard from './components/Flashcard';
import data from './data.json';
import './App.css'; // Import a global CSS file for basic styling

function App() {
    const [currentCard, setCurrentCard] = useState(null);

    const getRandomCard = () => {
        const randomIndex = Math.floor(Math.random() * data.length);
        setCurrentCard(data[randomIndex]);
    };

    useEffect(() => {
        getRandomCard();
    }, []);

    return (
        <div className="app-container">
            {currentCard && (
                <Flashcard
                    key={currentCard.question}
                    question={currentCard.question}
                    options={currentCard.options}
                    getNextCard={getRandomCard}
                />
            )}
        </div>
    );
}

export default App;
