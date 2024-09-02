// src/App.js
import React, { useState, useEffect, useCallback } from 'react';
import Flashcard from './components/Flashcard';
import data from './data.json';
import './App.css';

function App() {
    const [currentCard, setCurrentCard] = useState(null);
    const [cardFrequency, setCardFrequency] = useState(() => {
        const savedFrequency = localStorage.getItem('cardFrequency');
        return savedFrequency ? JSON.parse(savedFrequency) : {};
    });

    useEffect(() => {
        localStorage.setItem('cardFrequency', JSON.stringify(cardFrequency));
    }, [cardFrequency]);

    const getNextCard = useCallback(() => {
        const totalWeight = data.reduce((sum, _, index) => sum + (1 / (cardFrequency[index] || 1)), 0);
        let randomWeight = Math.random() * totalWeight;
        
        for (let i = 0; i < data.length; i++) {
            const cardWeight = 1 / (cardFrequency[i] || 1);
            if (randomWeight <= cardWeight) {
                setCurrentCard(data[i]);
                setCardFrequency(prev => {
                    const newFrequency = { ...prev, [i]: (prev[i] || 0) + 1 };
                    localStorage.setItem('cardFrequency', JSON.stringify(newFrequency));
                    return newFrequency;
                });
                break;
            }
            randomWeight -= cardWeight;
        }
    }, [cardFrequency]);

    useEffect(() => {
        getNextCard();
    }, []);

    return (
        <div className="app-container">
            {currentCard && (
                <Flashcard
                    key={currentCard.question}
                    question={currentCard.question}
                    options={currentCard.options}
                    getNextCard={getNextCard}
                />
            )}
        </div>
    );
}

export default App;
