import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Memo.css';

const STAGES = [
    { rows: 2, cols: 3, total: 6, match: 2 },
    { rows: 3, cols: 4, total: 12, match: 2 },
    { rows: 3, cols: 6, total: 18, match: 2 },
    { rows: 3, cols: 8, total: 24, match: 2 },
    { rows: 3, cols: 9, total: 27, match: 3 }
];

const MemoPage = () => {
    const [currentStageIdx, setCurrentStageIdx] = useState(0);
    const [deck, setDeck] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [canFlip, setCanFlip] = useState(true);
    const [matchesFound, setMatchesFound] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [isLastStage, setIsLastStage] = useState(false);

    const audioRef = useRef({
        flip: new Audio('https://www.soundjay.com/misc/sounds/swish-2.mp3'),
        match: new Audio('https://www.soundjay.com/misc/sounds/magic-chime-02.mp3'),
        champion: new Audio('https://www.soundjay.com/misc/sounds/magic-chime-06.mp3')
    });

    const playAudio = (key) => {
        const audio = audioRef.current[key];
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(e => console.log("Audio play failed:", e));
        }
    };

    const loadStage = useCallback((stageIdx) => {
        const stage = STAGES[stageIdx];
        setFlippedCards([]);
        setMatchesFound(0);
        setCanFlip(true);
        setModalOpen(false);

        const numSets = stage.total / stage.match;
        let imagePool = Array.from({ length: 30 }, (_, i) => `/assets/${i + 1}.webp`);
        imagePool.sort(() => Math.random() - 0.5);
        const selectedImages = imagePool.slice(0, numSets);

        let newDeck = [];
        selectedImages.forEach(img => {
            for (let i = 0; i < stage.match; i++) {
                newDeck.push({ id: Math.random(), imgSrc: img, flipped: false, matched: false });
            }
        });

        newDeck.sort(() => Math.random() - 0.5);
        setDeck(newDeck);
    }, []);

    useEffect(() => {
        loadStage(0);
    }, [loadStage]);

    const handleFlip = (index) => {
        const stage = STAGES[currentStageIdx];
        if (!canFlip || deck[index].flipped || deck[index].matched) return;

        playAudio('flip');

        const updatedDeck = [...deck];
        updatedDeck[index].flipped = true;
        setDeck(updatedDeck);

        const newFlipped = [...flippedCards, { index, ...updatedDeck[index] }];
        setFlippedCards(newFlipped);

        if (newFlipped.length === stage.match) {
            setCanFlip(false);
            checkMatch(newFlipped, updatedDeck);
        }
    };

    const checkMatch = (currentFlipped, currentDeck) => {
        const stage = STAGES[currentStageIdx];
        const isMatch = currentFlipped.every(c => c.imgSrc === currentFlipped[0].imgSrc);

        setTimeout(() => {
            const updatedDeck = [...currentDeck];
            if (isMatch) {
                playAudio('match');
                currentFlipped.forEach(c => {
                    updatedDeck[c.index].matched = true;
                });
                const newMatches = matchesFound + 1;
                setMatchesFound(newMatches);
                if (newMatches === stage.total / stage.match) {
                    showStageComplete();
                }
            } else {
                currentFlipped.forEach(c => {
                    updatedDeck[c.index].flipped = false;
                });
            }
            setDeck(updatedDeck);
            setFlippedCards([]);
            setCanFlip(true);
        }, 700);
    };

    const showStageComplete = () => {
        const last = currentStageIdx === STAGES.length - 1;
        setIsLastStage(last);
        setModalOpen(true);
        playAudio('champion');
    };

    const nextStage = () => {
        if (isLastStage) {
            window.location.reload();
        } else {
            const nextIdx = currentStageIdx + 1;
            setCurrentStageIdx(nextIdx);
            loadStage(nextIdx);
        }
    };

    const stage = STAGES[currentStageIdx];
    const cardWidth = `${Math.floor(85 / stage.cols)}vw`;

    return (
        <div className="memo-page-body">
            <Link to="/" className="memo-home-btn-container">
                <img src="/assets/HOME.webp" alt="Home" className="memo-home-btn" />
            </Link>

            <div id="memo-main-container">
                <div id="memo-game-board" style={{
                    gridTemplateColumns: `repeat(${stage.cols}, auto)`,
                    gridTemplateRows: `repeat(${stage.rows}, auto)`
                }}>
                    {deck.map((card, i) => (
                        <div key={card.id} className="memo-card-container" style={{ width: cardWidth }} onClick={() => handleFlip(i)}>
                            <div className={`memo-card ${card.flipped ? 'flipped' : ''} ${card.matched ? 'matched' : ''}`}>
                                <div className="card-face card-back"></div>
                                <div className="card-face card-front" style={{ backgroundImage: `url('${card.imgSrc}')` }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div id="memo-modal-overlay" style={{ display: modalOpen ? 'flex' : 'none' }}>
                <div className="memo-modal-content">
                    <h2 style={{ fontSize: '3rem', margin: 0 }}>{isLastStage ? 'CHAMPION!' : 'LEVEL CLEAR!'}</h2>
                    <p style={{ fontSize: '1.5rem', margin: '10px 0' }}>
                        {isLastStage ? 'SAFI SALITY GA3 LES CARTES' : 'NADI TABAREKLAH 3LIK'}
                    </p>
                    <button className="continue-btn" onClick={nextStage}>
                        {isLastStage ? 'RESTART' : 'CONTINUE'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MemoPage;
