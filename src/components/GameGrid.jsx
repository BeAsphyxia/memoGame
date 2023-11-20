import React, { useState, useEffect } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';
import { Images } from '../utils/Images';

const TIMEOUT_DURATION = 500;

function GameGrid() {

    const [gameState, setGameState] = useState({
        remain: Images.length / 2,
        wins: 0,
        explosion: false,
        startTime: null,
        totalTime: [],
        guessed: [],
        selected: [],
    });

    const handleImageClick = (image) => {
        const { selected } = gameState;

        if (selected.length < 2 && !selected.includes(image)) {
            setGameState((prevState) => ({
                ...prevState,
                selected: [...prevState.selected, image],
            }));
        }
    };

    const renderImage = (image, url, isMatched, isSelected) => {
        return (
            <>
                {isMatched || isSelected ? (
                    <img src={url} alt={image} />
                ) : (
                    <img src="https://www.pngall.com/wp-content/uploads/8/Magnifying-Glass-Search-PNG-Transparent-HD-Photo.png" alt={image} />
                )}
            </>
        )
    };

    useEffect(() => {
        const { selected, remain } = gameState;

        if (selected.length === 2) {
            const [firstImage, secondImage] = selected;
            if (
                firstImage !== secondImage &&
                firstImage.split('|')[1] === secondImage.split('|')[1]
            ) {
                setGameState((prevState) => ({
                    ...prevState,
                    guessed: prevState.guessed.concat(selected),
                    remain: prevState.remain - 1,
                }));
            }

            setTimeout(() => {
                setGameState((prevState) => ({
                    ...prevState,
                    selected: [],
                }));
            }, TIMEOUT_DURATION);
        }
    }, [gameState.selected]);

    useEffect(() => {
        const { guessed } = gameState;

        if (guessed.length === Images.length) {
            const endTime = performance.now();
            const elapsedTime = (endTime - gameState.startTime) / 1000;

            setGameState((prevState) => ({
                ...prevState,
                totalTime: [...prevState.totalTime, elapsedTime],
                wins: prevState.wins + 1,
                explosion: true,
            }));
        }
    }, [gameState.guessed]);

    useEffect(() => {
        setGameState((prevState) => ({
            ...prevState,
            startTime: performance.now(),
        }));
    }, [gameState.explosion]);

    const handleReset = () => {
        setGameState({
            remain: Images.length / 2,
            wins: 0,
            explosion: false,
            startTime: null,
            totalTime: [],
            guessed: [],
            selected: [],
        });
    };

    const { remain, wins, explosion, totalTime, guessed, selected } = gameState;

    return (
        <>
            <div className="container-flex">
                <p>
                    Remain: <span>{remain}</span>
                </p>
                <p>
                    Wins : <span>{wins}</span>
                </p>
                <p>
                    Best Time :{' '}
                    <span>
                        {totalTime && totalTime.length > 0
                            ? `${totalTime.sort((a, b) => a - b)[0].toFixed(2)} Seconds`
                            : 'NaN'}
                    </span>
                </p>
            </div>

            {explosion && remain === 0 ? (
                <>
                    <ConfettiExplosion />
                    <h2>¡YOU WON!</h2>
                    <button onClick={handleReset} className="play-again">
                        Play Again
                    </button>
                </>
            ) : null}
            <ul className={`${remain === 0 ? 'hidden' : ''}`}>
                {Images.map((image) => {
                    const [, url] = image.split('|');
                    const isMatched = guessed.includes(image);
                    const isSelected = selected.includes(image);

                    return (
                        <li
                            onClick={() => handleImageClick(image)}
                            key={image}
                            className={`image-container ${isMatched ? 'matched' : ''}`}
                        >
                            {renderImage(image, url, isMatched, isSelected)}
                        </li>
                    );
                })}
            </ul>
        </>
    );
}

export default GameGrid;
