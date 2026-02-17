import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();
    const [videoOpen, setVideoOpen] = useState(false);
    const videoRef = useRef(null);

    const openVideo = () => {
        setVideoOpen(true);
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    const closeVideo = () => {
        setVideoOpen(false);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    return (
        <div className="landing-page-body">
            {/* Header with Logos and bet.webp separators */}
            <header className="logo-header">
                <img src="/assets/caf.webp" alt="caf" className="logo-item" />
                <img src="/assets/bet.webp" alt="" className="separator" />
                <img src="/assets/cmc.webp" alt="cmc" className="logo-s" />
                <img src="/assets/bet.webp" alt="" className="separator" />
                <img src="/assets/dia.webp" alt="dia" className="logo-item" />
                <img src="/assets/bet.webp" alt="" className="separator" />
                <img src="/assets/AIG.webp" alt="AIG" className="logo-item" />
                <img src="/assets/bet.webp" alt="" className="separator" />
                <img src="/assets/arti.webp" alt="arti" className="logo-item" />
                <img src="/assets/bet.webp" alt="" className="separator" />
                <img src="/assets/fablab.webp" alt="fablab" className="logo-b" />
                <img src="/assets/bet.webp" alt="" className="separator" />
                <img src="/assets/images/y.webp" alt="y" className="logo-y" />
            </header>

            <main className="hero-container">
                {/* The big image on the max right */}
                <img src="/assets/p1.webp" alt="" className="p1-hero" />

                <div className="content-box fade-in-home">
                    <h1 className="headline">
                        Live the AFCON Experience
                    </h1>

                    <div className="divider"></div>

                    <p className="subtext">
                        Celebrate the heartbeat of African football.
                        Interactive games, brainstormed in the FabLab and CoP at CMC BMK, highlight our institute’s
                        dedication to the spectacle our country knows.
                    </p>

                    {/* DESKTOP VERSION */}
                    <div className="desktop-only">
                        <div className="btn-group-row row-top">
                            <button className="image-btn-base" onClick={() => navigate('/predict')}>
                                <img src="/assets/btn.webp" alt="" style={{ width: '100%' }} />
                                <span className="btn-label">Predict</span>
                            </button>
                            <button className="image-btn-base" onClick={() => navigate('/quiz')}>
                                <img src="/assets/btn.webp" alt="" style={{ width: '100%' }} />
                                <span className="btn-label">Quiz</span>
                            </button>
                            <button className="image-btn-base" onClick={openVideo}>
                                <img src="/assets/btn.webp" alt="" style={{ width: '100%' }} />
                                <span className="btn-label">Video</span>
                            </button>
                        </div>
                        <div className="btn-group-row row-bottom">
                            <button className="image-btn-base" onClick={() => console.log("Card section scroll placeholder")}>
                                <img src="/assets/btn.webp" alt="" style={{ width: '100%' }} />
                                <span className="btn-label">Card</span>
                            </button>
                            <button className="image-btn-base" onClick={() => navigate('/memo')}>
                                <img src="/assets/btn.webp" alt="" style={{ width: '100%' }} />
                                <span className="btn-label">Memo</span>
                            </button>
                        </div>
                    </div>

                    {/* MOBILE VERSION */}
                    <div className="mobile-only" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                        <div className="btn-group-row">
                            <button className="image-btn-base btn-left" onClick={() => navigate('/memo')}>
                                <img src="/assets/btn.webp" style={{ width: '100%' }} alt="Memo" />
                                <span className="btn-label">Memo</span>
                            </button>
                            <button className="image-btn-base btn-right" onClick={() => navigate('/quiz')}>
                                <img src="/assets/btn.webp" style={{ width: '100%' }} alt="Quiz" />
                                <span className="btn-label">Quiz</span>
                            </button>
                        </div>

                        <div className="btn-group-row">
                            <button className="image-btn-base btn-center" onClick={() => navigate('/predict')}>
                                <img src="/assets/btn.webp" style={{ width: '100%' }} alt="Predict" />
                                <span className="btn-label">Predict</span>
                            </button>
                        </div>

                        <div className="btn-group-row">
                            <button className="image-btn-base btn-left" onClick={() => console.log("Card section scroll placeholder")}>
                                <img src="/assets/btn.webp" style={{ width: '100%' }} alt="Card" />
                                <span className="btn-label">Card</span>
                            </button>
                            <button className="image-btn-base btn-right" onClick={openVideo}>
                                <img src="/assets/btn.webp" style={{ width: '100%' }} alt="Video" />
                                <span className="btn-label">Video</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <div id="video-modal" style={{ display: videoOpen ? 'flex' : 'none' }} onClick={closeVideo}>
                <div className="modal-content-home" onClick={(e) => e.stopPropagation()}>
                    <span className="close-modal-home" onClick={closeVideo}>&times;</span>
                    <video ref={videoRef} className="modal-video-home" controls playsInline>
                        <source src="/assets/videos/vid.mp4" type="video/mp4" />
                    </video>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
