import './level_select.css';

const LevelSelector = ({ onSelectLevel, currentLevel, setLevel }) => {
    const levels = Array.from({ length: 20 }, (_, index) => index + 1);

    const handleNext = () => {
        if (currentLevel < levels.length) setLevel(currentLevel + 1);
    };

    const handlePrevious = () => {
        if (currentLevel > 1) setLevel(currentLevel - 1);
    };

    return (
        <div>
            <div className="level-navigation">
                <button className="navigation-button" onClick={handlePrevious}>Previous</button>
                <button className="navigation-button" onClick={() => onSelectLevel(currentLevel)}>Choose Level</button>
                <button className="navigation-button" onClick={handleNext}>Next</button>
            </div>
            <div className="level-selector">
                {levels.map((level) => (
                    <button
                        key={level}
                        className="level-button"
                        onClick={() => onSelectLevel(level)}
                    >
                        Level {level}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LevelSelector;