import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Chart, registerables } from 'chart.js';
import './PredictionPage.css';

// Asset Imports
import imgMar from '../images/assets/mar.webp';
import imgSngl from '../images/assets/sngl.webp';
import imgNig from '../images/assets/nig.webp';
import imgEgy from '../images/assets/egy.webp';
import imgCafi from '../images/assets/cafi.webp';
import imgHome from '../images/assets/HOME.webp';
import imgB from '../images/assets/b.webp';
import imgC from '../images/assets/c.webp';

Chart.register(...registerables);

const PredictionPage = () => {
    // State
    const [predictions, setPredictions] = useState([]);
    const [teamA, setTeamA] = useState({ name: 'Morocco', img: imgMar, code: 'MOR' });
    const [teamB, setTeamB] = useState({ name: 'Senegal', img: imgSngl, code: 'SEN' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [targetSide, setTargetSide] = useState(null);
    const [userName, setUserName] = useState('');
    const [scoreA, setScoreA] = useState(0);
    const [scoreB, setScoreB] = useState(0);
    const [toast, setToast] = useState({ show: false, message: '' });

    // Image error states
    const [imgErrorA, setImgErrorA] = useState(false);
    const [imgErrorB, setImgErrorB] = useState(false);
    const [imgErrorCenter, setImgErrorCenter] = useState(false);
    const [imgErrorMascot, setImgErrorMascot] = useState(false);

    // Refs
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    // Constants
    const teamData = {
        'MOR': { name: 'Morocco', img: imgMar, code: 'MOR' },
        'SEN': { name: 'Senegal', img: imgSngl, code: 'SEN' },
        'NIG': { name: 'Nigeria', img: imgNig, code: 'NIG' },
        'EGY': { name: 'Egypt', img: imgEgy, code: 'EGY' }
    };

    // Helper Functions
    const showToast = (msg) => {
        setToast({ show: true, message: msg });
        setTimeout(() => setToast({ show: false, message: '' }), 3000);
    };

    const openModal = (side) => {
        setTargetSide(side);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const selectTeam = (code) => {
        const team = teamData[code];
        const currentOpponent = (targetSide === 'A') ? teamB.name : teamA.name;

        if (team.name.toUpperCase() === currentOpponent.toUpperCase()) {
            return showToast("Teams must be different!");
        }

        if (targetSide === 'A') {
            setTeamA(team);
            setImgErrorA(false);
        } else {
            setTeamB(team);
            setImgErrorB(false);
        }

        setPredictions([]);
        if (chartInstance.current) {
            chartInstance.current.data.datasets = [];
            chartInstance.current.update();
        }
        showToast("Teams updated: Predictions reset.");
        closeModal();
    };

    const calculateAccuracy = (predA, predB, avgA, avgB) => {
        const diff = Math.abs(predA - avgA) + Math.abs(predB - avgB);
        return Math.max(0, 100 - (diff * 20));
    };

    const addPrediction = () => {
        if (!userName.trim()) return showToast("Please enter your name!");

        const sA = scoreA === '' ? 0 : parseInt(scoreA);
        const sB = scoreB === '' ? 0 : parseInt(scoreB);

        if (isNaN(sA) || isNaN(sB) || sA < 0 || sB < 0) return showToast("Negative numbers are not allowed!");

        const newPrediction = { name: userName, sA, sB, accuracy: 0 };
        const updatedPredictions = [...predictions, newPrediction];

        // Update averages
        const count = updatedPredictions.length;
        const sumA = updatedPredictions.reduce((sum, p) => sum + p.sA, 0);
        const sumB = updatedPredictions.reduce((sum, p) => sum + p.sB, 0);
        const avgA = count > 0 ? Math.round(sumA / count) : 0;
        const avgB = count > 0 ? Math.round(sumB / count) : 0;

        // Update accuracy for all
        const finalPredictions = updatedPredictions.map(p => ({
            ...p,
            accuracy: calculateAccuracy(p.sA, p.sB, avgA, avgB)
        }));

        setPredictions(finalPredictions);
        setUserName('');
        showToast(`Prediction added!`);

        // Update chart
        const lastAcc = calculateAccuracy(sA, sB, avgA, avgB);
        updateChart(userName, lastAcc);
    };

    const updateChart = (name, acc) => {
        if (!chartInstance.current) return;
        const color = `hsl(${Math.random() * 360}, 70%, 60%)`;
        chartInstance.current.data.datasets.push({
            label: name,
            data: [40, 55, 45, 60, acc],
            borderColor: color,
            backgroundColor: color,
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 3
        });
        chartInstance.current.update();
    };

    // Effects
    useEffect(() => {
        if (chartRef.current && !chartInstance.current) {
            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Start', '15\'', '30\'', '45\'', 'Now'],
                    datasets: []
                },
                options: {
                    responsive: true,
                    scales: {
                        y: { beginAtZero: true, max: 100, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#888' } },
                        x: { grid: { display: false }, ticks: { color: '#888' } }
                    },
                    plugins: { legend: { labels: { color: 'white', font: { size: 10 } } } }
                }
            });
        }
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
        };
    }, []);

    const renderScore = (val) => {
        const strVal = String(val);
        return strVal.split('').map((char, i) => {
            if (char === '4') {
                return <span key={i} style={{ fontFamily: "'AFCON', sans-serif", position: 'relative', top: '-7px' }}>4</span>;
            }
            return <span key={i}>{char}</span>;
        });
    };

    const averages = (() => {
        const count = predictions.length;
        if (count === 0) return { a: 0, b: 0 };
        const sumA = predictions.reduce((sum, p) => sum + p.sA, 0);
        const sumB = predictions.reduce((sum, p) => sum + p.sB, 0);
        return { a: Math.round(sumA / count), b: Math.round(sumB / count) };
    })();

    return (
        <div className="prediction-page-container">
            <Link id="homeLink" to="/" style={{ position: 'fixed', bottom: '140px', left: '120px', zIndex: 1000 }}>
                <img src={imgHome} alt="Home" className="home-btn" />
            </Link>

            <div
                id="notification"
                style={{ display: toast.show ? 'block' : 'none' }}
                className={toast.show ? 'block' : ''}
            >
                {toast.message}
            </div>

            <div
                id="teamModal"
                className="team-modal-overlay"
                onClick={closeModal}
                style={{ display: isModalOpen ? 'flex' : 'none' }}
            >
                <div className="team-modal-content" onClick={(e) => e.stopPropagation()}>
                    <h2 className="modal-title">CHOOSE A TEAM</h2>
                    <div className="modal-grid">
                        {Object.entries(teamData).map(([code, team]) => (
                            <div key={code} className="team-option" onClick={() => selectTeam(code)}>
                                <img src={team.img} alt={team.name} className="team-option-img" />
                                <p className="team-option-text">{team.name.toUpperCase()}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <header className="prediction-header">
                <img src={imgB} alt="Header Logos" style={{ width: '40%' }} />
            </header>

            <main className="prediction-main">
                <div className="score-section-wrapper">
                    <div className="custom-rectangle rounded-sm">

                        {/* Team A Image/Placeholder */}
                        {imgErrorA ? (
                            <div className='side-image-left h-full w-[150px] placeholder-box'>Team A</div>
                        ) : (
                            <img
                                id="flagA"
                                src={teamA.img}
                                alt="Team A"
                                className="side-image-left"
                                onClick={() => openModal('A')}
                                onError={() => setImgErrorA(true)}
                            />
                        )}

                        <span id="nameA" className="country-label label-morocco">{teamA.name}</span>
                        <span className="number-text number-left" id="avgA">
                            {renderScore(averages.a)}
                        </span>

                        {/* Center Image/Placeholder */}
                        {imgErrorCenter ? (
                            <div className='center-image h-[80%] w-[40px] placeholder-box'>cafi</div>
                        ) : (
                            <img
                                src={imgCafi}
                                alt="cafi"
                                className="center-image"
                                onError={() => setImgErrorCenter(true)}
                            />
                        )}

                        <span className="number-text number-right" id="avgB">
                            {renderScore(averages.b)}
                        </span>
                        <span id="nameB" className="country-label label-senegal">{teamB.name}</span>

                        {/* Team B Image/Placeholder */}
                        {imgErrorB ? (
                            <div className='side-image-right h-full w-[150px] placeholder-box'>Team B</div>
                        ) : (
                            <img
                                id="flagB"
                                src={teamB.img}
                                alt="Team B"
                                className="side-image-right"
                                onClick={() => openModal('B')}
                                onError={() => setImgErrorB(true)}
                            />
                        )}
                    </div>
                </div>

                <div className="grid-container">
                    <section className="section-pronostic">
                        <h2 className="section-title">Enter Your Pronostic</h2>
                        <div className="form-container">
                            <input
                                type="text"
                                id="userName"
                                placeholder="Your Name"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                className="input-styled"
                            />

                            <div className="flex-gap-4">
                                <div className="flex-1">
                                    <label className="input-label">{teamA.code} Score</label>
                                    <input
                                        type="number"
                                        value={scoreA}
                                        onChange={(e) => setScoreA(e.target.value)}
                                        className="input-styled"
                                        min="0"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="input-label">{teamB.code} Score</label>
                                    <input
                                        type="number"
                                        value={scoreB}
                                        onChange={(e) => setScoreB(e.target.value)}
                                        className="input-styled"
                                        min="0"
                                    />
                                </div>
                            </div>

                            <button onClick={addPrediction} className="btn-submit">
                                Submit Prediction
                            </button>
                        </div>
                    </section>

                    <section className="section-graph">
                        <h2 className="section-title-sm">Who is Near to Win?</h2>
                        <canvas ref={chartRef} id="accuracyChart" height="200"></canvas>
                    </section>
                </div>

                <section className="leaderboard-wrapper">
                    <h2 className="leaderboard-title">Current Leaderboard</h2>
                    <div id="leaderboard" className="leaderboard-grid">
                        {[...predictions].sort((a, b) => b.accuracy - a.accuracy).map((p, i) => (
                            <div key={i} className="leaderboard-card">
                                <div className="card-name">{p.name}</div>
                                <div className="card-score">{p.sA} - {p.sB}</div>
                                <div className="card-accuracy">{p.accuracy.toFixed(0)}% Match</div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <div
                className="mascot-container"
                style={{ display: imgErrorMascot ? 'none' : 'block' }}
            >
                <img
                    src={imgC}
                    alt="Mascot"
                    onError={() => setImgErrorMascot(true)}
                />
            </div>
        </div>
    );
};

export default PredictionPage;
