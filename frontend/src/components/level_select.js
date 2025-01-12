// Assuming you have a React project setup
import React, { useState } from 'react';

const LevelSelector = ({ onSelectLevel }) => {
    const levels = Array.from({ length: 20 }, (_, index) => index + 1); // Levels 1 to 20

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
            {levels.map((level) => (
                <button 
                    key={level} 
                    onClick={() => onSelectLevel(level)}
                    style={{ padding: '10px', fontSize: '16px' }}
                >
                    Level {level}
                </button>
            ))}
        </div>
    );
};

export default LevelSelector;